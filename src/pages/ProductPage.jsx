import React, { useState, useEffect } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Grid, Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import { Typography, CardMedia } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom";

import axios from 'axios';

import { useDispatch } from 'react-redux'
import { addProductOnBadge } from '../features/product/qtyCounterSlice'
import { getProducts } from '../features/product/getProductsSlice'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProductPage() {
    const dispatch = useDispatch();
    
    const { id } = useParams();

    const [ data, setData ] = useState([]);  

    const getProducts = async () => {
      const response = await axios.get('http://localhost:3001/products');
  
      return setData(response.data)
    }

    const productPhoto = data.find(item => item.id === id);

      useEffect(() => {
        getProducts();
      }, [])
      
    return (
        <>
            <Header />
            <Container>
                {productPhoto && (
                <Grid container spacing={0} sx={{ pt: 4, pb: 4 }}>
                    <Grid item xs={4}>
                        <Item>
                            <CardMedia
                            className='product-image'
                            component="img"
                            height="300"
                            width="300"
                            image={productPhoto.image}
                            alt={productPhoto.title}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>
                            <Typography variant="body2" color="text.secondary">{productPhoto.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{productPhoto.price}</Typography>
                            <Typography variant="body2" color="text.secondary">{productPhoto.description}</Typography>
                        </Item>
                        <Button size="small">Add to wishlist</Button>
                        <Button size="small" onClick={() => dispatch(addProductOnBadge(productPhoto.id))}>Add to cart</Button>
                    </Grid>
                </Grid>
                )}
            </Container>
            <Footer />
        </>
    )
}

export default ProductPage;