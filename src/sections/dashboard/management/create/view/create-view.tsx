import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { capitalize } from 'src/utils/capitalize';

import LinkForm from 'src/forms/link-form';
import SkillForm from 'src/forms/skill-form';
import ContactForm from 'src/forms/contact-form';
import ExploreForm from 'src/forms/explore-form';
import ProjectForm from 'src/forms/project-form';
import ServiceForm from 'src/forms/service-form';
import SubSkillForm from 'src/forms/sub-skill-form';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ObjectForm from '../object-form';

// ----------------------------------------------------------------------

type Props = {
  pathName: string;
  currentObject?: any;
};

export default function CreateView({ pathName, currentObject }: Props) {
  const settings = useSettingsContext();

  const renderForm = () => {
    switch (pathName) {
      case 'links':
        return <LinkForm pathName={pathName} currentObject={currentObject}/>;
      case 'skills':
        return <SkillForm pathName={pathName} currentObject={currentObject}/>;
      case 'contacts':
        return <ContactForm pathName={pathName} currentObject={currentObject}/>;
      case 'explore':
        return <ExploreForm pathName={pathName} currentObject={currentObject}/>;
      case 'projects':
        return <ProjectForm pathName={pathName} currentObject={currentObject}/>;
      case 'services':
        return <ServiceForm pathName={pathName} currentObject={currentObject}/>;
      case 'subskills':
        return <SubSkillForm pathName={pathName} currentObject={currentObject}/>;
      default:
        return (
          <EmptyContent
            title="Form Not Found"
            description="Sorry, we can't load the form you are looking for"
            action={
              <Button component={RouterLink} href="/" variant="contained" sx={{ mt: 2 }}>
                Go to Home
              </Button>
            }
          />
        );
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Create new ${pathName}`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: capitalize(pathName),
          },
          { name: 'Create' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ObjectForm>{renderForm()}</ObjectForm>
    </Container>
  );
}
