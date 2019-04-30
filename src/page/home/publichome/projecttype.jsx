import React, { Component } from 'react';
import { Avatar } from 'antd';
import imgTitle from 'common/image/icon_主页_监测项目.png';

import TypeBox from './typebox/typebox';

class allProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    render() {
        const JIANCE = [
            { "itemName": "地铁", "url": "/login", },
            { "itemName": "道路", "url": "/login", },
            { "itemName": "隧道", "url": "/login", },
            { "itemName": "桥梁", "url": "/login", },
            { "itemName": "环境", "url": "/login", },
            { "itemName": "边坡", "url": "/login", },
            { "itemName": "高支模", "url": "/login", },
            { "itemName": "房建", "url": "/login", },
            { "itemName": "水利", "url": "/login", },
            { "itemName": "尾矿库", "url": "/login", },
            { "itemName": "智慧农业", "url": "/login", }
        ];
        const JIANCE2 = [
            { "itemName": "中大实验室系统", "url": "http://zdlms.zdjcyun.com", },
        ];
        const ERP = [
            { "itemName": "合同管理系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/bms/a/login", },
            { "itemName": "业务流程系统", "url": "http://zhdbpm.zdjcyun-iot.com:8080/jsaas/", },
            { "itemName": "费用报销系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/zd_exp/", },
            { "itemName": "工时管理系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/pms/a/login", },
            { "itemName": "基础人事系统", "url": "http://zhdtepp.zdjcyun-iot.com:9090/hrms/", },

        ];
        return (
            <div className="allProject">
                <div className="allProject-title-wrapper">
                    <div className="allProject-title">
                        <div className='allProject-title-logo'>
                            <Avatar src={imgTitle} style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div className="allProject-title-text">中大检测</div>
                    </div>
                    <div className="allProject-title-operate">
                        <div
                        // className='allProject-title-operate-active'
                        >
                            全部
                        </div>
                    </div>
                </div>
                <div className="allProject-content-wrapper">
                    <div style={{ float: 'left', width: '580px', overflow: 'hidden' }}>
                        <div className="allProject-content-title">
                            <div>监测</div>
                        </div>
                        <div className='allProject-item-wrapper'>
                            {JIANCE.map(v => {
                                return <TypeBox
                                    key={Math.random()}
                                    data={v}
                                />
                            })}
                        </div>
                    </div>
                    <div style={{ float: 'left', width: '580px', overflow: 'hidden' }}>
                        <div className="allProject-content-title">
                            <div>ERP系统</div>
                        </div>
                        <div className='allProject-item-wrapper'>
                            {ERP.map((v, i) => {
                                return <TypeBox
                                    key={Math.random()}
                                    data={v}
                                    style={{
                                        width: i === 0 || i === 1 ? '275px' : '180px',
                                        height: '157px'
                                    }} />
                            })}
                        </div>

                        <div className="allProject-content-title">
                            <div>检测</div>
                        </div>
                        <div className='allProject-item-wrapper'>
                            {JIANCE2.map((v, i) => {
                                return <TypeBox
                                    key={Math.random()}
                                    data={v}
                                    style={{
                                        width: i === 0 || i === 1 ? '275px' : '180px',
                                        height: '157px'
                                    }} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({ monitorStatus: 0 });
    }
}

export default allProject;