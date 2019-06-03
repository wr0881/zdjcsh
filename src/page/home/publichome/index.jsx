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
                        <ProjectType />
                    </div>
                </div>
                <div style={{
                    position: 'fixed',
                    bottom: '0px',
                    width: '100%',
                    height: '50px',
                    lineHeight: '50px',
                    textAlign: 'center'
                }}>
                    <a href="http://www.miitbeian.gov.cn" target="__blank" style={{ color: '#000' }}>湘ICP备18005958号</a>
                </div>
            </div>
        );
    }
}

export default Loging;