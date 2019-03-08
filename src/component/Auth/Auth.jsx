import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import user from 'store/user';

@withRouter
@observer
class Auth extends React.Component {
    render() {
        return null;
    }
    componentDidMount() {
        //不需要登陆验证的页面;
        const publicList = ['/login', '/publichome'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        //需要登陆验证的页面;
        if (!user.isLogin) {
            this.props.history.push('/publichome');
            // this.props.history.push('/login');
        }
    }
}

export default Auth;