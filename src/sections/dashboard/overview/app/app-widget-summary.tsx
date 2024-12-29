import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  pathName: string;
}

export default function AppWidgetSummary({ title, total, pathName, sx, ...other }: Props) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`${paths.dashboard.view.list}/${pathName}`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 3,
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease',
        },
        ...sx,
      }}
      onClick={handleCardClick}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>
    </Card>
  );
}
