import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react'; 
import Pagination from './Pagination';
import { useDispatch } from 'react-redux'
import { addProductOnBadge, addToWishlist } from '../features/product/qtyCounterSlice'
import { Link } from 'react-router-dom'

function Product() {
  const dispatch = useDispatch();

  const [ data, setData ] = useState([]);  

  const getProducts = async () => {
    const response = await axios.get('http://localhost:3001/products');

    return setData(response.data)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const lastProductPage = currentPage * productsPerPage;
  const firstProductIndex = lastProductPage - productsPerPage;
  const currentProduct = data.slice(firstProductIndex, lastProductPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    return currentPage;
    } else {
      return;  
    }  
  }

  const nextPage = () => {
    if (currentPage < currentProduct.length - 1) {
      setCurrentPage(currentPage + 1)
    return currentPage;
    } else {
      return;  
    }  
  }
  
  const product = currentProduct.map( (item) => {
    return (
        <Grid key={item.id} value={item.id} item sm={6}>
                <Card>
                <Link to={`/product/${item.id}`}>
                    <CardMedia
                        className='product-image'
                        component="img"
                        style={{width: "300px", height:"300px"}}
                        image={item.image}
                        alt={item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {item.price}$
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions>
                    <Button size="small" onClick={() => dispatch(addToWishlist(item.id))}>Add to wishlist</Button>
                    <Button size="small" onClick={() => dispatch(addProductOnBadge(item.id))}>Add to cart</Button>
                </CardActions>
                </Card>
        </Grid>
    );
  });

  useEffect(() => {
    getProducts();
  }, [])
  
  return (
    <>
      <Grid container 
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
        columns={{ xs: 4, sm: 12, md: 18 }} 
        sx={{ pt: 4, pb: 4 }}
      >
          {product}
      </Grid>

      <Pagination 
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        currentProduct={currentProduct}
        productsPerPage={productsPerPage} 
        totalProducts={data.length} 
        paginate={paginate}
      />
    </>
  )
}

export default Product;