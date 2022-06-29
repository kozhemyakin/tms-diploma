import * as React from 'react';
import TextField from '@mui/material/TextField';
import { FormLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Totals from './Totals';
import Grid from '@mui/material/Grid';


// import {checkoutTotalsContext, totals} from '../contexts/CheckoutTotals'

function Checkout() {

    return (
      <div className='wrapper'>
        <FormLabel className='checkout-form'>
          <TextField
            label="First name"
            variant="standard"
            sx={{marginTop: "60px", marginBottom: "10px"}}
          />
          <TextField
            label="Last name"
            variant="standard"
            sx={{margin: "10px 0"}}
          />
          <TextField
            label="Email"
            variant="standard"
            sx={{margin: "10px 0"}}
          />
          <TextField
            label="Shipping Address"
            variant="standard"
            sx={{margin: "10px 0"}}
          />
          <FormControlLabel className='disabled-checkbox' disabled control={<Checkbox defaultChecked sx={{margin: "20px 0"}} />} label="Pay by cash"/>
          <Button size="medium" className='checkout-btn' sx={{margin: "10px 0"}} >Place Order</Button>
        </FormLabel>
        <Grid
                style={{minWidth:"30%"}}
            >

            </Grid>
      </div>
    );
  }
  
  export default Checkout;