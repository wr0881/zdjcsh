import React, { Component } from 'react';
//import { toJS } from 'mobx';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
//import PointMap from './pointMap';
import monitorpage from 'store/monitorpage.js';
import { getUnit } from 'common/js/util.js';
import './control.scss';
import { Checkbox, Radio } from 'antd';
import datacontrol from 'store/datacontrol.js';
import $ from  'jquery';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControlChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
        }
    }
    render() {        
        return (               
            <div className="point-detail-content">                    
                <div className="dataControl-content" style={{float:'left', width:'100%' }}>                        
                    <div className="dataAnalyse-chart-wrapper" style={{ width:'80%',height:'320px',border:'1px dashed #f00' }}>
                        <div className="dataAnalyse-type-wrapper" style={{ margin:'10px 40px 10px' }}>                           
                            <span style={{float:'left',width:'100px',height:'30px'}}>{datacontrol.monitorTypeName}</span>
                            <div className="dataAnalyse-type-btnGrounp">
                                <RadioGroup 
                                    key={Math.random()} 
                                    size='small'
                                    defaultValue={datacontrol.pointdataType}
                                    onChange={e => {
                                        datacontrol.pointdataType = e.target.value;
                                        this.setState(
                                            // { pointdataType: e.target.value },
                                            // this.setEchartData.bind(this, e.target.value)
                                        )
                                    }}
                                >
                                    <RadioButton value="totalChange1">累计变化量</RadioButton>
                                    <RadioButton value="singleChange1">单次变化量</RadioButton>
                                    <RadioButton value="speedChange1">变化速率</RadioButton>
                                </RadioGroup>
                            </div>
                        </div>
                        <div>
                            {datacontrol.control}
                            <div className='dataControl-chart' ref='chart'></div>
                        </div>
                    </div>
                    <div className="point-detail-table-wrapper" style={{ width:'20%', height: '320px', float:'right',border:'1px dashed #f00' }}>
                        <div className="point-detail-table3">
                            <div className="point-detail-table3-item">
                                <span>实时值</span>
                                <span>{datacontrol.mapType || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>累计值</span>
                                <span>{datacontrol.monitorTypeName || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>单次值</span>
                                <span>{datacontrol.singleValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>速率值</span>
                                <span>{datacontrol.speedValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>最大值</span>
                                <span>{datacontrol.maxValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>最小值</span>
                                <span>{datacontrol.minValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>一级告警</span>
                                <span>{datacontrol.oneMinValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>二级告警</span>
                                <span>{datacontrol.twoMinValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>三级告警</span>
                                <span>{datacontrol.threeMinValue || '暂无数据'}</span>
                            </div>
                        </div>
                    </div>
                </div>                           
            </div>
        );
    }
    // componentWillUnmount() {
    //     datacontrol.monitorTypeName = [];
    // }
    // componentDidMount() {
    //     datacontrol.getControlTypeData();
    // }
}
export default DataControlChart;