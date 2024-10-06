import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export default function TableSkeleton() {
  return (
    <Box sx={{ width: '100%',  px: 2 }}>
      <Grid container spacing={2} mb={4}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid item xs={12} sm={2.4} key={index}>
            <Skeleton height={30} width="100%" sx={{ borderRadius: 0.5 }}/>
          </Grid>
        ))}
      </Grid>

      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <Grid container spacing={2} mb={2} key={rowIndex}>
          {Array.from({ length: 5 }).map((__, colIndex) => ( 
            <Grid item xs={12} sm={2.4} key={colIndex}>
              <Skeleton height={20} width="100%" sx={{ borderRadius: 0.5 }}/>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
}
