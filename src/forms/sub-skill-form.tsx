import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useMutation } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/hooks/use-snack-bar';

import { api } from 'src/utils/api';

import { Skill, SubSkill } from 'src/models/api';
import { getData } from 'src/services/getService';
import { postData } from 'src/services/postService';

import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

type Props = {
  currentObject?: SubSkill;
  pathName: string;
};

export default function SubSkillForm({ currentObject, pathName }: Props) {
  const router = useRouter();

  const { data: dropdownList } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getData(`${api.get}/skills`),
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
      skillId: currentObject?.skill?.id || 1,
    }),
    [currentObject]
  );

  const methods = useForm({
    resolver: yupResolver(NewSubSkillSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar, showSnackbar } =
    useSnackbar();

  useEffect(() => {
    if (currentObject) {
      reset(defaultValues);
    }
  }, [currentObject, defaultValues, reset]);

  const { mutate } = useMutation({
    mutationFn: (data: SubSkill) => postData(`${api.post}/${pathName}`, data),
    onSuccess: () => {
      reset();
      showSnackbar(currentObject ? 'Update success!' : 'Create success!');
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
    const { skillId, ...otherData } = data; 
  
    const formattedData = {
      ...otherData,
      skill: {
        id: skillId,
      },
    };
  
    mutate(formattedData);
  });
  

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <RHFTextField name="name" label="Enter SubSkill Name" />
                <RHFTextField name="percentageLevel" label="Enter Percentage Level" type="number" />
                <RHFSelect
                  native
                  name="skillId"
                  label="Skill"
                  InputLabelProps={{ shrink: true }}
                >
                  {dropdownList && dropdownList.map((item: Skill) => (
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
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!currentObject ? 'Create' : 'Save Changes'}
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
