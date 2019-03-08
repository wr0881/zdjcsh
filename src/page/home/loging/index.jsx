import React, { Component } from 'react';
import Header from 'component/header/header';
import ProjectType from './projecttype';
import ProjectAlarm from './projectalarm';
import ProjectNew from './projectnew';
import './index.scss';

class Loging extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="loging">
                <Header />
                <div className="loging-wrapper">
                    <div className="loging-content">
                        <div className='loging-content-item1'>
                            <ProjectType />
                        </div>
                        <div className='loging-content-item2'>
                            <ProjectAlarm />
                        </div>
                        <div className='loging-content-item3'>
                            <ProjectNew />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loging;