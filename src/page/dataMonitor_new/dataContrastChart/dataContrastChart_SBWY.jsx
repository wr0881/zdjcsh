import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { Checkbox, Radio, DatePicker } from 'antd';
import pageData from 'store/page.js';
import monitorpage from 'store/monitorpage.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

@observer
class DataContrastChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selsectWay: 'X'
        }
    }
    render() {
        return (
            <div className="dataAnalyse-chart-wrapper">
                <div className="dataAnalyse-type-wrapper">
                    <div className="dataAnalyse-type-name">{pageData.sector.sectorName}</div>
                    <div className="dataAnalyse-type-btnGrounp">
                        <RadioGroup key={Math.random()}
                            defaultValue={this.state.selsectWay}
                            onChange={e => {
                                this.setState({ selsectWay: e.target.value })
                            }}
                        >
                            <RadioButton value="X" >x通道</RadioButton>
                            <RadioButton value="Y">y通道</RadioButton>
                        </RadioGroup>
                        <div style={{ display: 'inline-block', width: '50px' }} />
                        <RadioGroup key={Math.random()} defaultValue={monitorpage.pointdataType}
                            onChange={e => {
                                monitorpage.pointdataType = e.target.value;
                                this.setState(
                                    // { pointdataType: e.target.value },
                                    // this.setEchartData.bind(this, e.target.value)
                                )
                            }}
                        >
                            <RadioButton value="totalChange">累计变化量</RadioButton>
                            <RadioButton value="singleChange">单次变化量</RadioButton>
                            <RadioButton value="speedChange">变化速率</RadioButton>
                        </RadioGroup>
                    </div>
                </div>

                <div style={{ display: JSON.stringify(toJS(monitorpage.contrastChartData)) !== '{}' && JSON.stringify(toJS(monitorpage.contrastChartData)) !== '[]' ? 'block' : 'none' }}>
                    <div className='dataAnalyse-chart' ref='chart'></div>
                </div>
                <div style={{ display: JSON.stringify(toJS(monitorpage.contrastChartData)) === '{}' || JSON.stringify(toJS(monitorpage.contrastChartData)) === '[]' ? 'block' : 'none', height: '400px' }}>
                    <span style={{ margin: '50px' }}>暂无数据信息，请选择测点!</span>
                </div>

                <div className="dataAnalyse-type-wrapper">
                    {/* <div className="dataAnalyse-type-btnGrounp">
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
                    </div> */}
                    <RangePicker showTime format={'YYYY-MM-DD HH:mm:ss'}
                        onOk={v => {
                            monitorpage.timeTypeSBWY = v;
                            monitorpage.getEchartData();
                        }}
                    />
                </div>
            </div>
        );
    }
    componentWillMount() {
        monitorpage.pointdataType = 'totalChange';
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
                }
            },
            dataZoom: [
                // {
                //     type: 'slider',
                //     realtime: true,
                //     height: 15,
                //     start: 70,
                //     end: 100
                // },
                // {
                //     type: 'inside',
                // }
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
                type: 'category',
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
        const contrastChartData = toJS(monitorpage.contrastChartData);
        console.log(contrastChartData);
        // contrastChartData.forEach(v => {
        //     legend.push(v.monitorPointNumber);
        //     dataAry.push({
        //         name: v.monitorPointNumber,
        //         type: 'line',
        //         smooth: true,
        //         symbol: "none",
        //         data: v[monitorpage.pointdataType]
        //     });
        // });
        for (let item in contrastChartData) {
            legend.push(item);
            dataAry.push({
                name: item,
                type: 'line',
                smooth: true,
                symbol: "none",
                data: contrastChartData[item].map(v => [v.sensorDeep, v[monitorpage.pointdataType + this.state.selsectWay]])
                // data: item
            });
            console.log(dataAry)
        }
        // const test = [
        //     {
        //         data: [
        //             ['1m', Math.random()],
        //             ['2m', Math.random()],
        //             ['3m', Math.random()],
        //             ['4m', Math.random()],
        //             ['5m', Math.random()],
        //             ['6m', Math.random()],
        //         ],
        //         name: "ZCL07",
        //         smooth: true,
        //         symbol: "none",
        //         type: "line",
        //     },
        //     {
        //         data: [
        //             ['1m', Math.random()],
        //             ['2m', Math.random()],
        //             ['3m', Math.random()],
        //             ['4m', Math.random()],
        //             ['5m', Math.random()],
        //             ['6m', Math.random()],
        //         ],
        //         name: "ZCL08",
        //         smooth: true,
        //         symbol: "none",
        //         type: "line",
        //     }
        // ]
        chart.setOption({
            legend: {
                data: legend
                // data: ['ZCL07', 'ZCL08']
            },
            series: dataAry
            // series: test
        });
        setTimeout(() => {
            chart.resize();
        }, 100);
    }
}

export default DataContrastChart;