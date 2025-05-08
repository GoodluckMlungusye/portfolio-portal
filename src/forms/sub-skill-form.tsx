import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useMutation } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useSnackbar } from 'src/hooks/use-snack-bar';

import { capitalize } from 'src/utils/capitalize';

import { getData } from 'src/services/getService';
import { postData } from 'src/services/postService';
import { updateData } from 'src/services/updateService';
import { useRowContext } from 'src/contexts/row-context';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import { Skill, SubSkill } from 'src/types/api';

type Props = {
  pathName: string;
};

export default function SubSkillForm({ pathName }: Props) {
  const router = useRouter();
  const { row } = useRowContext();
  const currentObject = useMemo(
    () => (row as SubSkill) || { name: '', percentageLevel: 0, skillId: 1 },
    [row]
  );

  const { data: dropdownList } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getData('/skills'),
  });

  const NewSubSkillSchema = Yup.object().shape({
    name: Yup.string().required('Subskill name is required'),
    percentageLevel: Yup.number()
      .required('Percentage level is required')
      .min(0, 'Must be at least 0')
      .max(100, 'Must be at most 100'),
    skillId: Yup.number().required('Skill is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentObject?.name || '',
      percentageLevel: currentObject?.percentageLevel || 0,
      skillId: currentObject?.skillId || 1,
    }),
    [currentObject]
  );

  const methods = useForm({
    resolver: yupResolver(NewSubSkillSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar, showSnackbar } =
    useSnackbar();

  useEffect(() => {
    if (currentObject) {
      reset(defaultValues);
    }
  }, [currentObject, defaultValues, reset]);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: SubSkill) =>
      currentObject.id
        ? updateData(`/${pathName}`, currentObject.id, data)
        : postData(`/${pathName}`, data),
    onSuccess: () => {
      reset();
      showSnackbar(currentObject.id ? 'Update success!' : 'Create success!');
      setTimeout(() => {
        router.push(`${paths.dashboard.view.list}/${pathName}`);
      }, 3000);
    },
    onError: (error) => {
      console.error('Error details:', error);
      showSnackbar(error.message, 'error');
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <>
      <CustomBreadcrumbs
        heading={currentObject.id ? `Update current ${pathName}` : `Create new ${pathName}`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: capitalize(pathName),
          },
          { name: currentObject.id ? 'Update' : 'Create' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <RHFTextField name="name" label="Enter SubSkill Name" />
                <RHFTextField name="percentageLevel" label="Enter Percentage Level" type="number" />
                <RHFSelect native name="skillId" label="Skill" InputLabelProps={{ shrink: true }}>
                  {dropdownList &&
                    dropdownList.map((item: Skill) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </RHFSelect>
              </Stack>
            </Card>
          </Grid>

          <Grid
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pt: 2,
            }}
          >
            <Button
              variant="outlined"
              component={RouterLink}
              href={`${paths.dashboard.create.new}/skills`}
              size="large"
              sx={{ mr: 2 }}
            >
              Add new skill
            </Button>
            <LoadingButton type="submit" variant="contained" size="large" loading={isPending}>
              {!currentObject.id ? 'Create' : 'Save Changes'}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
    </>
  );
}
