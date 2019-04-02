import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import BScroll from 'better-scroll';
import Card from 'component/Card/Card';
import BasicInformation from 'page/basicInformation/info';
import PeopleInformation from 'page/peopleInformation/info';
import DeviceInformation from 'page/deviceInformation/info';
import BluePrint from 'page/blueprint/blueprint';
import DataMonitor from 'page/dataMonitor_new/dataMonitorContainer';
import SourceRisk from 'page/risk/risk';
import AlarmDetail from 'page/alarmdetail/alarmdetail';
import Library from 'page/library/library';
import pagedata from 'store/page.js';
import manage from 'common/image/manage.png';
import './Detail.scss';
import DataControl from '../dataControl/dataControl';

const ProductComponent = _ => {
    const Status = require('component/Status/status').default;
    return (
        <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
            <Status text='正在开发中.....' />
        </div>
    );
}

const title = [
    {
        title: '基本信息',
        enTitle: 'BasicInformation',
        icon_url: require('common/image/基本信息.png'),
        icon_url_active: require('common/image/基本信息2.png'),
        component: BasicInformation,
    },
    {
        title: '人员信息',
        enTitle: 'PeopleInformation',
        icon_url: require('common/image/人员信息.png'),
        icon_url_active: require('common/image/人员信息2.png'),
        component: PeopleInformation,
    },
    {
        title: '设备信息',
        enTitle: 'DeviceInformation',
        icon_url: require('common/image/设备信息.png'),
        icon_url_active: require('common/image/设备信息2.png'),
        component: DeviceInformation,
    },
    {
        title: 'BIM',
        enTitle: 'Bim',
        icon_url: require('common/image/bim.png'),
        icon_url_active: require('common/image/bim2.png'),
        component: ProductComponent,
    },
    {
        title: '数据查询',
        enTitle: 'DataMonitor',
        icon_url: require('common/image/数据对比.png'),
        icon_url_active: require('common/image/数据对比2.png'),
        component: DataMonitor,
    },
    {
        title: '数据监控',
        enTitle: 'DataControl',
        icon_url: require('common/image/数据监控.png'),
        icon_url_active: require('common/image/数据监控2.png'),
        component: DataControl,
    },
    {
        title: '视频监控',
        enTitle: 'VideoMonitor',
        icon_url: require('common/image/视频监控.png'),
        icon_url_active: require('common/image/视频监控2.png'),
        component: ProductComponent,
    },
    {
        title: '危险源',
        enTitle: 'SourceRisk',
        icon_url: require('common/image/危险源.png'),
        icon_url_active: require('common/image/危险源2.png'),
        component: SourceRisk,
    },
    {
        title: '项目告警',
        enTitle: 'AlarmDetail',
        icon_url: require('common/image/项目告警.png'),
        icon_url_active: require('common/image/项目告警2.png'),
        component: AlarmDetail,
    },
    {
        title: '项目文库',
        enTitle: 'ProjectLib',
        icon_url: require('common/image/项目文库.png'),
        icon_url_active: require('common/image/项目文库2.png'),
        component: Library,
    },
    {
        title: '操作日志',
        enTitle: 'OperateLog',
        icon_url: require('common/image/操作日志.png'),
        icon_url_active: require('common/image/操作日志2.png'),
        component: ProductComponent,
    },
    {
        title: '图纸',
        enTitle: 'BluePrint',
        icon_url: require('common/image/项目图纸.png'),
        icon_url_active: require('common/image/项目图纸2.png'),
        component: BluePrint,
    },
];

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const curUrl = this.props.match.url;
        const activeUrl = this.props.location.pathname;
        return (
            <div className="detail">
                <Card
                    icon={<div style={{ width: '24px', height: '24px' }}><img src={manage} alt="" /></div>}
                    text={`${pagedata.sector.sectorName}`}
                >
                    <div className="detail-content-wrapper">
                        <div ref='scroll'>
                            <div className="detail-content-title">
                                {title.map(v => {
                                    return (
                                        <NavLink
                                            key={Math.random()}
                                            to={`${curUrl}/${v.enTitle}`}
                                            activeClassName='detail-content-title-item-active'
                                        >
                                            <div
                                                className='detail-content-title-item'
                                            >
                                                <div><img src={`${curUrl}/${v.enTitle}` === activeUrl ? `${v.icon_url_active}` : `${v.icon_url}`} alt='' /></div>
                                                <div>{v.title}</div>
                                            </div>
                                        </NavLink>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="detail-content">
                            <Switch>
                                {title.map(v => {
                                    return <Route key={Math.random()} exact path={`${curUrl}/${v.enTitle}`} component={v.component} />
                                })}
                                <Redirect to={`${curUrl}/DataMonitor`} />
                            </Switch>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
    componentDidMount() {
        this.initScroll();
    }
    initScroll() {
        const { scroll } = this.refs;
        new BScroll(scroll, {
            scrollX: true,
            click: true
        });
    }
}

export default Detail;