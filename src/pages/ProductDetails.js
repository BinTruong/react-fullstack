import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// material
import { Box, Card, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import Button from '@material-ui/core/Button';
import { booksApi } from '../apis';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

export default function ProductDetails() {
  const [bookDetails, setBookDetails] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    const getDetailsBook = async () => {
      const result = await booksApi.getDetailBook(_id);
      if (result.data) {
        setBookDetails(result.data.book);
      }
    };
    getDetailsBook();
  }, []);
  return (
    <>
      {bookDetails && (
        <Card>
          <Box sx={{ pt: '50%', position: 'relative' }}>
            <ProductImgStyle
              alt={bookDetails.title}
              src={`http://localhost:3001/${bookDetails.cover}`}
            />
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle2" noWrap>
              {bookDetails.title}
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Button variant="outlined">{bookDetails.category}</Button>
              {/* <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
              {author}
            </Typography>
          </Typography> */}
            </Stack>
          </Stack>
        </Card>
      )}
    </>
  );
}
