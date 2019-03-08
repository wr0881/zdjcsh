import React, { Component } from 'react';
import banner from 'common/image/banner.png';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div><img src={banner} alt="" style={{ width: '100%', height: '350px' }} /></div>
        );
    }
}

export default Banner;