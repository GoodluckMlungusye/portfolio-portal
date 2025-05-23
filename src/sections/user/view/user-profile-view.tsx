import { useState, useCallback } from "react";

import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

import { paths } from "src/routes/paths";

import { useMockedUser } from "src/hooks/use-mocked-user";

import { _userAbout, _userFeeds } from "src/_mock";

import Iconify from "src/components/iconify";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

import ProfileHome from "../profile-home";
import UserEditView from "./user-edit-view";
import ProfileCover from "../profile-cover";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: "profile",
    label: "Profile",
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: "edit",
    label: "Edit",
    icon: <Iconify icon="fluent:person-edit-24-filled" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const settings = useSettingsContext();

  const { user } = useMockedUser();

  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setCurrentTab(newValue);
    },
    []
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "User", href: paths.dashboard.view.root },
          { name: user?.displayName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={_userAbout.role}
          name={user?.displayName}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: "absolute",
            bgcolor: "background.paper",
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: "center",
                md: "flex-end",
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Card>

      {currentTab === "profile" && (
        <ProfileHome info={_userAbout} posts={_userFeeds} />
      )}

      {currentTab === "edit" && <UserEditView id={user.id} />}
    </Container>
  );
}
