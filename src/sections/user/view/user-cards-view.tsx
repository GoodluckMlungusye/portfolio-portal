import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { _userCards } from "src/_mock";

import Iconify from "src/components/iconify";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import UserCardList from "../user-card-list";

// ----------------------------------------------------------------------

export default function UserCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="User Cards"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "User", href: paths.dashboard.view.root },
          { name: "Cards" },
        ]}
        action={
          <Button
            component={RouterLink}
            href=""
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New User
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={_userCards} />
    </Container>
  );
}
