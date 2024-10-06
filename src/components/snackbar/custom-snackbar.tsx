import * as React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

type SnackbarProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
};

const CustomSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  duration = 6000,
}) => (
  <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;
