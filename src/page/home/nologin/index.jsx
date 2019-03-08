import React, { Component } from 'react';
import Header from 'component/header/header';
import Banner from './banner';
import Serve from './serve';
import Product from './product';
import Footer from './footer';
import './index.scss';

class Nologinhome extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="nologinhome">
                <Header islogin={true} />
                <Banner />
                <Serve />
                <Product />
                <Footer />
            </div>
        );
    }
}

export default Nologinhome;