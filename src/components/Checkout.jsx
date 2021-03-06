import * as React from 'react';
import TextField from '@mui/material/TextField';
import { FormLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Totals from './Totals';
import {clearCart} from '../features/product/qtyCounterSlice'
import { getProducts } from '../features/product/productsSlice';

function Checkout() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);  
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.qtyCounterSlice.ids);
  const cartQty = useSelector((state) => state.qtyCounterSlice.qty);

  let count = 0;
  let totalPrice = 0;

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
                  </Card>
              </Grid>
      )}
  })

  useEffect(() => {
    dispatch(getProducts())

  }, [dispatch])

  const [email, setEmail] = useState('');
  const [shipping, setShipping] = useState('');
  const [name, setName] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [shippingDirty, setShippingDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [shippingError, setShippingError] = useState('Shipping address cannot be empty');
  const [nameError, setNameError] = useState('Name cannot be empty');
  
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break;
      case 'shipping':
        setShippingDirty(true)
        break;
      case 'lastName':
        setNameDirty(true)
        break;
      default:
        break;
    }
  }
  
  const emailHandler = (e) => {
    setEmail(e);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e).toLowerCase())) {
      setEmailError('Incorrect email')
      if (e.length === 0) {
        setEmailError('Email cannot be empty')
      }
    } else {
      setEmailError('')
    }
  }

  const shippingHandler = (e) => {
    setShipping(e);

    if (e.length < 8) {
      setShippingError('Check your address again')
    } else {
      setShippingError('')
    }
  }

  const nameHandler = (e) => {
    setName(e);

    if (e.length < 1) {
      setNameError('Check your name again')
    } else {
      setNameError('')
    }
  }

  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    shipping: ''
  })

  const onPlaceOrder = (fieldName, value) => {
    if (fieldName === 'email') {
      emailHandler(value)
    } else if (fieldName === 'shipping') {
      shippingHandler(value)
    } else if (fieldName === 'lastName') {
      nameHandler(value)
    }

    setOrderData({
      ...orderData,
      [fieldName]: value,
    })
  }

  const placeOrder = async () => {
    const res = await axios.post('http://localhost:3001/orders', {
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      user_email: orderData.email,
      shipping: orderData.shipping,
      order_id: Math.floor(Math.random() * 16000),
      products_ids: cartItems,
      cartTotal: totalPrice
    });

    dispatch(clearCart());

    navigate('/');

    alert('Order has successfully been placed');
  }
 
  return (
    <div className='checkout-wrapper'>
      <FormLabel className='checkout-form'>
        <TextField
          value={orderData.firstName}
          onBlur={e => blurHandler(e)}      
          onChange={(event) => onPlaceOrder('firstName', event.target.value)}       
          placeholder="First name"
          variant="standard"
          sx={{marginTop: "60px", marginBottom: "10px"}}
        />
        <TextField
          value={name}
          onBlur={e => blurHandler(e)}      
          name='lastName'
          onChange={(event) => onPlaceOrder('lastName', event.target.value)}       
          placeholder="Last name"
          variant="standard"
          sx={{margin: "10px 0"}}
        />
        {(nameDirty && nameError) && <div style={{color: 'red', fontSize: '14px'}}>{nameError}</div>}
        <TextField
          value={email}
          onBlur={e => blurHandler(e)}      
          name='email'
          type='text'
          onChange={(event) => onPlaceOrder('email', event.target.value)}       
          placeholder="Email"
          variant="standard"
          sx={{margin: "10px 0"}}
        />
        {(emailDirty && emailError) && <div style={{color: 'red', fontSize: '14px'}}>{emailError}</div>}
        <TextField
          value={shipping}
          onBlur={e => blurHandler(e)}      
          name='shipping'
          onChange={(event) => onPlaceOrder('shipping', event.target.value)}       
          placeholder="Shipping Address"
          variant="standard"
          sx={{margin: "10px 0"}}
        />
        {(shippingDirty && shippingError) && <div style={{color: 'red', fontSize: '14px'}}>{shippingError}</div>}
        <FormControlLabel className='disabled-checkbox' disabled control={<Checkbox defaultChecked sx={{margin: "20px 0"}} />} label="Pay by cash"/>
        <Button size="medium" disabled={emailError.length || shippingError.length || nameError.length} className='checkout-btn' sx={{marginTop: "50px"}} onClick={placeOrder}>Place Order</Button>
      </FormLabel>
      <div className='checkout-totals'><Totals count={count} totalPrice={totalPrice} className='checkout-totals'/></div>
    </div>
  );
}
  
export default Checkout;