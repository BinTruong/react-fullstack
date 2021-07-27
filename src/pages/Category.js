// import { filter } from 'lodash';
import { debounce } from 'lodash';
import { Icon } from '@iconify/react';
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
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  CategoryListHead,
  CategoryListToolbar,
  CategoryMoreMenu
} from '../components/_dashboard/category';
import CategoryDialogAdd from '../components/dialog/dialogCategory/dialogCategoryAdd';
//
// import categories from '../_mocks_/user';
import { categoriesApi } from '../apis';

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: 'title', label: 'Title', alignRight: false }];

// ----------------------------------------------------------------------

export default function Category() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('-');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('_id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalDocs, setTotalDocs] = useState(0);
  const [categories, setCategories] = useState([]);
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
    const getCategory = async () => {
      setIsLoading(false);
      const conditions = {
        keyword: keyWord,
        page,
        limit: rowsPerPage,
        sort_column: orderBy,
        sort_direction: order
      };
      const result = await categoriesApi.paging(conditions);

      if (result.data) {
        const { docs: categories, limit, page, totalDocs } = result.data.categories;
        setPage(page);
        setRowsPerPage(limit);
        setTotalDocs(totalDocs);
        setCategories(categories);
      }
      setIsLoading(true);
    };
    getCategory();
  }, [page, rowsPerPage, keyWord, order, orderBy, isCreate, isRemove, isEdit]);

  //! Change sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = categories.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  // const filteredUsers = applySortFilter(categories, getComparator(order, orderBy), filterName);

  const isUserNotFound = categories.length === 0;

  return (
    <>
      <CategoryDialogAdd open={open} handleClose={handleClose} setIsCreate={setIsCreate} />
      <Page title="Categories | Minimal-UI">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Categories Management
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleClickOpen}
            >
              New Category
            </Button>
          </Stack>

          <Card>
            {!isLoading && <LinearProgress />}
            <CategoryListToolbar
              // numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <CategoryListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    // rowCount={categories.length}
                    // numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    // onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {categories.map((row) => {
                      const { _id, title } = row;
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
                              {title}
                            </Typography>
                          </TableCell>
                          {/* <TableCell align="left">{firstName}</TableCell>
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
                          </TableCell> */}

                          <TableCell align="right">
                            <CategoryMoreMenu
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
