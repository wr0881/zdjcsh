import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from 'component/Card/Card';
import Chart from './chart';
import Status from 'component/Status/status';
import manage from 'common/image/manage.png';
import pageStore from 'store/page'
import iconRinghtImg from 'common/image/向右箭头2.png';
import './overview.scss';

@withRouter
class overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceData: {},
            projectAlarmData: [],
            projectWillData: [],
            projectListData: []
        }
    }
    render() {
        const { resourceData, projectAlarmData, projectWillData, projectListData } = this.state;
        return (
            <div className="overview">
                <div className="overview-dec">
                    <Card
                        icon={<div style={{ width: '24px', height: '24px' }}><img src={manage} alt="" /></div>}
                        text='资源概览'
                    >
                        <div className='resource-overview-wrapper'>
                            <div className="resource-overview-item" style={{ borderColor: '#32D184' }}>
                                <div className="resource-overview-item-num">{resourceData.projectIngCount}</div>
                                <div className="resource-overview-item-type">监测中</div>
                            </div>
                            <div className="resource-overview-item" style={{ borderColor: '#F0514D' }}>
                                <div className="resource-overview-item-num">{resourceData.projectErrorCount}</div>
                                <div className="resource-overview-item-type">异常项目</div>
                            </div>
                            <div className="resource-overview-item" style={{ borderColor: '#8562DD' }}>
                                <div className="resource-overview-item-num">{resourceData.projectEndCount}</div>
                                <div className="resource-overview-item-type">已完毕</div>
                            </div>
                            <div className="resource-overview-item" style={{ borderColor: '#F6BD5C' }}>
                                <div className="resource-overview-item-num">{resourceData.projectWillEndCount}</div>
                                <div className="resource-overview-item-type">即将完毕</div>
                            </div>
                            <div className="resource-overview-item" style={{ borderColor: '#32D184' }}>
                                <div className="resource-overview-item-num">{resourceData.projectTotalCount}</div>
                                <div className="resource-overview-item-type">共有项目</div>
                            </div>
                        </div>
                    </Card>
                    <Card
                        icon={<div style={{ width: '24px', height: '24px' }}><img src={manage} alt="" /></div>}
                        text='项目告警'
                    >
                        <div className="overview-alarm-wrapper">
                            {projectAlarmData.length ?
                                projectAlarmData.map(v => {
                                    return (
                                        <div className="overview-alarm-item" key={Math.random()}>
                                            {`${v.projectName}${v.sectorName}${v.alarmContext}`}
                                        </div>
                                    )
                                })
                                :
                                <Status text='暂无项目告警' />
                            }
                        </div>
                    </Card>
                    <Card
                        icon={<div style={{ width: '24px', height: '24px' }}><img src={manage} alt="" /></div>}
                        text='即将完毕项目'
                    >
                        <div className="overview-coming-wrapper">
                            {projectWillData.length ?
                                projectWillData.map(v => {
                                    return (
                                        <div className="overview-coming-item" key={Math.random()}>
                                            {`${v.projectName}${v.sectorName}`}
                                        </div>
                                    )
                                })
                                :
                                <Status text='暂无即将完毕项目' />
                            }
                        </div>
                    </Card>
                </div>
                <div className="overview-project">
                    <Card
                        icon={<div style={{ width: '24px', height: '24px' }}><img src={manage} alt="" /></div>}
                        text='项目监测概览'
                    >
                        <div className='overview-project-content'>
                            {projectListData.map(v => {
                                return (
                                    <Card
                                        key={Math.random()}
                                        icon={<div style={{ width: '8px', height: '8px', backgroundColor: '#32D184', borderRadius: '50%' }}></div>}
                                        operate={
                                            <div className="overview-project-item-operate" onClick={_ => {
                                                this.props.history.push({ pathname: '/project/manage', query: { projectId: v.projectId } });
                                            }}>
                                                <div className="">查看详情</div>
                                                <div style={{ marginTop: '7px', marginLeft: '7px' }}><img src={iconRinghtImg} alt="" /></div>
                                            </div>
                                        }
                                        text={v.projectName}
                                        className='overview-project-item'
                                    >
                                        <div className="overview-item-content">
                                            <div className="overview-item-title">项目描述</div>
                                            <div className="overview-item-dec">{v.projectDescription}</div>
                                            <div className="overview-item-chart-wrapper">
                                                <div className="overview-item-chart-dec">
                                                    <div>{v.alarmCount}</div>
                                                    <div>总预警(次)</div>
                                                </div>
                                                <div className="overview-item-chart">
                                                    <Chart data={v.list} />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getResourceData();
        this.getProjectAlarm();
        this.getProjectWill();
        this.getProjectList();
    }
    getResourceData() {
        axios.get('/project/queryProjectStatusCount', {
            params: {
                scId: pageStore.projectType.projectTypeId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.setState({ resourceData: data });
            } else {
                this.setState({ resourceData: {} });
                console.log('/project/queryProjectStatusCount code: ', code, msg);
            }
        })
    }
    getProjectAlarm() {
        axios.get('/alarm/queryAlarmProject', {
            params: {
                scId: pageStore.projectType.projectTypeId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.setState({ projectAlarmData: data });
            } else {
                this.setState({ projectAlarmData: [] });
                console.log('/alarm/queryAlarmProject code: ', code, msg);
            }
        })
    }
    getProjectWill() {
        axios.get('/project/queryWillProject', {
            params: {
                scId: pageStore.projectType.projectTypeId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.setState({ projectWillData: data });
            } else {
                this.setState({ projectWillData: [] });
                console.log('/project/queryWillProject code: ', code, msg);
            }
        })
    }
    getProjectList() {
        axios.get('/project/queryMonitorView', {
            params: {
                scId: pageStore.projectType.projectTypeId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.setState({ projectListData: data });
            } else {
                this.setState({ projectListData: [] });
                console.log('/project/queryMonitorView code: ', code, msg);
            }
        })
    }
}

export default overview;