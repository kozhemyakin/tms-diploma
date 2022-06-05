import React from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container } from '@mui/material';

function NotFound() {
    return (
        <>
            <Header />
            <Container>
                NOT FOUND
            </Container>
            <Footer />
        </>
    )
}

export default NotFound;