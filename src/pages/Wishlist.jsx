import React from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Link } from '@mui/material';
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import{ addProductOnBadge} from '../features/product/qtyCounterSlice'

function Wishlist() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.qtyCounterSlice.ws_products);

    const [data, setData] = useState([]);

    const getProducts = async () => {
        const response = await axios.get('http://localhost:3001/products');
    
        return setData(response.data)
    }

    useEffect(() => {
        getProducts();
    }, [])

    const product = data.filter((item) => wishlistItems.includes(item.id)).map( (item) => {
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
                        <Button size="small" onClick={() => dispatch(addProductOnBadge(item.id))}>Add to cart</Button>
                    </CardActions>
                    </Card>
            </Grid>
        );
      });

    return (
        <>
            <Header />
                <Container>
                    {product}
                </Container>
            <Footer />
        </>
    )
}

export default Wishlist;