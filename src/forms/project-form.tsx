import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/hooks/use-snack-bar';

import { api } from 'src/utils/api';

import { Project } from 'src/models/api';
import { postData } from 'src/services/postService';

import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type Props = {
  currentObject?: Project;
  pathName: string;
};

export default function ProjectForm({ currentObject, pathName }: Props) {
  const router = useRouter();

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Project name is required'),
    technology: Yup.string().required('Technology is required'),
    rate: Yup.number().required('Rate is required').min(0, 'Rate must be at least 0'),
    projectLink: Yup.string().url('Invalid project URL').required('Project link is required'),
    colorCode: Yup.string().matches(/^#[0-9A-F]{6}$/i, 'Invalid color code').required('Color code is required'),
    image: Yup.string().url('Invalid image URL').required('Image is required'),
    isHosted: Yup.boolean().required('Hosted status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentObject?.name || '',
      technology: currentObject?.technology || '',
      rate: currentObject?.rate || 0,
      projectLink: currentObject?.projectLink || '',
      colorCode: currentObject?.colorCode || '',
      image: currentObject?.image || '',
      isHosted: currentObject?.isHosted || false,
    }),
    [currentObject]
  );

  const methods = useForm({
    resolver: yupResolver(NewProjectSchema),
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
    mutationFn: (data: Project) => postData(`${api.post}/${pathName}`, data),
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

  const renderActions = (
    <Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
      <FormControlLabel
        control={
          <Switch
            {...methods.register("isHosted")}
            checked={methods.getValues("isHosted")}
          />
        }
        label="Publish"
        sx={{ flexGrow: 1, pl: 3 }}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
      >
        {!currentObject ? "Create" : "Save Changes"}
      </LoadingButton>
    </Grid>
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <RHFTextField name="name" label="Enter Project name" />
                <RHFTextField name="technology" label="Enter Technology" />
                <RHFTextField name="rate" label="Enter Rate" type="number" />
                <RHFTextField name="projectLink" label="Enter Project Link" />
                <RHFTextField name="colorCode" label="Enter Color Code" />
                <RHFTextField name="image" label="Enter Image URL" />
              </Stack>
            </Card>
          </Grid>

          {renderActions}
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
