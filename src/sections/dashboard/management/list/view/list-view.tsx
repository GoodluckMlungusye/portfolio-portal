import * as React from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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
// import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { generateColumns } from 'src/utils/generate-columns';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// Array of objects without the need for createData function
const rows = [
  {
    name: 'India',
    code: 'IN',
    population: 1324171354,
    size: 3287263,
    density: 1324171354 / 3287263,
  },
  {
    name: 'China',
    code: 'CN',
    population: 1403500365,
    size: 9596961,
    density: 1403500365 / 9596961,
  },
  { name: 'Italy', code: 'IT', population: 60483973, size: 301340, density: 60483973 / 301340 },
  {
    name: 'United States',
    code: 'US',
    population: 327167434,
    size: 9833520,
    density: 327167434 / 9833520,
  },
  { name: 'Canada', code: 'CA', population: 37602103, size: 9984670, density: 37602103 / 9984670 },
  {
    name: 'Australia',
    code: 'AU',
    population: 25475400,
    size: 7692024,
    density: 25475400 / 7692024,
  },
  { name: 'Germany', code: 'DE', population: 83019200, size: 357578, density: 83019200 / 357578 },
  { name: 'Ireland', code: 'IE', population: 4857000, size: 70273, density: 4857000 / 70273 },
  {
    name: 'Mexico',
    code: 'MX',
    population: 126577691,
    size: 1972550,
    density: 126577691 / 1972550,
  },
  { name: 'Japan', code: 'JP', population: 126317000, size: 377973, density: 126317000 / 377973 },
  { name: 'France', code: 'FR', population: 67022000, size: 640679, density: 67022000 / 640679 },
  {
    name: 'United Kingdom',
    code: 'GB',
    population: 67545757,
    size: 242495,
    density: 67545757 / 242495,
  },
  {
    name: 'Russia',
    code: 'RU',
    population: 146793744,
    size: 17098246,
    density: 146793744 / 17098246,
  },
  { name: 'Nigeria', code: 'NG', population: 200962417, size: 923768, density: 200962417 / 923768 },
  {
    name: 'Brazil',
    code: 'BR',
    population: 210147125,
    size: 8515767,
    density: 210147125 / 8515767,
  },
];

let columns = generateColumns(rows);

columns = [...columns, { id: 'actions', label: 'Actions', align: 'right', minWidth: 100 }];

type Props = {
  index: string;
};

export default function ListView({ index }: Props) {
  const [dashboardTitle, setDashboardTitle] = React.useState('');
  const [dashboardIndex, setDashboardIndex] = React.useState(0);

  const managementList = React.useMemo(
    () => [
      { title: 'Projects', id: 1 },
      { title: 'Skills', id: 2 },
      { title: 'Education', id: 3 },
      { title: 'Explore', id: 4 },
      { title: 'Services', id: 5 },
      { title: 'Navigations', id: 6 },
    ],
    []
  );

  React.useEffect(() => {
    const foundItem = managementList.find((item) => item.id === Number(index));
    if (foundItem) {
      setDashboardTitle(foundItem.title);
      setDashboardIndex(foundItem.id);
    }
  }, [index, managementList]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const confirm = useBoolean();

  const popover = usePopover();

  const settings = useSettingsContext();

  // const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleEditRow = React.useCallback(
  //   (id: string) => {
  //     router.push(paths.dashboard.create.edit(id));
  //   },
  //   [router]
  // );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: dashboardTitle },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={`${paths.dashboard.create.new}/${dashboardIndex}`}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {`New ${dashboardTitle}`}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 , px: 2, pt: 2}}
          />

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        // Render actions cell
                        return (
                          <TableCell
                            key={column.id}
                            align="right"
                            sx={{ px: 1, whiteSpace: 'nowrap' }}
                          >
                            <IconButton
                              color={popover.open ? 'inherit' : 'default'}
                              onClick={popover.onOpen}
                            >
                              <Iconify icon="eva:more-vertical-fill" />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      const value = row[column.id as keyof typeof row];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
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
          <Button
            variant="contained"
            color="error"
            //  onClick={onDeleteRow}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
