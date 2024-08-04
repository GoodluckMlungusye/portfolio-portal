import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { IUserProfile, IUserProfilePost } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  info: IUserProfile;
  posts: IUserProfilePost[];
};

export default function ProfileHome({ info, posts }: Props) {
  const renderFollows = (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(info.totalFollowers)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Follower
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(info.totalFollowing)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Following
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{info.quote}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Live at `}
            <Link variant="subtitle2" color="inherit">
              {info.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {info.email}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {info.role} {`at `}
            <Link variant="subtitle2" color="inherit">
              {info.company}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Studied at `}
            <Link variant="subtitle2" color="inherit">
              {info.school}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2' }}
          >
            <Iconify
              icon={link.icon}
              width={24}
              sx={{
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link color="inherit">
              {link.value === 'facebook' && info.socialLinks.facebook}
              {link.value === 'instagram' && info.socialLinks.instagram}
              {link.value === 'linkedin' && info.socialLinks.linkedin}
              {link.value === 'twitter' && info.socialLinks.twitter}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          {renderFollows}

          {renderAbout}

          {renderSocials}
        </Stack>
      </Grid>
    </Grid>
  );
}
