import React from "react";
import Header from '../components/Header'
import ProductsList from '../components/ProductsList'
import Footer from '../components/Footer'
import { Container } from '@mui/material';


function Homepage() {
    return (
        <>
            <Header />
            <Container>
                <ProductsList />
            </Container>
            <Footer />
        </>
    )
}

export default Homepage;