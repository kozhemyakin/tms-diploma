import React from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function Totals({count, totalPrice}) {

    return (
        <Grid>
            <Card
                style={{
                minHeight: "400px",
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between"
            }}>
                <Typography>
                    <Typography gutterBottom variant="h3" component="div" sx={{textAlign:'center', paddingTop:'10px'}}>
                        Total
                    </Typography>
                    <Typography variant="h5" component="div" sx={{textAlign:'center'}}>
                        {count} products: {totalPrice}$
                    </Typography>
                </Typography>
            </Card>
        </Grid>
    )
}

export default Totals;