import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
// material
import Pagination from '@material-ui/core/Pagination';
import { Container, Stack, Typography, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  // ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';

//
// import PRODUCTS from '../_mocks_/products';

import { booksApi, categoriesApi } from '../apis';
// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('-');
  const [orderBy, setOrderBy] = useState('_id');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState([]);
  const [keyWord, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      const conditions = {
        keyword: keyWord,
        page,
        limit: rowsPerPage,
        sort_column: orderBy,
        sort_direction: order
      };
      const result = await booksApi.pageHome(conditions);

      if (result.data) {
        const { docs: bookList, limit, page, totalDocs, totalPages } = result.data.books;
        setPage(page);
        setRowsPerPage(limit);
        setTotalDocs(totalDocs);
        setBooks(bookList);
        setTotalPages(totalPages);
      }
      setIsLoading(false);
    };
    getBooks();
  }, [page, rowsPerPage, keyWord, order, orderBy]);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Page title="Dashboard: Products | Minimal-UI">
        <Container>
          <Stack direction="row" spacing={3}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Products
            </Typography>
            {isLoading && <CircularProgress />}
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilterSidebar
                formik={formik}
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort />
            </Stack>
          </Stack>

          <ProductList products={books} />
          {/* <ProductCartWidget /> */}
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Stack m={2}>
              <Pagination count={totalPages} color="primary" page={page} onChange={handleChange} />
            </Stack>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
