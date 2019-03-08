import React, { Component } from 'react';
import './productitem.scss';

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { text, dec } = this.props;
        return (
            <div className="product-item" style={{ width: '400px', height: '154px' }}>
                <div className="product-item-title">{text}</div>
                <div className="product-item-dec">{dec}</div>
            </div>
        );
    }
}

export default ProductItem;