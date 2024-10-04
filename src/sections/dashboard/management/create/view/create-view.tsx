import Container from "@mui/material/Container";

import { paths } from "src/routes/paths";

import { capitalize } from "src/utils/capitalize";

import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import NewEditForm from "../new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  name: string;
};

export default function CreateView({ name }: Props) {

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={`Create new ${name}`}
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: capitalize(name),
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
