import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import Header from 'component/header/header';
import Nav from './Nav';
import Overview from 'page/overview/overview';
import Manage from 'page/manage/manage';
import Detail from 'page/Detail/Detail';
import Bim from 'page/bim/bim';
import Gis from 'page/gis/gis';
import unit from 'store/unit';
import './Layout.scss';

@observer
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const curUrl = this.props.match.url;
        return (
            <div className="layout">
                <Header />
                <Nav className='nav' />
                <div className="layout-content">
                    <Switch>
                        <Route exact path={`${curUrl}/overview`} component={Overview} />
                        <Route exact path={`${curUrl}/manage`} component={Manage} />
                        <Route path={`${curUrl}/manage/detail`} component={Detail} />
                        <Route exact path={`${curUrl}/bim`} component={Bim} />
                        <Route exact path={`${curUrl}/gis`} component={Gis} />
                    </Switch>
                </div>
            </div>
        );
    }
    componentDidMount(){
        axios.get('/sector/queryMonitorUnit').then(res => {
            const { code, data, msg } = res.data;
            unit.unit = data;
            console.log(data);
        })
    }
}

export default Layout;