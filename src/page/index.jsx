import React, { Component, Fragment } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import axios from 'axios';
import Login from 'page/Login/Login';
import Home from 'page/home/loging/index';
import PublicHome from 'page/home/publichome/index';
import AlarmSimple from 'page/alarmsimple/alarmsimple';
import Layout from 'page/Layout/Layout';
import user from 'store/user';

@withRouter
@observer
class Root extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/publichome' component={PublicHome} />
                    <Route path='/home' component={Home} />
                    <Route path='/alarmsimple' component={AlarmSimple} />
                    <Route path='/project' component={Layout} />
                </Switch>
            </Fragment>
        );
    }
    componentDidMount() {
        //不需要登陆验证的页面;
        const publicList = ['/login', '/publichome'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        //需要登陆验证的页面;
        const token = window.localStorage.getItem('token');
        if (token !== 'null') {
            axios.defaults.headers.common['Authorization'] = token;
            user.isLogin = true;
            this.props.history.push('/home');
        } else {
            this.props.history.push('/publichome');
        }
    }
}

export default Root;
