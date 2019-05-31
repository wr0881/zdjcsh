import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './monitor.scss';
import MonitorChart from './monitorchart';
import MonitorChartNBWY from './monitorchartNBWY';


@observer
class DataMonitorMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const monitorType = this.props.typeValue;
        //console.log(monitorType);
        return(
            <div className="datamonitor-box">
                <div className="datamonitor-content-wrapper">                    
                    <div className="datamonitor-content">                        
                        <div className="datamonitor-chart-wrapper">
                            <div className="datamonitor-type-wrapper">                           
                                <span className="datamonitor-type-title"> {this.props.value}                           
                                </span>
                                {/* <div className="datamonitor-type-ul" key={this.props.value} value={this.props.value} onClick={_ => {
                                    datamonitor.dataEnlargeVisible = true;
                                    datamonitor.monitorType = this.props.typeValue;
                                    datamonitor.monitorTypeName = this.props.value;
                                    datamonitor.pointName = '';
                                    datamonitor.getMonitorPointName();                                   
                                }}   
                                >
                                    <ul>
                                        <li><img className="enlarge" src={enlarge} alt="" /></li>
                                        <li><img className="enlarge2" src={enlarge2} alt="" /></li>
                                    </ul>                                   
                                </div> */}
                            </div>
                            <div className="datamonitor-chart-wrapper1">
                                {monitorType === 26 || monitorType === 66 ?
                                    <MonitorChartNBWY key={this.props.value} value={this.props.value} typeValue={this.props.typeValue} /> :
                                    <MonitorChart key={this.props.value} value={this.props.value} typeValue={this.props.typeValue} />
                                }                                
                            </div>
                            
                        </div>
                        
                        {/* <div className="datamonitor-table-wrapper">
                            <div className="datamonitor-table">
                                <div className="datamonitor-table-item">
                                    <span>实时值</span>
                                    <span>{datamonitor.realtimeValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>累计值</span>
                                    <span>{datamonitor.totalValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>单次值</span>
                                    <span>{datamonitor.singleValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>速率值</span>
                                    <span>{datamonitor.speedValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>最大值</span>
                                    <span>{this.props.value || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>最小值</span>
                                    <span>{datamonitor.minValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>一级告警</span>
                                    <span>{datamonitor.oneMinValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>二级告警</span>
                                    <span>{datamonitor.twoMinValue || '暂无数据'}</span>
                                </div>
                                <div className="datamonitor-table-item">
                                    <span>三级告警</span>
                                    <span>{datamonitor.threeMinValue || '暂无数据'}</span>
                                </div>
                            </div>
                        </div> */}
                    </div>                           
                </div>
                
                {/* <Modal
                    //title={datamonitor.monitorTypeData[index].monitorType}
                    //key={this.props.value}
                    visible={datamonitor.dataEnlargeVisible}
                    destroyOnClose={true}
                    keyboard={true}
                    footer={null}
                    width='1400px'
                    height='700px'
                    bodyStyle={{ padding: '0px' }}
                    onCancel={_ => { datamonitor.dataEnlargeVisible = false }}
                    //onOk={_ => {datamonitor.getMonitorPointName()}}
                >
                    <DataMonitorModal key={this.props.value} value={this.props.value} typeValue={this.props.typeValue} />
                </Modal> */}
            </div>
        );
    }
    componentDidMount() {
                                         
    }
    componentWillUnmount() {
    }
    // getMonitorPointName() {
    //     console.log("指标类型:",this.props.typeValue);
    //     axios.get('/point/queryMonitorPointName', {
    //         params: {
    //             sectorId: pageData.sector.sectorId,
    //             monitorType: this.props.typeValue
    //         }
    //     }).then(res => {
    //         const { code, data } = res.data;
    //         if (code === 0) {
    //             this.pointNameData = data;
    //             console.log(data);
    //             //第一项默认被选中
    //             if(data.length){
    //                 datamonitor.pointName = data[0];
    //             }
                            
    //         } else {
    //             this.pointNameData = [];
    //             //console.log('/point/queryMonitorPointName code: ', code, msg);
    //         }
    //     })
        
    // }
}

export default DataMonitorMap;