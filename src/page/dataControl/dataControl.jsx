import React, { Component } from 'react';
//import { toJS } from 'mobx';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
//import echarts from 'echarts';
//import PointMap from './pointMap';
import monitorpage from 'store/monitorpage.js';
import './control.scss';
import { Checkbox, Radio } from 'antd';
import datacontrol from 'store/datacontrol.js';

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
        }
    }
    render() { 
        const monitorTypeName = toJS(datacontrol.monitorTypeName);
        // console.log(monitorTypeName) 
        const { pointDetailData } = monitorpage;
        console.log(monitorTypeName);
        // console.log('测点详细数据:',pointDetailData); 
        // const { monitorTypeData } = monitorpage.monitorTypeData;
        // console.log('监控数据:',monitorTypeData);
        // console.log('监控测点:',monitorpage.contrastChartData)
        return (
            <div className='dataMonitor-wrapper'>
                <div className="point-detail-operate" style={{ marginTop:'40px' }}>
                    <span style={{ padding:'0 20px',width:'130px' }}>选择指标</span>
                    <CheckboxGroup
                        key={Math.random()}
                        //defaultValue={monitorpage.monitorTypeName}
                        onClick={v => { monitorpage.monitorTypeName = v }}
                    >
                        {monitorpage.monitorTypeData.map(v => {
                            return <Checkbox key={v.monitorType} value={v.monitorType}>{v.monitorTypeName}</Checkbox>;
                        })}
                    </CheckboxGroup>
                </div>
                <div className="point-detail-content">
                    <div className="dataControl-content" style={{ display: toJS(monitorpage.monitorTypeName).checked ? 'none' : 'block' }}>
                        <div className="dataAnalyse-chart-wrapper" style={{ width:'80%' }}>
                            <div className="dataAnalyse-type-wrapper" style={{ margin:'10px 40px 10px' }}>
                                <div className="dataAnalyse-type-btnGrounp">
                                    <RadioGroup 
                                        key={Math.random()} 
                                        size='small'
                                        defaultValue={monitorpage.pointdataType}
                                        onChange={e => {
                                            monitorpage.pointdataType = e.target.value;
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
                            <div style={{ display: toJS(monitorpage.monitorTypeData).length ? 'block' : 'none' }}>
                                <div className='dataAnalyse-chart' ref='chart'></div>
                            </div>
                        </div>
                        <div className="point-detail-table-wrapper" style={{ width:'20%', height: '300px' }}>
                            <div className="point-detail-table3">
                                <div className="point-detail-table3-item">
                                    <span>实时值</span>
                                    <span>{monitorpage.contrastChartData || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>累计值</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>单次值</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>速率值</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>最大值</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>最小值</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>一级告警</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>二级告警</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                                <div className="point-detail-table3-item">
                                    <span>三级告警</span>
                                    <span>{pointDetailData.monitorPointNumber || '暂无数据1'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                               
                </div>
                         
            </div>
        );
    }
    componentDidMount() {
        monitorpage.getMonitorTypeData();

        autorun(() => {
            if (monitorpage.monitorTypeName) {
                monitorpage.getPointName();
            }
        })
    }
    componentWillUnmount() {
        monitorpage.monitorTypeName = null;
        monitorpage.selectPointName = null;
        monitorpage.pointNameData = [];
    }
}

export default DataControl;