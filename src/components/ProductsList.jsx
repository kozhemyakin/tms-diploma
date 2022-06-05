import Grid from '@mui/material/Grid';
import Product from './Product'

function ProductsList() {
  return ( 
    <Grid container rowSpacing={1} columnSpacing={1} columns={3} sx={{m:'0 auto'}}>
      <Product />
    </Grid>
  );
}

export default ProductsList;