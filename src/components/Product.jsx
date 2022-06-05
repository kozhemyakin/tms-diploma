import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../style/styles.css'

import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Product() {
  const [ data, setData ] = useState([]);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:3001/products');

    return setData(response.data)
  }
  
  const product = data.map( (item) => {
    return (
        <Grid key={item.id} value={item.id} item sm={6}>
                <Card>
                <Link to={`/product/${item.id}`}>
                    <CardMedia
                        className='product-image'
                        component="img"
                        height="300"
                        width="300"
                        image={item.image}
                        alt={item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {item.price}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions>
                    <Button size="small">Add to wishlist</Button>
                    <Button size="small">Add to cart</Button>
                </CardActions>
                </Card>
        </Grid>
    );
  });

  useEffect(() => {
    getProducts();
  }, [])

  return ( 

    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 18 }} sx={{ pt: 4, pb: 4 }}>
      {product}
    </Grid>

  );
}

export default Product;