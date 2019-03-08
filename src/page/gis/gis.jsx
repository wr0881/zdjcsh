import React, { Component } from 'react';

class Gis extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <iframe title='gis' src="http://123.207.119.53:8000/site1/index.html" frameborder="0" width='100%' height='100%' />
            </div>
        );
    }
}

export default Gis;