import React, { Component } from 'react';
import Header from './header/header';
import ProjectType from './projecttype';
import './index.scss';

class Loging extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="loging" id='publichome'>
                <Header />
                <div className="loging-wrapper">
                    <div className="loging-content">
                        <div className='loging-content-item1'>
                            <ProjectType />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loging;