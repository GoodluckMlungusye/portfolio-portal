import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useController, useFormContext } from 'react-hook-form';

import { Box, Button, Popover } from '@mui/material';

export default function RHFColorPicker({ name, label }: { name: string; label: string }) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-popover' : undefined;

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ backgroundColor: field.value }}
      >
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <ChromePicker
            color={field.value || '#ffffff'}
            onChangeComplete={(color) => {
              field.onChange(color.hex);
            }}
          />
        </Box>
      </Popover>
    </>
  );
}
