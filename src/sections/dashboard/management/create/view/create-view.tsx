import { useMemo, useState, useEffect } from "react";

import Container from "@mui/material/Container";

import { paths } from "src/routes/paths";

import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import NewEditForm from "../new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  index: string;
};

export default function CreateView({ index }: Props) {
  const [dashboardTitle, setDashboardTitle] = useState("");

  const managementList = useMemo(
    () => [
      { title: "Projects", id: 1 },
      { title: "Skills", id: 2 },
      { title: "Education", id: 3 },
      { title: "Explore", id: 4 },
      { title: "Services", id: 5 },
      { title: "Navigations", id: 6 },
    ],
    []
  );

  useEffect(() => {
    const foundItem = managementList.find((item) => item.id === Number(index));
    if (foundItem) {
      setDashboardTitle(foundItem.title);
    }
  }, [index, managementList]);
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={`Create new ${dashboardTitle}`}
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: dashboardTitle,
          },
          { name: "Create" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <NewEditForm />
    </Container>
  );
}
