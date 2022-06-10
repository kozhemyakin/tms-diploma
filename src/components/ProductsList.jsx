import Grid from '@mui/material/Grid';
import Product from './Product';

function ProductsList() {
  return ( 
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 18 }} sx={{ pt: 4, pb: 4 }}>
      <Product />
    </Grid>
  );
}

export default ProductsList;