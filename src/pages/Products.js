import { debounce } from 'lodash';
// import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
// material
import Pagination from '@material-ui/core/Pagination';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Container,
  Stack,
  Typography,
  Grid,
  Box,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// components
import Page from '../components/Page';
import {
  // ProductSort,
  ProductList
  // ProductCartWidget,
  // ProductFilterSidebar
} from '../components/_dashboard/products';

//
// import PRODUCTS from '../_mocks_/products';

import { booksApi, categoriesApi } from '../apis';
// ----------------------------------------------------------------------

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

export default function EcommerceShop() {
  // const [openFilter, setOpenFilter] = useState(false);

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('-');
  const [orderBy, setOrderBy] = useState('_id');
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState([]);
  const [keyWord, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [filterName, setFilterName] = useState('');
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      const conditions = {
        filterCategory: category,
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
  }, [page, rowsPerPage, keyWord, order, orderBy, category]);

  useEffect(() => {
    const getListCategory = async () => {
      const result = await categoriesApi.getCategory();
      if (result.data) {
        setListCategory(result.data.categories);
        // setDefaultCategory(result.data.categories[0]._id);
      }
    };
    getListCategory();
  }, []);

  const handleFilterCategory = (event) => {
    setPage(1);
    setKeyword('');
    setFilterName('');
    setCategory(event.target.value);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     gender: '',
  //     category: '',
  //     colors: '',
  //     priceRange: '',
  //     rating: ''
  //   },
  //   onSubmit: () => {
  //     setOpenFilter(false);
  //   }
  // });

  // const { resetForm, handleSubmit } = formik;

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  // const handleResetFilter = () => {
  //   handleSubmit();
  //   resetForm();
  // };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const debounceSearch = useRef(debounce((value) => setKeyword(value), 1000)).current;
  const handleFilter = (event) => {
    // setRowsPerPage(5);
    setFilterName(event.target.value);
    debounceSearch(event.target.value);
    setPage(1);
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
            alignItems="center"
            justifyContent="space-between"
            mb={5}
            sx={{ mb: 5 }}
          >
            <SearchStyle
              value={filterName}
              onChange={handleFilter}
              placeholder="Search book..."
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
            />
            <FormControl style={{ minWidth: 320 }}>
              <InputLabel id="demo-simple-select-label">Filter by Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Filter by Category"
                onChange={handleFilterCategory}
              >
                <MenuItem value="">All</MenuItem>
                {listCategory.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilterSidebar
                formik={formik}
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort />
            </Stack> */}
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
