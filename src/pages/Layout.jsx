import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container } from '@mui/material';

const Layout = (props) => {

    return (<>
        <Header />
        <Container>
            { props.children }
        </Container>
        <Footer />
        </>)
}

export default Layout;
