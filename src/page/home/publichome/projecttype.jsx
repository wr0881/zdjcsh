import React, { Component } from 'react';
import { Avatar, Card } from 'antd';
import TypeItem from './typeitem/typeitem';
import imgTitle from 'common/image/icon_主页_监测项目.png';

class ProjectType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    render() {
        const { loading, monitorStatus } = this.state;
        const JIANCE = [
            { "scId": 11, "typeName": "项目类型", "typeValue": "projectType", "typeCode": 3, "itemName": "地铁", "itemValue": "monitor/images/three/icon/subway.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 12, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "道路", "itemValue": "monitor/images/three/icon/road.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 13, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "隧道", "itemValue": "monitor/images/three/icon/tunnel.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 14, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "桥梁", "itemValue": "monitor/images/three/icon/bridge.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 35, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "环境", "itemValue": "monitor/images/three/icon/surroundings.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 38, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "边坡", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 39, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "高支模", "itemValue": "monitor/images/three/icon/highmodulus.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 41, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "水泥", "itemValue": "monitor/images/three/icon/cement.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 43, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "房建", "itemValue": "monitor/images/three/icon/hous.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 45, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "水利", "itemValue": "monitor/images/three/icon/water.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 46, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "尾矿库", "itemValue": "monitor/images/three/icon/tailingspond.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "scId": 47, "typeName": null, "typeValue": null, "typeCode": null, "itemName": "智慧农业", "itemValue": "monitor/images/three/icon/smartagriculture.png", "projectTotalCount": 0, "projectErrorCount": 0 }
        ];
        const JIANCE2 = [
            { "itemName": "中大实验室系统", "url": "http://zdlms.zdjcyun.com", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
        ];
        // const SHIYANSHI = [
        //     { "itemName": "中大实验室系统", "url": "http://zdlms.zdjcyun.com", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
        // ];
        const ERP = [
            { "itemName": "合同管理系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/bms/a/login", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "itemName": "业务流程系统", "url": "http://zhdbpm.zdjcyun-iot.com:8080/jsaas/", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "itemName": "费用报销系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/zd_exp/", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "itemName": "工时管理系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/pms/a/login", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            { "itemName": "基础人事系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/hrms/", "itemValue": "monitor/images/three/icon/slope.png", "projectTotalCount": 0, "projectErrorCount": 0 },
            
        ];
        return (
            <div className="projecttype">
                <div className="projecttype-title-wrapper">
                    <div className="projecttype-title">
                        <div className='projecttype-title-logo'>
                            <Avatar src={imgTitle} style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div className="projecttype-title-text">中大检测</div>
                    </div>
                    <div className="projecttype-title-operate">
                        <div
                            className={monitorStatus ? 'projecttype-title-operate-active' : ''}
                            onClick={_ => {
                                this.setState({ monitorStatus: 1 });
                            }}
                        >
                            全部
                        </div>
                    </div>
                </div>
                <div className="projecttype-content-wrapper" style={{display:'flex',padding:'0px 0px 0px 24px'}}>
                    <div style={{width:'50%'}}>
                        <div className="projecttype-content-title">
                            <div>监测</div>
                            {/* <div className='line'></div> */}
                        </div>
                        <Card
                            loading={loading}
                            bordered={false}
                            bodyStyle={{ width: '100%', padding: '0px' }}
                        >
                            <div className="projecttype-content4">
                                {JIANCE.map(v => {
                                    return <TypeItem key={Math.random()} data={v} />
                                })}
                            </div>
                        </Card>
                    </div>
                    <div style={{width:'25%'}}>
                        <div className="projecttype-content-title">
                            <div>检测</div>
                            {/* <div className='line'></div> */}
                        </div>
                        <Card
                            loading={loading}
                            bordered={false}
                            bodyStyle={{ width: '100%', padding: '0px' }}
                        >
                            <div className="projecttype-content4">
                                {JIANCE2.map(v => {
                                    return <TypeItem key={Math.random()} data={v} url={v.url} />
                                })}
                            </div>
                        </Card>
                    </div>
                    <div style={{width:'25%'}}>
                        <div className="projecttype-content-title">
                            <div>ERP系统</div>
                            {/* <div className='line'></div> */}
                        </div>
                        <Card
                            loading={loading}
                            bordered={false}
                            bodyStyle={{ width: '100%', padding: '0px' }}
                        >
                            <div className="projecttype-content4">
                                {ERP.map(v => {
                                    return <TypeItem key={Math.random()} data={v} url={v.url} alarm={false} />
                                })}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({ monitorStatus: 0 });
    }
}

export default ProjectType;