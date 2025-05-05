import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/hooks/use-snack-bar';

import { capitalize } from 'src/utils/capitalize';

import { Skill } from 'src/models/api';
import { postData } from 'src/services/postService';
import { updateData } from 'src/services/updateService';
import { useRowContext } from 'src/contexts/row-context';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type Props = {
  pathName: string;
};

export default function SkillForm({ pathName }: Props) {
  const router = useRouter();
  const { row } = useRowContext();
  const currentObject = useMemo(() => (row as Skill) || { name: '' }, [row]);

  const NewSkillSchema = Yup.object().shape({
    name: Yup.string().required('Skill name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentObject?.name || '',
    }),
    [currentObject]
  );

  const methods = useForm({
    resolver: yupResolver(NewSkillSchema),
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
    mutationFn: (data: Skill) =>
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
                <RHFTextField name="name" label="Enter Skill Name" />
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
