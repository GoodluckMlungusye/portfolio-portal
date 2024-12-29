import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useDashboardData } from 'src/hooks/use-dashboard-data';

import { transformToDynamicSkillSeries } from 'src/utils/transform-skill-format';

import { SeoIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

import { SkillSet } from 'src/types/skill';

import AppWelcome from '../app-welcome';
import AppAreaVisual from '../app-area-visual';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useMockedUser();
  const { data: projects } = useDashboardData('projects');
  const { data: clients } = useDashboardData('clients');
  const { data: skills } = useDashboardData('skills');

  const settings = useSettingsContext();

  const skillSeries =
    skills && skills.length > 0
      ? skills.map((skill: SkillSet) => ({
          label: skill.name,
          value: skill.subSkillList.length,
        }))
      : [];

  const subSkills =
    skills && skills.length > 0
      ? [
          '',
          ...skills.flatMap((skill: SkillSet) =>
            skill.subSkillList.map((subskill) => subskill.name)
          ),
          '',
        ]
      : ['', ''];

  const totalSkills = subSkills.length - 2;
  const seriesLength = subSkills.length;
  const dynamicSkillSeries = transformToDynamicSkillSeries(skills, seriesLength, subSkills);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
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
          <AppWidgetSummary title="Total Projects" total={(projects && projects.length) || 0} pathName="projects"/>
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary title="Total Clients" total={(clients && clients.length) || 0} pathName="clients"/>
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary title="Total Skills" total={(skills && totalSkills) || 0} pathName="subskills"/>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Core Skills"
            chart={{
              series: skillSeries,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaVisual
            title="Skills"
            chart={{
              categories: subSkills,
              series: dynamicSkillSeries,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
