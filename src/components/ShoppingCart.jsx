
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { deleteProduct } from '../features/product/qtyCounterSlice'
import { useSelector, useDispatch } from 'react-redux'
import {increment,decrement} from '../features/product/qtyCounterSlice'

import Totals from './Totals';

function ShoppingCart() {
    const dispatch = useDispatch();

    let count = 0;
    let totalPrice = 0;

    const [products, setProducts] = useState([]);
    const cartItems = useSelector((state) => state.qtyCounterSlice.ids);
    const cartQty = useSelector((state) => state.qtyCounterSlice.qty);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3001/products');
    
        return setProducts(response.data)
    }

    const cartProducts = products.filter((item) => cartItems.includes(item.id));
    
    const singleProductInCart = cartProducts.map((item) => {
        const singleProductsPrice = item.price * cartQty[item.id];

        count += cartQty[item.id];
        totalPrice += item.price * cartQty[item.id];
        

        if (cartQty.hasOwnProperty(item.id)) {
            return (
                <Grid key={item.id} value={item.id} item sm={6}>
                    <Card style={{display:"flex"}}>
                    <Link to={`/product/${item.id}`}>
                        <CardMedia
                            className='product-image'
                            component="img"
                            image={item.image}
                            alt={item.title}
                            style={{width: "200px", height:"200px"}}
                        />
                    </Link>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.price}$
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {cartQty[item.id]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='s-product-price'>
                                {singleProductsPrice}
                            </Typography>
                        </CardContent>
                    
                    <CardActions>
                    <Button size="small" onClick={() => dispatch(decrement(item.id))}> - </Button>
                            {cartQty[item.id]}
                        <Button size="small" onClick={() => dispatch(increment(item.id))}> + </Button>
                        
                    </CardActions>
                    <CardActions>
                        <Button size="small" onClick={() => dispatch(deleteProduct(item.id))}>Delete</Button>
                    </CardActions>
                    </Card>
                </Grid>
        )}
    })

    useEffect(() => {
        getProducts();
      }, [])

  return (
    <div>
    {singleProductInCart[0] ? 
        <Grid container 
            columns={1} 
            sx={{ pt: 4, pb: 4 }}
            style={{display:"flex"}}>

            <Grid style={{minWidth:"60%", maxWidth: "70%"}}>
                {singleProductInCart}
            </Grid>
            <Grid style={{minWidth:"30%"}}>
                <Totals count={count} totalPrice={totalPrice} />
            </Grid>
        </Grid>
        : <p>There are no products yet</p>}
    </div>
  );
}

export default ShoppingCart;
