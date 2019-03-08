import React, { Component } from 'react';

class Bim extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <iframe title='bim' src="http://www.thingjs.com/demos/menu.html?name=silohouse" frameborder="0" width='100%' height='100%' />
            </div>
        );
    }
}

export default Bim;