import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useEffect, useCallback } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { useResponsive } from "src/hooks/use-responsive";

import { PRODUCT_CATEGORY_GROUP_OPTIONS } from "src/_mock";

import { useSnackbar } from "src/components/snackbar";
import FormProvider, {
  RHFSelect,
  RHFUpload,
  RHFTextField,
} from "src/components/hook-form";

import { IProductItem } from "src/types/product";

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export default function NewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const mdUp = useResponsive("up", "md");

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    images: Yup.array().min(1, "Images is required"),
    tags: Yup.array().min(2, "Must have at least 2 tags"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().moreThan(0, "Price should not be $0.00"),
    description: Yup.string().required("Description is required"),
    // not required
    taxes: Yup.number(),
    newLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
    saleLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      subDescription: currentProduct?.subDescription || "",
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || "",
      sku: currentProduct?.sku || "",
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || "",
      category: currentProduct?.category || "",
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: "" },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: "" },
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProduct ? "Update success!" : "Create success!");
      router.push(paths.dashboard.create.root);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue("images", [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered =
        values.images && values.images?.filter((file) => file !== inputFile);
      setValue("images", filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue("images", []);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Product Name" />

            <RHFTextField
              name="subDescription"
              label="Sub Description"
              multiline
              rows={4}
            />

            <RHFSelect
              native
              name="category"
              label="Category"
              InputLabelProps={{ shrink: true }}
            >
              {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
                <optgroup key={category.group} label={category.group}>
                  {category.classify.map((classify) => (
                    <option key={classify} value={classify}>
                      {classify}
                    </option>
                  ))}
                </optgroup>
              ))}
            </RHFSelect>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info("ON UPLOAD")}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!currentProduct ? "Create" : "Save Changes"}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}
