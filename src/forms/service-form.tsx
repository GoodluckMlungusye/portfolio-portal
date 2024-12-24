import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/hooks/use-snack-bar';

import { api } from 'src/utils/api';

import { Service } from 'src/models/api';
import { useRowContext } from 'src/contexts/row-context';
import { postData, postFormData } from 'src/services/postService';
import { updateData, updateFormData } from 'src/services/updateService';

import CustomSnackbar from 'src/components/snackbar/custom-snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
type Props = {
  pathName: string;
};

export default function ServiceForm({ pathName }: Props) {

  const router = useRouter();
  const { row } = useRowContext();
  const currentObject = useMemo(() => (row as Service) || { name: '', description: '', image: null }, [row]);
  

  const NewServiceSchema = Yup.object().shape({
    name: Yup.string().required('Service name is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().nullable().notRequired(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentObject.name || '',
      description: currentObject.description || '',
      image: currentObject.image || null,
    }),
    [currentObject]
  );
  
  const methods = useForm({
    resolver: yupResolver(NewServiceSchema),
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
    mutationFn: async (data: Service) => {
      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.image instanceof File) {
          formData.append('file', data.image);
        }

        return currentObject.id? updateFormData(`${api.update}/${pathName}`, currentObject.id, formData) : postFormData(`${api.post}/${pathName}`, formData);
      }

      return  currentObject.id? updateData(`${api.update}/${pathName}`, currentObject.id, data) : postData(`${api.post}/${pathName}`, data);
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
    const processedData: Service = {
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
                <RHFTextField name="name" label="Enter Service Name" />
                <RHFTextField name="description" label="Enter Description" multiline rows={4} />
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
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pt: 2,
            }}
          >
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
