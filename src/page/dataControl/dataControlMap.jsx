import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import echarts from 'echarts';
import { autorun,toJS } from 'mobx';
import './control.scss';
import datacontrol from 'store/datacontrol.js';
import enlarge from 'common/image/enlarge.png';
import enlarge2 from 'common/image/enlarge2.png';
import DataControlChart from './dataControlChart';
import ControlChart from './ControlChart';
import ControlChartNBWY from './ControlChartNBWY';

@observer
class DataControlMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const monitorType = this.props.typeValue;
        //console.log(monitorType);
        return(
            <div className="datacontrol-box">
                <div className="datacontrol-content-wrapper">                    
                    <div className="datacontrol-content">                        
                        <div className="datacontrol-chart-wrapper">
                            <div className="datacontrol-type-wrapper">                           
                                <span className="datacontrol-type-title"> {this.props.value}                           
                                </span>
                                <div className="datacontrol-type-ul" value={this.props.value} onClick={e => {
                                    datacontrol.dataEnlargeVisible = true;
                                    datacontrol.monitorType = this.props.typeValue;
                                    datacontrol.monitorTypeName = this.props.value;
                                    datacontrol.getControlPointName();
                                }}   
                                >
                                    <ul>
                                        <li><img className="enlarge" src={enlarge} alt="" /></li>
                                        <li><img className="enlarge2" src={enlarge2} alt="" /></li>
                                    </ul>                                   
                                </div>
                            </div>
                            <div className="datacontrol-chart-wrapper1" style={{
                                height:'300px',
                                marginLeft:'22px'
                            }}>
                                {monitorType === 26 || monitorType === 66 ?
                                    <ControlChartNBWY value={this.props.value} typeValue={this.props.typeValue} /> :
                                    <ControlChart value={this.props.value} typeValue={this.props.typeValue} />
                                }                                
                                {/* <ControlChart value={this.props.value} typeValue={this.props.typeValue} />                                */}
                            </div>
                        </div>
                        <div className="datacontrol-table-wrapper">
                            <div className="datacontrol-table">
                                <div className="datacontrol-table-item">
                                    <span>实时值</span>
                                    <span>{datacontrol.realtimeValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>累计值</span>
                                    <span>{this.props.value || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>单次值</span>
                                    <span>{this.props.typeValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>速率值</span>
                                    <span>{datacontrol.maxValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>最大值</span>
                                    <span>{datacontrol.maxValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>最小值</span>
                                    <span>{datacontrol.minValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>一级告警</span>
                                    <span>{datacontrol.oneMinValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>二级告警</span>
                                    <span>{datacontrol.twoMinValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>三级告警</span>
                                    <span>{datacontrol.threeMinValue || '暂无数据'}</span>
                                </div>
                            </div>
                        </div>
                    </div>                           
                </div>
                <div className="datacontrol-enlarge-content" style={{width:'100%',height:'400px',border:'1px dashed #f00',position:'absolute',marginTop:'-364px',display:'none'}}></div>
                <Modal
                    //title={datacontrol.controlTypeData[index].monitorType}
                    visible={datacontrol.dataEnlargeVisible}
                    destroyOnClose={true}
                    keyboard={true}
                    footer={null}
                    width='1400px'
                    height='700px'
                    bodyStyle={{ padding: '0px' }}
                    onCancel={_ => { datacontrol.dataEnlargeVisible = false }}
                >
                    <DataControlChart value={this.props.value} typeValue={this.props.typeValue} />
                </Modal>
            </div>
        );
    }
    componentDidMount() {                               
        //this.mywebsocket();
        //datacontrol.establishConnection();      
    }
    componentWillUnmount() {
    }
    
}

export default DataControlMap;