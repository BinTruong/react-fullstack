import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import Button from '@material-ui/core/Button';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { _id, cover, title, category } = product;

  return (
    <Card>
      <Link to={`/home/products/${_id}`} color="inherit" underline="none" component={RouterLink}>
        <Box sx={{ pt: '50%', position: 'relative' }}>
          <ProductImgStyle alt={title} src={`http://localhost:3001/${cover}`} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="outlined">{category.title}</Button>
            {/* <Typography variant="subtitle1">
            <Typography component="span" variant="body1">
              {author}
            </Typography>
          </Typography> */}
          </Stack>
        </Stack>
      </Link>
    </Card>
  );
}
