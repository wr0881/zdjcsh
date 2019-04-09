import React, { Component } from 'react';
//import { toJS } from 'mobx';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
//import echarts from 'echarts';
//import PointMap from './pointMap';
//import monitorpage from 'store/monitorpage.js';
import './control.scss';
import { Checkbox, Radio } from 'antd';
import datacontrol from 'store/datacontrol.js';
import $ from  'jquery';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
            checked: false
        }
    }
    render() { 
        // const monitorTypeName = datacontrol.controlTypeData.monitorTypeName; 
        // console.log(monitorTypeName);       
        return (
            <div className='dataControl-wrapper'>
                <div className="control-operate">
                    <span style={{ padding:'0 20px',width:'130px' }}>选择指标</span>
                    <CheckboxGroup
                        key={Math.random()}
                        //defaultValue={datacontrol.monitorTypeName[0]}
                        onChange={v => { 
                            datacontrol.monitorTypeName=v;
                            console.log(v);
                            if (v!==[]) {
                                console.log('333333');
                                $(".dataControl-content").show();
                            }
                        }}
                    >
                        {datacontrol.controlTypeData && datacontrol.controlTypeData.map(v => {
                            return <Checkbox className='monitorType' key={v.monitorType} value={v.monitorType} checked={this.state.checked}>{v.monitorTypeName}</Checkbox>;
                        })}
                    </CheckboxGroup>
                </div>
                <div className="point-detail-content">
                    <div className="dataControl-content" style={{ width:'100%' }}>
                        <div className="dataAnalyse-chart-wrapper" style={{ width:'80%' }}>
                            <div className="dataAnalyse-type-wrapper" style={{ margin:'10px 40px 10px' }}>
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
                                <div className='dataControl-chart' ref='chart'></div>
                            </div>
                        </div>
                        <div className="point-detail-table-wrapper" style={{ width:'20%', height: '300px', float:'right' }}>
                            <div className="point-detail-table3">
                                <div className="point-detail-table3-item">
                                    <span>实时值</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>累计值</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>单次值</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>速率值</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>最大值</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>最小值</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>一级告警</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>二级告警</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>三级告警</span>
                                    <span>{'暂无数据1'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                               
                </div>
                         
            </div>
        );
    }
    componentDidMount() {
        datacontrol.getControlTypeData();
    }
    componentWillUnmount() {
        datacontrol.monitorTypeName = null;
        datacontrol.selectPointName = null;
        datacontrol.monitorTypeName = [];
    }
}

export default DataControl;