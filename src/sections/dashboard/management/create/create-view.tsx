import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import SkillForm from 'src/forms/skill-form';
import ContactForm from 'src/forms/contact-form';
import ExploreForm from 'src/forms/explore-form';
import ProjectForm from 'src/forms/project-form';
import ServiceForm from 'src/forms/service-form';
import SubSkillForm from 'src/forms/sub-skill-form';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import ObjectForm from './object-form';

// ----------------------------------------------------------------------

type Props = {
  pathName: string;
};

export default function CreateView({ pathName }: Props) {
  const settings = useSettingsContext();
  
  const renderForm = () => {
    switch (pathName) {
      case 'skills':
        return <SkillForm pathName={pathName} />;
      case 'contacts':
        return <ContactForm pathName={pathName} />;
      case 'explore':
        return <ExploreForm pathName={pathName} />;
      case 'projects':
        return <ProjectForm pathName={pathName} />;
      case 'services':
        return <ServiceForm pathName={pathName} />;
      case 'subskills':
        return <SubSkillForm pathName={pathName} />;
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
      <ObjectForm>{renderForm()}</ObjectForm>
    </Container>
  );
}
