import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { Radio } from 'antd';
import pageData from 'store/page.js';
import monitorpage from 'store/monitorpage.js';
import { getUnit } from 'common/js/util.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@observer
class DataContrastChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="dataAnalyse-chart-wrapper">
                <div className="dataAnalyse-type-wrapper">
                    <div className="dataAnalyse-type-name">{pageData.sector.sectorName}</div>
                    <div className="dataAnalyse-type-btnGrounp">
                        <RadioGroup key={Math.random()}
                            defaultValue={monitorpage.pointdataType}
                            onChange={e => {
                                monitorpage.pointdataType = e.target.value;
                            }}
                        >
                            <RadioButton value="speedChange">当前值</RadioButton>
                            <RadioButton value="singleChange" >单次变化量</RadioButton>
                        </RadioGroup>
                    </div>
                </div>

                <div style={{ display: toJS(monitorpage.contrastChartData).length ? 'block' : 'none' }}>
                    <div className='dataAnalyse-chart' ref='chart'></div>
                </div>
                <div style={{ display: toJS(monitorpage.contrastChartData).length ? 'none' : 'block', height: '400px' }}>
                    <span style={{ margin: '50px' }}>暂无数据信息，请选择测点!</span>
                </div>

                <div className="dataAnalyse-type-wrapper">
                    <div className="dataAnalyse-type-btnGrounp">
                        <RadioGroup key={Math.random()} defaultValue={monitorpage.timeType}
                            onChange={e => {
                                monitorpage.timeType = e.target.value;
                                monitorpage.getEchartData();
                            }}
                        >
                            <RadioButton value="全部" disabled>全部</RadioButton>
                            <RadioButton value="week">一周</RadioButton>
                            <RadioButton value="month">一月</RadioButton>
                            <RadioButton value="year" disabled>一年</RadioButton>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        );
    }
    componentWillMount() {
        monitorpage.pointdataType = 'singleChange';
    }
    componentDidMount() {
        this.initChart();

        autorun(() => {
            const contrastChartData = toJS(monitorpage.contrastChartData);
            if (contrastChartData.length !== 0) {
                this.initChart();
                this.setEchartData();
            }
        })
    }
    componentWillUnmount() {
        monitorpage.contrastChartData = [];
    }
    initChart() {
        const chart = echarts.init(this.refs.chart);
        const pointdataType = monitorpage.pointdataType;
        const monitorTypeName = monitorpage.monitorTypeName;

        const totalChange = getUnit(monitorTypeName).unitA;
        const singleChange = getUnit(monitorTypeName).unitB;
        const speedChange = getUnit(monitorTypeName).unitC;
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
                        value += `<div>${params[i].seriesName}：${params[i].value[1]}(${totalChange})</div>`
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

export default DataContrastChart;