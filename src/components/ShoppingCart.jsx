
import React from 'react';
import { useEffect } from 'react';
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
import { getProducts } from '../features/product/productsSlice';

function ShoppingCart() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const cartItems = useSelector((state) => state.qtyCounterSlice.ids);
    const cartQty = useSelector((state) => state.qtyCounterSlice.qty);
    const cartProducts = products.filter((item) => cartItems.includes(item.id));

    let count = 0;
    let totalPrice = 0;
    
    const singleProductInCart = cartProducts.map((item) => {
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
                            <Typography variant="body2" color="text.secondary" sx={{fontSize: '18px'}}>
                                {item.price}$
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
        dispatch(getProducts())
    
      }, [dispatch])

  return (
    <div>
        {singleProductInCart[0] ? 
            <Grid container 
                columns={1} 
                sx={{ pt: 4, pb: 4 }}
                style={{display:"flex"}}>
                <Grid style={{minWidth:"40%", maxWidth: "70%"}}>
                    {singleProductInCart}
                </Grid>
                <Grid style={{minWidth:"30%"}}>
                    <Totals count={count} totalPrice={totalPrice} />
                    <CardActions className='proceed-btn'>
                        <Link to='/checkout'>
                            Proceed to checkout
                        </Link>
                    </CardActions>
                </Grid>
            </Grid>
            : <p>There are no products yet</p>}
    </div>
  );
}

export default ShoppingCart;
