import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import gailan from 'common/image/侧边栏_概览.png';
import xiangmuguanli from 'common/image/侧边栏_项目管理.png';
import shipingjiankong from 'common/image/侧边栏_视频监控.png';
import bim from 'common/image/侧边栏_bim.png';
import gis from 'common/image/icon_主页_监测项目.png';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                <div className="nav-title">自动化智能监测</div>
                <NavLink
                    to='/project/overview'
                    activeClassName='nav-item-active'
                >
                    <div className="nav-item">
                        <div className="nav-item-icon"><img src={gailan} alt="" /></div>
                        <div className="nav-item-title">概览</div>
                    </div>
                </NavLink>
                <NavLink
                    to='/project/manage'
                    activeClassName='nav-item-active'
                >
                    <div className="nav-item">
                        <div className="nav-item-icon"><img src={xiangmuguanli} alt="" /></div>
                        <div className="nav-item-title">项目管理</div>
                    </div>
                </NavLink>
                <div className="nav-item">
                    <div className="nav-item-icon"><img src={shipingjiankong} alt="" /></div>
                    <div className="nav-item-title">视频监控</div>
                </div>
                <NavLink
                    to='/project/bim'
                    activeClassName='nav-item-active'
                >
                    <div className="nav-item">
                        <div className="nav-item-icon"><img src={bim} alt="" /></div>
                        <div className="nav-item-title">BIM</div>
                    </div>
                </NavLink>
                <NavLink
                    to='/project/gis'
                    activeClassName='nav-item-active'
                >
                    <div className="nav-item">
                        <div className="nav-item-icon"><img src={gis} alt="" /></div>
                        <div className="nav-item-title">GIS</div>
                    </div>
                </NavLink>
            </div>
        );
    }
}

export default Nav;