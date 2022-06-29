import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Totals({count, totalPrice}) {

    return (
        <Grid>
        <Card
            style={{
                minHeight: "400px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between"}}
        >
                <Typography>
                    <Typography gutterBottom variant="h3" component="div" sx={{textAlign:'center', paddingTop:'10px'}}>
                        Total
                    </Typography>
                    <Typography variant="h5" component="div" sx={{textAlign:'center'}}>
                        {count} products: {totalPrice}$
                    </Typography>
                </Typography>
                <CardActions className='btn proceed-btn'>
                    <Link to='/checkout'>
                        Proceed to checkout
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Totals;