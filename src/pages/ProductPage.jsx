import React, { useState, useEffect } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Grid, Button, Typography, CardMedia, Paper, Card, formHelperTextClasses} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addProductOnBadge, addToWishlist } from '../features/product/qtyCounterSlice'
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProductPage() {
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState([]);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

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
    getComments();
  }, [])

  const addComment = async () => {
    const response = await axios.post('http://localhost:3001/comments', {
      comment_id: Math.floor(Math.random() * 1600000),
      product_id: id,
      userName: 'guest',
      text: comment,
    });

    getComments();
    setComment('')
  }

  const getComments = async () => {
    const response = await axios.get('http://localhost:3001/comments');
  
    return setComments(response.data.filter(item => item.product_id=== id))
  }

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
                    <Grid item sx={{display: 'flex', flexDirection: "column", }}>
                        <Item>
                            <Typography sx={{height: '60px', fontSize: '34px'}} variant="body2" color="text.secondary">{productPhoto.title}</Typography>
                            <Typography sx={{height: '60px', fontSize: '32px'}} variant="body2" color="text.secondary">{productPhoto.price}$</Typography>
                            <Typography sx={{height: '100px', maxWidth: '600px'}} variant="body2" color="text.secondary">{productPhoto.description}</Typography>
                        </Item>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '200px', margin: '15px'}}>
                          <Button size="small" onClick={() => dispatch(addToWishlist(productPhoto.id))} className="btn btn-add-to-wishlist">Add to Wishlist</Button>
                          <Button size="small" onClick={() => dispatch(addProductOnBadge(productPhoto.id))} className="btn btn-add-to-cart">Add to cart</Button>
                        </div>
                    </Grid>
                    <Grid className='comments-container'>
                      <div className="comments-actions">
                        <TextField
                          className="comments-textfield"
                          id="outlined-multiline-flexible"
                          placeholder="Leave a comment here"
                          multiline
                          maxRows={4}
                          value={comment}
                          onChange={handleChange}
                        />
                        <Button size="small" onClick={addComment}>Send comment</Button>
                      </div>
                      {comments.map((item) => {
                        return (
                          <Card className="comment-card" key={item.comment_id}>
                            {item.text}
                          </Card>
                        )
                      })}
                    </Grid>
                </Grid>
                )}
            </Container>
            <Footer />
        </>
    )
}

export default ProductPage;