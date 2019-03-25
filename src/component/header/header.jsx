import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'antd';
import { Post } from 'common/js/util.js';
import user from 'store/user.js';
import logo from 'common/image/logo.png';
import avatar from 'common/image/favicon.png';
import jiantou from 'common/image/向下箭头.png';
import qiehuan from 'common/image/切换版本.png';
import './header.scss';

@withRouter
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowUserInfo: false,
            isShowChangePwsd: false,
            userInfo: {},
            msg: ''
        }
    }
    render() {
        const { islogin } = this.props;
        const { userInfo } = this.state;
        return (
            <div className='home-header'>
                <div className="home-header-content">
                    <div className="home-header-logo" onClick={_ => { this.props.history.push('/home') }}>
                        <img src={logo} style={{ width:'100%',height: '100%' }} alt="" />
                    </div>
                    <div className="home-header-operate">
                        {/* 云服务 */}
                        <div
                            className="home-header-nav"
                        >
                            <div className="home-header-nav-text"><span>云服务</span></div>
                            <div className="home-header-nav-panel">
                                <div className='yunfuwu'>
                                    <div className="yunfuwu-item1">
                                        <div className="yunfuwu-title"><span>监测</span></div>
                                        <div style={{ width: '176px', height: '1px', background: '#ECEAF3' }}></div>
                                        <div className="yunfuwu-content">
                                            <div>桥梁</div>
                                            <div>道路</div>
                                            <div>地铁</div>
                                            <div>隧道</div>
                                            <div>边坡</div>
                                        </div>
                                        <div className="yunfuwu-content">
                                            <div>高支架</div>
                                            <div>铁路</div>
                                            <div>水利</div>
                                        </div>
                                    </div>
                                    <div className="yunfuwu-item2">
                                        <div className="yunfuwu-title"><span>检测</span></div>
                                        <div style={{ width: '176px', height: '1px', background: '#ECEAF3' }}></div>
                                        <div className="yunfuwu-content">
                                            <div>幕墙</div>
                                            <div>岩土</div>
                                            <div>地基</div>
                                            <div>水利</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 云产品 */}
                        <div
                            className="home-header-nav"
                        >
                            <div className="home-header-nav-text"><span>云产品</span></div>
                            <div className="home-header-nav-panel">
                                <div className='yunfuwu'>
                                    <div className="yunfuwu-item1">
                                        <div className="yunfuwu-title"><span>计算</span></div>
                                        <div style={{ width: '176px', height: '1px', background: '#ECEAF3' }}></div>
                                        <div className="yunfuwu-content">
                                            <div>云服务器</div>
                                            <div>GPU服务器</div>
                                            <div>FPGA服务器</div>
                                            <div>专用宿主服务器</div>
                                            <div>黑石物理服务器</div>
                                        </div>
                                    </div>
                                    <div className="yunfuwu-item2">
                                        <div className="yunfuwu-title"><span>云数据库 TencentDB</span></div>
                                        <div style={{ width: '176px', height: '1px', background: '#ECEAF3' }}></div>
                                        <div className="yunfuwu-content">
                                            <div>关系型数据库</div>
                                            <div>云数据库Redis</div>
                                            <div>云数据库MongoDB</div>
                                            <div>分布式数据库</div>
                                            <div>数据库一体机TData</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 产品与支持 */}
                        <div
                            className="home-header-nav"
                        >
                            <div className="home-header-nav-text"><span>产品与支持</span></div>
                            <div className="home-header-nav-panel">
                                <div className='zhichi'>
                                    <div>帮助文档</div>
                                    <div>技术支持</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {islogin ?
                        <div className="home-header-login">已登陆</div>
                        :
                        <div className="home-header-login">
                            {/* 平台版本 */}
                            <div
                                className="home-header-nav"
                            >
                                <div className="home-header-nav-text">
                                    <div className="version">
                                        <div className="version-content">
                                            <div className="version-title">平台版本</div>
                                            <div className="version-icon"><img src={qiehuan} alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="home-header-nav-panel">
                                    <div className='zhichi' style={{ paddingRight: '20px', textAlign: 'right' }}>
                                        <div>可视化版本</div>
                                        <div>平台版本</div>
                                    </div>
                                </div>
                            </div>
                            {/* 用户 */}
                            <div
                                className="home-header-nav"
                            >
                                <div className="home-header-nav-text">
                                    <div className="home-user">
                                        <div className="home-user-content">
                                            <div className="user-avatar"><img src={avatar} alt="" /></div>
                                            <div className="user-info">
                                                <div className="user-name">{userInfo.realName}</div>
                                                <div className="user-type">超级管理员</div>
                                            </div>
                                            <div className="user-icon"><img src={jiantou} style={{ width: '8px', height: '8px' }} alt="" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="home-header-nav-panel">
                                    <div className="user-content">
                                        <div>欢迎登陆</div>
                                        <div className="user-content-item">
                                            <div onClick={_ => { this.setState({ isShowUserInfo: true }) }}>个人资料</div>
                                            <div onClick={_ => { this.setState({ isShowChangePwsd: true }) }}>修改密码</div>
                                        </div>
                                        <div onClick={this.loginOut.bind(this)}>安全退出</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Modal
                    key='userinfo'
                    title={<div className='user-info-title'>我的资料</div>}
                    visible={this.state.isShowUserInfo}
                    footer={null}
                    width='341px'
                    onCancel={_ => { this.setState({ isShowUserInfo: false }) }}
                >
                    <div className='user-info-item'>
                        <span>用户名: </span>
                        <span>{userInfo.userName}</span>
                    </div>
                    <div className='user-info-item'>
                        <span>姓名: </span>
                        <span>{userInfo.realName}</span>
                    </div>
                    <div className='user-info-item'>
                        <span>电话: </span>
                        <span>{userInfo.phone}</span>
                    </div>
                    <div className='user-info-item'>
                        <span>邮箱: </span>
                        <span>{userInfo.email}</span>
                    </div>
                    <div className='user-info-item'>
                        <span>公司: </span>
                        <span>{userInfo.company}</span>
                    </div>
                </Modal>
                <Modal
                    key='changepwd'
                    title={<div className='user-change-pwd'>修改密码</div>}
                    visible={this.state.isShowChangePwsd}
                    footer={null}
                    width='341px'
                    bodyStyle={{ paddingTop: '0px' }}
                    // onOk={this.handleOk}
                    onCancel={_ => { this.setState({ isShowChangePwsd: false }) }}
                >
                    <div className="user-change-pwd-item">
                        <input type="password" placeholder='请输入旧的密码' onChange={e => { this.setState({ oldPwd: e.target.value }) }} />
                    </div>
                    <div className="user-change-pwd-item">
                        <input type="password" placeholder='请输入新的密码' onChange={e => { this.setState({ newPwd: e.target.value }) }} />
                    </div>
                    <div className="user-change-pwd-item">
                        <input type="password" placeholder='确认新的密码' onChange={e => { this.setState({ confirmPwd: e.target.value }) }} />
                    </div>
                    <div className="user-change-pwd-msg">{this.state.msg}</div>
                    <div className="user-change-pwd-btn" onClick={this.changePwd.bind(this)}>确认修改</div>
                </Modal>
            </div>
        )
    }
    componentDidMount() {
        //刷新，赋token后执行
        setTimeout(() => {
            this.getUserInfo();
        }, 16);
    }
    getUserInfo() {
        axios.get('/user/queryUserInfo').then(res => {
            const code = res.data.code;
            const data = res.data.data;
            if (code === 0) {
                this.setState({ userInfo: data });
            }
        })
    }
    changePwd() {
        const { oldPwd, newPwd, confirmPwd } = this.state;
        this.setState({ msg: '' });
        if (!(oldPwd && newPwd && confirmPwd)) {
            this.setState({ msg: '密码不能为空!' });
            return null;
        };
        if (newPwd !== confirmPwd) {
            this.setState({ msg: '两次密码不一致!' });
            return null;
        };
        axios.post('/user/updatePassword', Post({ oldPassword: oldPwd, newPassword: newPwd })).then(res => {
            const code = res.data.code;
            if (code === 0) {
                this.loginOut();
            } else {
                this.setState({ msg: res.data.msg });
            }
        });
    }
    loginOut() {
        axios.delete('/token/logout').then(res => {
            user.islogin = false;
            window.localStorage.setItem('token', null);
            this.props.history.push('/publichome');
            window.location.href = window.location.href;
        })
    }
}

export default Header;