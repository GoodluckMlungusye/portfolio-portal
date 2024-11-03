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

import { api } from 'src/utils/api';

import { Education } from 'src/models/api';
import { postData } from 'src/services/postService';

import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type Props = {
  currentObject?: Education;
  pathName: string;
};

export default function EducationForm({ currentObject, pathName }: Props) {
  const router = useRouter();

  const NewEducationSchema = Yup.object().shape({
    duration: Yup.string().required('Duration is required'),
    institute: Yup.string().required('Institute is required'),
    programme: Yup.string().required('Programme is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      duration: currentObject?.duration || '',
      institute: currentObject?.institute || '',
      programme: currentObject?.programme || '',
      description: currentObject?.description || '',
    }),
    [currentObject]
  );

  const methods = useForm({
    resolver: yupResolver(NewEducationSchema),
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
    mutationFn: (data: Education) => postData(`${api.post}/${pathName}`, data),
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
    mutate(data);
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <RHFTextField name="duration" label="Duration" />
                <RHFTextField name="institute" label="Institute" />
                <RHFTextField name="programme" label="Programme" />
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                />
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
