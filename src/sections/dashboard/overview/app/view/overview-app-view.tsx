import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { useMockedUser } from "src/hooks/use-mocked-user";

import { SeoIllustration } from "src/assets/illustrations";

import { useSettingsContext } from "src/components/settings";

import AppWelcome from "../app-welcome";
import AppYearlySales from "../app-yearly-sales";
import AppWidgetSummary from "../app-widget-summary";
import AppCurrentDownload from "../app-current-download";

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.displayName}`}
            description="Keep track of your dashboard and update your database for any new updates."
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Get started
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Projects"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Clients"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Skills"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Core Skills"
            chart={{
              series: [
                { label: "Frontend ", value: 2 },
                { label: "Backend  ", value: 2 },
                { label: "DBMS", value: 2 },
                { label: "Miscellaneous", value: 3 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppYearlySales
            title="Skills"
            chart={{
              categories: [
                "",
                "React",
                "Flutter",
                "Spring",
                "Laravel",
                "Postgres",
                "MySQL",
                "Docker",
                "Scrum",
                "Designing",
                "",
              ],
              series: [
                {
                  year: "Frontend",
                  data: [
                    {
                      name: "React",
                      data: [0, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                      name: "Flutter",
                      data: [0, 0, 85, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                  ],
                },
                {
                  year: "Backend",
                  data: [
                    {
                      name: "Spring",
                      data: [0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                      name: "Laravel",
                      data: [0, 0, 0, 0, 75, 0, 0, 0, 0, 0, 0],
                    },
                  ],
                },

                {
                  year: "DBMS",
                  data: [
                    {
                      name: "Postgres",
                      data: [0, 0, 0, 0, 0, 85, 0, 0, 0, 0, 0],
                    },
                    {
                      name: "MySQL",
                      data: [0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 0],
                    },
                  ],
                },

                {
                  year: "Miscellaneous",
                  data: [
                    {
                      name: "Docker",
                      data: [0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 0],
                    },
                    {
                      name: "Scrum",
                      data: [0, 0, 0, 0, 0, 0, 0, 0, 95, 0, 0],
                    },
                    {
                      name: "Designing",
                      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 0],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
