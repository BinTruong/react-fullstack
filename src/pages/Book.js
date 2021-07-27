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
  TablePagination,
  CardMedia
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Image from 'material-ui-image';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { BookListHead, BookListToolbar, BookMoreMenu } from '../components/_dashboard/books';
import BookDialogAdd from '../components/dialog/dialogBook/dialogBookAdd';
//
// import books from '../_mocks_/user';
import { booksApi, categoriesApi } from '../apis';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'cover', label: 'Cover', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'author', label: 'Author', alignRight: false },
  { id: 'owner', label: 'Owner', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true }
];

// ----------------------------------------------------------------------

export default function Book() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('-');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('_id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalDocs, setTotalDocs] = useState(0);
  const [books, setBooks] = useState([]);
  const [keyWord, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(false);
      const conditions = {
        keyword: keyWord,
        page,
        limit: rowsPerPage,
        sort_column: orderBy,
        sort_direction: order
      };
      const result = await booksApi.paging(conditions);

      if (result.data) {
        const { docs: bookList, limit, page, totalDocs } = result.data.books;
        setPage(page);
        setRowsPerPage(limit);
        setTotalDocs(totalDocs);
        setBooks(bookList);
      }
      setIsLoading(true);
    };
    getBooks();
  }, [page, rowsPerPage, keyWord, order, orderBy, isCreate, isRemove, isEdit]);

  useEffect(() => {
    const getListCategory = async () => {
      const result = await categoriesApi.getCategory();
      if (result.data) {
        setListCategory(result.data.categories);
        setDefaultCategory(result.data.categories[0]._id);
      }
    };
    getListCategory();
  }, []);

  //! Change sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
  };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  // const filteredUsers = applySortFilter(books, getComparator(order, orderBy), filterName);

  const isUserNotFound = books.length === 0;

  return (
    <>
      {open && (
        <BookDialogAdd
          open={open}
          handleClose={handleClose}
          setIsCreate={setIsCreate}
          listCategory={listCategory}
          defaultCategory={defaultCategory}
        />
      )}
      <Page title="Book | Minimal-UI">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Book Management
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleClickOpen}
            >
              New Book
            </Button>
          </Stack>

          <Card>
            {!isLoading && <LinearProgress />}
            <BookListToolbar
              // numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <BookListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    // rowCount={books.length}
                    // numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    // onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {books.map((row) => {
                      const { _id, cover, title, category, description, author, owner } = row;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          <TableCell>
                            <CardMedia
                              sx={{ height: 120, width: 120 }}
                              image={`https://nodejs-auth-restapi-crud.herokuapp.com/${cover}`}
                              title="Cover"
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{category.title}</TableCell>
                          <TableCell align="left">{description.substring(0, 20)}...</TableCell>
                          <TableCell align="left">{author}...</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                // eslint-disable-next-line no-nested-ternary
                                owner.role[0] === 'admin'
                                  ? 'success'
                                  : owner.role[0] === 'contributor'
                                  ? 'warning'
                                  : 'info'
                              }
                            >
                              {sentenceCase(owner.firstName)} {sentenceCase(owner.lastName)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <BookMoreMenu
                              _id={_id}
                              setIsRemove={setIsRemove}
                              setIsEdit={setIsEdit}
                              row={row}
                              listCategory={listCategory}
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
