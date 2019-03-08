import React, { Component } from 'react';
import axios from 'axios';
import { message, Row, Col } from 'antd';
import { Map, Marker, NavigationControl, MapTypeControl, ScaleControl, OverviewMapControl } from 'react-bmap'
import pagedata from 'store/page.js';
import './info.scss';

class BasicInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicInformation: {}
        }
    }
    render() {
        const basicInformation = this.state.basicInformation;
        return (
            <div className='basicInformation'>
                <Row style={{ width: '100%', height: 'auto' }} type="flex" align="stretch">
                    <Col xxl={10} xl={24}>
                        <div className="basicInformation-wrapper">
                            <div className="basicInformation-title">参建单位信息</div>
                            <div className="basicInformation-dec">{
                                basicInformation.companyInfo ? Object.keys(basicInformation.companyInfo).map(v => {
                                    return <div key={Math.random()}>{v}:{basicInformation.companyInfo[v]}</div>;
                                })
                                    :
                                    '暂无信息...'
                            }</div>
                        </div>
                        <div className="basicInformation-wrapper">
                            <div className="basicInformation-title">项目概况</div>
                            <div className="basicInformation-dec">{
                                basicInformation.sectorDescription ? basicInformation.sectorDescription : '暂无信息...'
                            }</div>
                        </div>
                        <div className="basicInformation-wrapper">
                            <div className="basicInformation-title">监测地址</div>
                            <div className="basicInformation-dec">{
                                basicInformation.sectorAddress ? basicInformation.sectorAddress : '暂无信息...'
                            }</div>
                        </div>
                        <div className="basicInformation-wrapper">
                            <div className="basicInformation-title">项目时间点</div>
                            <div className="basicInformation-dec">{
                                basicInformation.sectorTime ? basicInformation.sectorTime : '暂无信息...'
                            }</div>
                        </div>
                        <div className="basicInformation-wrapper">
                            <div className="basicInformation-title">监测依据</div>
                            <div className="basicInformation-dec">{
                                basicInformation.monitorBasis ?
                                    basicInformation.monitorBasis.map(v => {
                                        return <span key={Math.random()}>{v} , </span>
                                    })
                                    :
                                    '暂无信息...'
                            }</div>
                        </div>
                        <div className="basicInformation-wrapper">
                            <div className="basicInformation-title">监测指标</div>
                            <div className="basicInformation-dec">{
                                basicInformation.monitorTypeName ?
                                    basicInformation.monitorTypeName.map(v => {
                                        return <span key={Math.random()}>{v} , </span>
                                    })
                                    :
                                    '暂无信息...'
                            }</div>
                        </div>
                    </Col>
                    <Col xxl={14} xl={24}>
                        <div className='basicInformation-mapwrapper'>
                            <div className="basicInformation-mapwrapper-map">
                                <Map
                                    ref='basicInformationMap'
                                    style={{ height: '100%' }}
                                    center={{ lng: basicInformation.sectorLongitude, lat: basicInformation.sectorLatitude }}
                                    zoom="17"
                                >
                                    <Marker position={{ lng: basicInformation.sectorLongitude, lat: basicInformation.sectorLatitude }} />
                                    <NavigationControl />
                                    <MapTypeControl />
                                    <ScaleControl />
                                    <OverviewMapControl />
                                </Map>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
    componentDidMount() {
        const {basicInformationMap} = this.refs;
        basicInformationMap.map.enableScrollWheelZoom(true);

        this.getBasicInformation();
    }
    getBasicInformation() {
        axios.get('/project/querySector', {
            params: {
                sectorId: pagedata.sector.sectorId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.setState({ basicInformation: data });
            } else {
                message.error(msg);
                console.log('/project/querySector: ', code, msg);
            }
        })
    }
}

export default BasicInformation;