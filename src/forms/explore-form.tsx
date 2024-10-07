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

import { Explore } from 'src/models/api';
import { postData } from 'src/services/postService';

import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type Props = {
  currentObject?: Explore;
  pathName: string;
};

export default function ExploreForm({ currentObject, pathName }: Props) {
  const router = useRouter();

  const NewExploreSchema = Yup.object().shape({
    counts: Yup.number()
      .required('Counts are required')
      .min(0, 'Counts must be at least 0'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Invalid image URL').required('Image URL is required'),
  });

  const defaultValues = useMemo(
    () => ({
      counts: currentObject?.counts || 0,
      description: currentObject?.description || '',
      image: currentObject?.image || '',
    }),
    [currentObject]
  );

  const methods = useForm({
    resolver: yupResolver(NewExploreSchema),
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
    mutationFn: (data: Explore) => postData(`${api.post}/${pathName}`, data),
    onSuccess: () => {
      reset();
      showSnackbar(currentObject ? 'Update success!' : 'Create success!');
      setTimeout(() => {
        router.push(`${paths.dashboard.view.list}/${pathName}`);
      }, 3000);
    },
    onError: (error) => {
      console.error('Error details:', error);
      showSnackbar('Something went wrong. Please try again later.', 'error');
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
                <RHFTextField name="counts" label="Counts" type="number" />
                <RHFTextField name="description" label="Description" multiline rows={4} />
                <RHFTextField name="image" label="Image URL" />
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
