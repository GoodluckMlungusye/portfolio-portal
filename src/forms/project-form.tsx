import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/hooks/use-snack-bar';

import { api } from 'src/utils/api';

import { Project, RowObject  } from 'src/models/api';
import { useRowContext } from 'src/contexts/row-context';
import { postData, postFormData } from 'src/services/postService';

import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

type Props = {
  pathName: string;
};

export default function ProjectForm({ pathName }: Props) {

  const router = useRouter();
  const { row } = useRowContext();
  const currentObject: RowObject | null = row;

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required('Project name is required'),
    technology: Yup.string().required('Technology is required'),
    rate: Yup.number().required('Rate is required').min(0, 'Rate must be at least 0'),
    projectLink: Yup.string().url('Invalid project URL').required('Project link is required'),
    colorCode: Yup.string()
      .matches(/^#[0-9A-F]{6}$/i, 'Invalid color code')
      .required('Color code is required'),
    image: Yup.mixed().nullable().notRequired(),
    isHosted: Yup.boolean().required('Hosted status is required'),
  });

  function isProject(obj: RowObject | null): obj is Project {
    return (
      !!obj &&
      'name' in obj &&
      'technology' in obj &&
      'rate' in obj &&
      'projectLink' in obj &&
      'colorCode' in obj &&
      'isHosted' in obj &&
      'image' in obj
    );
  }

  const defaultValues = useMemo(() => {
    if (isProject(currentObject)) {
      return {
        name: currentObject.name || '',
        technology: currentObject.technology || '',
        rate: currentObject.rate || 0,
        projectLink: currentObject.projectLink || '',
        colorCode: currentObject.colorCode || '',
        image: currentObject.image || null,
        isHosted: currentObject.isHosted || false,
      };
    }
  
    return {
      name: '',
      technology: '',
      rate: 0,
      projectLink: '',
      colorCode: '',
      image: null,
      isHosted: false,
    };
  }, [currentObject]);

  const methods = useForm({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit
  } = methods;
  const values = watch();

  const { snackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar, showSnackbar } =
    useSnackbar();

  useEffect(() => {
    if (currentObject) {
      reset(defaultValues);
    }
  }, [currentObject, defaultValues, reset]);

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: Project) => {
      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('technology', data.technology);
        formData.append('rate', data.rate.toString());
        formData.append('projectLink', data.projectLink);
        formData.append('colorCode', data.colorCode);
        formData.append('isHosted', data.isHosted.toString());
        formData.append('file', data.image);

        return postFormData(`${api.post}/${pathName}`, formData);
      }
      return postData(`${api.post}/${pathName}`, data);
    },
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
    const processedData: Project = {
      ...data,
      image: typeof data.image === 'string' || data.image instanceof File ? data.image : null,
    };
    mutate(processedData);
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      if (values.image === inputFile) {
        setValue('image', null, { shouldValidate: true });
      }
    },
    [setValue, values.image]
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
                <Stack spacing={1.5}>
                  <Typography variant="body2">Image</Typography>
                  <RHFUpload
                    thumbnail
                    name="image"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid
            xs={12}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pt: 2 }}
          >
            <FormControlLabel
              control={<Switch {...methods.register('isHosted')} checked={values.isHosted} />}
              label="Hosted"
              sx={{ flexGrow: 1, pl: 3 }}
            />
            <LoadingButton type="submit" variant="contained" size="large" loading={isPending}>
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
