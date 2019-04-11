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
                    <RadioGroup
                        key={Math.random()}
                        onChange={e => { 
                            datacontrol.monitorTypeName = e.target.value;
                            console.log(e.target.value);
                            if (e!==[]) {
                                console.log('333333');
                                $(".dataControl-content").show();
                            }
                        }}
                        value={datacontrol.monitorTypeName}
                    >
                        {datacontrol.controlTypeData.slice(0,5) && datacontrol.controlTypeData.slice(0,5).map(v => {
                            return <Radio key={v.monitorType} value={v.monitorTypeName}>{v.monitorTypeName}</Radio>
                            
                        })}
                    </RadioGroup>                   
                </div>
                <div className="point-detail-content">                    
                    <div className="dataControl-content" style={{float:'left', width:'100%' }}>                        
                        <div className="dataAnalyse-chart-wrapper" style={{ width:'80%' }}>
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
                        <div className="point-detail-table-wrapper" style={{ width:'20%', height: '300px', float:'right' }}>
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
                         
            </div>
        );
    }

    componentWillUnmount() {
        datacontrol.monitorTypeName = null;
        datacontrol.selectPointName = null;
        datacontrol.monitorTypeName = [];
        monitorpage.contrastChartData = [];
    }
    componentWillMount() {
        datacontrol.pointdataType = 'totalChange';
    }
    componentDidMount() {
        this.initChart();
        datacontrol.getControlTypeData();
        autorun(() => {
            const contrastChartData = toJS(monitorpage.contrastChartData);
            if (contrastChartData.length !== 0) {
                this.initChart();
                this.setEchartData();
            }
        })

    }
    initChart() {
        const chart = echarts.init(this.refs.chart);
        const pointdataType = monitorpage.pointdataType;
        const monitorTypeName = monitorpage.monitorTypeName;

        const totalChange = getUnit(monitorTypeName).unitA;
        const singleChange = getUnit(monitorTypeName).unitB;
        const speedChange = getUnit(monitorTypeName).unitC;

        console.log(totalChange, singleChange, speedChange)

        const option = {
            color: ['#32D184', '#E4B669', '#1890FF', '#EA4C48', '#5D3AB3', '#7AAFD5',],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0.82)',
                textStyle: {
                    fontSize: 13
                },
                axisPointer: {
                    type: 'cross',
                    label: {
                        color: '#fff',
                        backgroundColor: '#5D3AB3'
                    }
                },
                formatter: function (params) {
                    let value = params[0].data[0];
                    for (let i = 0; i < params.length; i++) {
                        value += `<div>${params[i].seriesName}：${params[i].value[1]}(${eval(pointdataType)})</div>`
                    }
                    return value;
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    realtime: true,
                    height: 15,
                    start: 70,
                    end: 100
                },
                {
                    type: 'inside',
                }
            ],
            grid: {
                top: '50',
                bottom: '0',
                left: '30',
                right: '30',
                containLabel: true
            },
            legend: {
                data: []
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                },
                axisLabel: {
                    color: '#545454'
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#E9E9E9'
                    }
                },
                axisLabel: {
                    color: '#545454'
                },
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                }
            },
            series: []
        };
        chart.clear();
        chart.setOption(option);
        this.setState({ chart });
    }
    setEchartData() {
        let legend = [], dataAry = [];
        const { chart } = this.state;
        const contrastChartData = toJS(monitorpage.contrastChartData)
        contrastChartData.forEach(v => {
            legend.push(v.monitorPointNumber);
            dataAry.push({
                name: v.monitorPointNumber,
                type: 'line',
                smooth: true,
                symbol: "none",
                data: v[monitorpage.pointdataType]
            });
        });
        chart.setOption({
            legend: {
                data: legend
            },
            series: dataAry
        });
        setTimeout(() => {
            chart.resize();
        }, 100);
    }
}

export default DataControl;