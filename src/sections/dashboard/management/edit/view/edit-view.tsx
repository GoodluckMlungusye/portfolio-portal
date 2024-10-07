// import { useMemo, useState, useEffect } from "react";

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import LinkForm from 'src/forms/link-form';
import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ObjectForm from '../../create/object-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function EditView({ id }: Props) {
  // const [dashboardTitle, setDashboardTitle] = useState("");
  // const managementList = useMemo(
  //   () => [
  //     { title: "Projects", id: 1 },
  //     { title: "Skills", id: 2 },
  //     { title: "Education", id: 3 },
  //     { title: "Explore", id: 4 },
  //     { title: "Services", id: 5 },
  //     { title: "Navigations", id: 6 },
  //   ],
  //   []
  // );

  // useEffect(() => {
  //   const foundItem = managementList.find((item) => item.id === Number(id));
  //   if (foundItem) {
  //     setDashboardTitle(foundItem.title);
  //   }
  // }, [id, managementList]);

  const settings = useSettingsContext();

  const { product: currentProduct } = useGetProduct(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Edit',
            href: paths.dashboard.create.root,
          },
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ObjectForm currentObject={currentProduct}>
        <LinkForm />
      </ObjectForm>
    </Container>
  );
}
