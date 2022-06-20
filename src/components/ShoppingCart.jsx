
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../style/styles.css'
import { Link } from 'react-router-dom';
import { display } from '@mui/system';


function ShoppingCart() {

    const [products, setProducts] = useState([]);
    const cartItems = useSelector((state) => state.qtyCounterSlice.ids)
    const cartQty = useSelector((state) => state.qtyCounterSlice.qty)  

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3001/products');
    
        return setProducts(response.data)
    }

    const cartProducts = products.filter((item) => cartItems.includes(item.id))
    
    const singleProductInCart = cartProducts.map((item) => {
        const singleProductsPrice = item.price * cartQty[item.id];

        if (cartQty.hasOwnProperty(item.id)) {
            return (
                <Grid key={item.id} value={item.id} item sm={6}>
                    <Card style={{display:"flex"}}>
                    <Link to={`/product/${item.id}`}>
                        <CardMedia
                            className='product-image'
                            component="img"
                            height="300"
                            width="300"
                            image={item.image}
                            alt={item.title}
                        />
                    </Link>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {cartQty[item.id]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='s-product-price'>
                            {singleProductsPrice}
                            </Typography>
                        </CardContent>
                    
                    <CardActions>
                        <Button size="small">Add to wishlist</Button>
                    </CardActions>
                    </Card>
                </Grid>
        )}       
    })
    
    useEffect(() => {
        getProducts();
      }, [])

  return (
    <>
        <Grid container 
        rowSpacing={1} 
        columns={1} 
        sx={{ pt: 4, pb: 4 }}
        >
          {singleProductInCart}
        </Grid>
        <Grid>
            {
                
             
            }
        </Grid>
    </>
  );
}

export default ShoppingCart;
