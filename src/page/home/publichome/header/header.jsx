import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from 'common/image/logo.png';
import qiehuan from 'common/image/切换版本.png';
import andriod from 'common/image/andriod.png';
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
        return (
            <div className='home-header'>
                <div className="home-header-content">
                    <div className="home-header-logo" onClick={_ => { this.props.history.push('/home') }}>
                        <img src={logo} style={{ width: 'auto', height: '42px' }} alt="" />
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
                        {/* 下载 */}
                        <div
                            className="home-header-nav"
                        >
                            <div className="home-header-nav-text"><span><a style={{ color: '#121521' }} href="http://123.207.88.210/monitor/andriod_apk/zdjcyun.apk">安卓app</a></span></div>
                            <div className="home-header-nav-panel">
                                <div className='zhichi'>
                                    <img src={andriod} alt="" />
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
                                        <div onClick={_ => { this.props.history.push('/login') }}>登录</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Header;