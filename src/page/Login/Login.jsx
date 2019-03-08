import React, { Component } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'antd';
import user from 'store/user';
import { Post } from 'common/js/util.js';
import loginImg from 'common/image/登陆.png';
import loginUsernameImg from 'common/image/登陆账号名.png';
import loginPasswordImg from 'common/image/登陆密码.png';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'kx',
            password: '123456',
            msg: '',
            isloading: false
        }
    }
    render() {
        return (
            <div className='login-wrapper'>
                <Row>
                    <Col span='12'>
                        <div className="login-img">
                            <img src={loginImg} alt="" />
                        </div>
                    </Col>
                    <Col span='12'>
                        <div className="login-content-wrapper">
                            <div className="login-content">
                                <div className="login-title">欢迎登录<br />中大智能监测云平台</div>
                                <div className="login-input-acount">
                                    <div className="login-input-name">
                                        <div className="login-input-icon">
                                            <img src={loginUsernameImg} alt="" />
                                        </div>
                                        <input type="text" placeholder='用户名'
                                            onChange={e => {
                                                this.setState({ username: e.target.value });
                                            }}
                                            onFocus={_ => {
                                                this.setState({ msg: '' })
                                            }}
                                        />
                                    </div>
                                    <div className="login-input-password">
                                        <div className="login-input-icon">
                                            <img src={loginPasswordImg} alt="" />
                                        </div>
                                        <input type="password" placeholder='密码'
                                            onChange={e => {
                                                this.setState({ password: e.target.value });
                                            }}
                                            onFocus={_ => {
                                                this.setState({ msg: '' })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='login-msg'>{this.state.msg}</div>
                                <Button
                                    type="primary"
                                    style={{ width: '392px', height: '60px', fontSize: '16px' }}
                                    loading={this.state.isloading}
                                    onClick={this.loginBtnClick.bind(this)}
                                >
                                    <div style={{ fontSize: '20px' }}>登录</div>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handlePressEscape.bind(this));
    }
    handlePressEscape(e) {
        if(e.keyCode===13){
            this.loginBtnClick();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlePressEscape);
    }
    loginBtnClick() {
        const { username, password } = this.state;
        if (username && password) {
            const time = setTimeout(_ => { this.setState({ isloading: true }); }, 200);
            axios.post('/token/login', Post({ userName: username, password }), {
                headers: { 'Authorization': null }
            })
                .then(res => {
                    const code = res.data.code;
                    const msg = res.data.msg;
                    const data = res.data.data;
                    if (code === 0) {
                        user.isLogin = true;
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data;
                        window.localStorage.setItem('token', 'Bearer ' + data);
                        this.props.history.push('/home');
                    } else {
                        this.setState({ msg });
                    }
                    this.setState({ isloading: false }, _ => { clearTimeout(time) });
                }).catch(err => {
                    this.setState({ isloading: false }, _ => { clearTimeout(time) });
                });
        } else {
            this.setState({ msg: '用户名和密码不能为空' });
        }
    }
}

export default Login;