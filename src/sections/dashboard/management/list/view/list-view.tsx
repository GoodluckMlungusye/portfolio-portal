import * as React from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { capitalize } from 'src/utils/capitalize';
import { generateColumns } from 'src/utils/generate-columns';

import { useDataContext } from 'src/contexts/data-context';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { TableNoData, TableSkeleton } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

type Props = {
  pathName: string;
};

export default function ListView({ pathName }: Props) {
  const { data, loading } = useDataContext();

  const confirm = useBoolean();
  const popover = usePopover();
  const settings = useSettingsContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');

  const startPaginationRows = page * rowsPerPage;
  const endPaginationRows = startPaginationRows + rowsPerPage;

  let columns = generateColumns(data);

  columns = [...columns, { id: 'actions', label: 'Actions', align: 'left', minWidth: 100 }];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredList = data.filter((row) =>
    columns.some((column) => {
      const rowValue = row[column.id as keyof typeof row];
      if (rowValue) {
        return rowValue.toString().toLowerCase().includes(searchQuery);
      }
      return false;
    })
  );

  const notFound = filteredList.length < 1;

  const columnHeads = columns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      style={{ minWidth: column.minWidth, width: '50%' }}
    >
      {column.label}
    </TableCell>
  ));

  const tableRows =
    filteredList.length > 0 ? (
      filteredList.slice(startPaginationRows, endPaginationRows).map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map((column) => {
            if (column.id === 'actions') {
              return (
                <TableCell key={column.id} align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                  <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                </TableCell>
              );
            }

            const rowIndex = column.id as keyof typeof row;
            const value = row[rowIndex];

            let displayValue;

            if (typeof value === 'boolean') {
              displayValue = value ? (
                <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main' }} />
              ) : (
                <Iconify icon="eva:close-circle-fill" sx={{ color: 'error.main' }} />
              );
            } else if (typeof value === 'string' && value.length > 50) {
              displayValue = (
                <Tooltip title={value} arrow>
                  <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'inline-block',
                    maxWidth: 200,
                  }}>
                    {value}
                  </span>
                </Tooltip>
              );
            } else {
              displayValue = value;
            }

            return (
              <TableCell key={column.id} align={column.align} style={{ width: '50%' }}>
                {displayValue}
              </TableCell>
            );
          })}
        </TableRow>
      ))
    ) : (
      <TableNoData notFound={notFound} />
    );


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: capitalize(pathName) },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={`${paths.dashboard.create.new}/${pathName}`}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {`New ${pathName}`}
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <TextField
            fullWidth
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4, px: 2, pt: 2 }}
          />

          <TableContainer sx={{ maxHeight: 440 }}>
            {loading ? (
              <TableSkeleton />
            ) : (
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>{columnHeads}</TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
              </Table>
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            // handleEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error">
            Delete
          </Button>
        }
      />
    </>
  );
}
