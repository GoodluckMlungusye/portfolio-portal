import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { capitalize } from 'src/utils/capitalize';

import LinkForm from 'src/forms/link-form';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ObjectForm from '../object-form';

// ----------------------------------------------------------------------

type Props = {
  pathName: string;
};

export default function CreateView({ pathName }: Props) {
  const settings = useSettingsContext();

  const renderForm = () => {
    switch (pathName) {
      case 'links':
        return <LinkForm />;
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
