import React, { Component } from 'react';
//import { toJS } from 'mobx';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
//import PointMap from './pointMap';
import monitorpage from 'store/monitorpage.js';
import './monitor.scss';
import { Checkbox, Radio } from 'antd';
import { getUnit } from 'common/js/util.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        const monitorTypeName = monitorpage.monitorTypeName;
        console.log('获取的指标类型:',monitorTypeName);   
        const { pointDetailData } = monitorpage;
        console.log('测点详细数据:',pointDetailData); 
        const { monitorTypeData } = monitorpage.monitorTypeData;
        console.log('监控数据:',monitorTypeData);
        return (
            <div className='dataMonitor-wrapper'>
                <div className="point-detail-operate" style={{ marginTop:'40px' }}>
                    <span style={{ padding:'0 20px' }}>选择指标</span>
                    <CheckboxGroup
                        key={Math.random()}
                        //defaultValue={monitorpage.selectPointName}
                        //onChange={e => { monitorpage.monitorTypeData.monitorTypeName = e.target.checked }}
                    >
                        {monitorpage.monitorTypeData.map(v => {
                            return <Checkbox key={v.monitorTypeName} value={v.monitorTypeName} defaultChecked={false}>{v.monitorTypeName}</Checkbox>;
                        })}
                    </CheckboxGroup>
                </div>
                <div className="point-detail-content">
                    <div className="dataAnalyse-chart-wrapper" style={{ display: toJS(monitorpage.monitorTypeData).length ? 'none' : 'block', width:'80%' }}>
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
                        <div style={{ display: toJS(monitorpage.monitorTypeData).length ? 'none' : 'block', height: '300px' }}>
                            <span style={{ margin: '50px' }}>暂无数据信息，请选择指标！!</span>
                        </div>
                    </div>
                    <div className="point-detail-table-wrapper" style={{ display: toJS(monitorpage.monitorTypeData).length ? 'none' : 'block', width:'20%', height: '300px' }}>
                        <div className="point-detail-table3">
                            <div className="point-detail-table3-item">
                                <span>实时值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>累计值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>单次值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>速率值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>最大值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>最小值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>一级告警</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>二级告警</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>三级告警</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dataAnalyse-chart-wrapper" style={{ display: toJS() ? 'none' : 'block', width:'80%' }}>
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
                                    <RadioButton value="totalChange2">累计变化量</RadioButton>
                                    <RadioButton value="singleChange2">单次变化量</RadioButton>
                                    <RadioButton value="speedChange2">变化速率</RadioButton>
                                </RadioGroup>
                            </div>
                        </div>

                        <div style={{ display: toJS(monitorpage.contrastChartData).length ? 'block' : 'none' }}>
                            <div className='dataAnalyse-chart' ref='chart'></div>
                        </div>
                        <div style={{ display: toJS(monitorpage.contrastChartData).length ? 'none' : 'block', height: '300px' }}>
                            <span style={{ margin: '50px' }}>暂无数据信息，请选择指标！!</span>
                        </div>
                    </div>   
                    <div className="point-detail-table-wrapper" style={{width:'20%'}}>
                        <div className="point-detail-table3">
                            <div className="point-detail-table3-item">
                                <span>实时值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>累计值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>单次值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>速率值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>最大值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>最小值</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>一级告警</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>二级告警</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>三级告警</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
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
            const contrastChartData = toJS(monitorpage.contrastChartData);
            if (contrastChartData.length !== 0) {
                this.initChart();
                this.setEchartData();
            }
        })
    }
    componentWillUnmount() {
        monitorpage.monitorTypeName = null;
        monitorpage.selectPointName = null;
        monitorpage.pointNameData = [];
    }
    componentWillMount() {
        monitorpage.pointdataType = 'totalChange1';
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
        console.log(contrastChartData);
        console.log(monitorpage.pointdataType);
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
        console.log('对比数据:',dataAry);
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