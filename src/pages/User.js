// import { filter } from 'lodash';
import { debounce } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  // Avatar,
  Button,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import UserDialogAdd from '../components/dialog/dialogUser/dialogUserAdd';
//
// import users from '../_mocks_/user';
import { usersApi } from '../apis';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'username', label: 'UserName', alignRight: false },
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true }
];

// ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

export default function User() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('-');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('_id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalDocs, setTotalDocs] = useState(0);
  const [users, setUsers] = useState([]);
  const [keyWord, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(false);
      const conditions = {
        keyword: keyWord,
        page,
        limit: rowsPerPage,
        sort_column: orderBy,
        sort_direction: order
      };
      const result = await usersApi.paging(conditions);

      if (result.data) {
        const { docs: userList, limit, page, totalDocs } = result.data.users;
        setPage(page);
        setRowsPerPage(limit);
        setTotalDocs(totalDocs);
        setUsers(userList);
      }
      setIsLoading(true);
    };
    getUser();
  }, [page, rowsPerPage, keyWord, order, orderBy, isCreate, isRemove, isEdit]);

  //! Change sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = users.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };
  //! Change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  //! Change page row
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  //! Search
  const debounceSearch = useRef(debounce((value) => setKeyword(value), 1000)).current;
  const handleFilterByName = (event) => {
    setPage(1);
    setRowsPerPage(5);
    setFilterName(event.target.value);
    debounceSearch(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = users.length === 0;

  return (
    <>
      <UserDialogAdd open={open} handleClose={handleClose} setIsCreate={setIsCreate} />
      <Page title="User | Minimal-UI">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              User Management
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleClickOpen}
            >
              New User
            </Button>
          </Stack>

          <Card>
            {!isLoading && <LinearProgress />}
            <UserListToolbar
              // numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    // rowCount={users.length}
                    // numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    // onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {users.map((row) => {
                      const { _id, username, firstName, lastName, role } = row;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell> */}
                          <TableCell component="th" scope="row" px={2}>
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{firstName}</TableCell>
                          <TableCell align="left">{lastName}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                // eslint-disable-next-line no-nested-ternary
                                role[0] === 'admin'
                                  ? 'success'
                                  : role[0] === 'contributor'
                                  ? 'warning'
                                  : 'info'
                              }
                            >
                              {sentenceCase(role[0])}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              _id={_id}
                              setIsRemove={setIsRemove}
                              setIsEdit={setIsEdit}
                              row={row}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            {!isUserNotFound && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalDocs}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Card>
        </Container>
      </Page>
    </>
  );
}
