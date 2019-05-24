import React, { Component } from 'react';
import echarts from 'echarts';
import dataTool from 'echarts/extension/dataTool';
import { toJS, autorun } from 'mobx';
import { observer } from 'mobx-react';
import analyse from 'store/complexanalyse';
import { getShowTime } from 'common/js/util.js';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        chartid: Math.random(),
        charttype: 'line'
    }
    render() {
        return (
            <div ref={this.props.chartid}></div>
        );
    }
    componentDidMount() {
        // console.log(dataTool.prepareBoxplotData([[1, 2, 3, 4, 5, 6,6,78,1,99,]]))
        const { charttype } = this.props;
        if (charttype === 'boxplot') {
            autorun(_ => {
                if (analyse.chartData_boxplot) {
                    this.boxplot();
                }
            });
        } else {
            autorun(_ => {
                if (analyse.chartData) {
                    this.line();
                }
            });
        }
    }
    _handleData() {
        let chartData;
        const { charttype } = this.props;
        if (charttype === 'boxplot') {
            chartData = toJS(analyse.chartData_boxplot);
        } else {
            chartData = toJS(analyse.chartData);
            console.log(chartData);
        }
        let legend = [], data = [], time = [], boxData = [], boxScatterData = [];
        chartData.forEach((v, index) => {
            if (charttype === 'line') {
                data.push({
                    type: 'line',
                    smooth: false,
                    symbol: "none",
                    data: this._edgeHandle(v[analyse.pointdataType])
                });
            } else if (charttype === 'scatter') {
                data.push({
                    type: 'scatter',
                    data: this._edgeHandle(v[analyse.pointdataType])
                });
            } else if (charttype === 'boxplot') {
                let boxDataAry = v[analyse.pointdataType + 'BoxData'];
                let scatterDataAry = v[analyse.pointdataType + 'AbnormalPoint'];
                boxData.push([boxDataAry[3], boxDataAry[0], boxDataAry[1], boxDataAry[2], boxDataAry[4]]);
                [...new Set(scatterDataAry)].forEach(item => {
                    boxScatterData.push([v.date, item]);
                });
                time.push(v.date);
            }
        });
        return { legend, time, data, boxData, boxScatterData };
    }
    //边缘值剔除数据
    _edgeHandle(data) {
        let newData = [];
        let upperEdge = analyse.upperEdge;
        let lowerEdge = analyse.lowerEdge;
        if (upperEdge === null || lowerEdge === null) {
            return data;
        }
        data.forEach((v, i) => {
            if (v[1] > lowerEdge && v[1] < upperEdge) {
                newData.push(v);
            }
        })
        return newData;
    }
    //折线
    line() {
        const chart = echarts.init(this.refs[this.props.chartid]);
        const handleData = this._handleData();
        const option = {
            color: ['#AA68F9', '#FCCB7C', '#EE757C', '#A0C1FE', '#32D184', '#E4B669', '#1890FF', '#EA4C48', '#5D3AB3', '#7AAFD5',],
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
                {
                    show: false,
                    type: 'slider',
                    realtime: true,
                    height: 15,
                    // start: 70,
                    // end: 100
                },
                {
                    type: 'inside',
                }
            ],
            grid: {
                top: '20',
                bottom: '10',
                left: '10',
                right: '30',
                containLabel: true
            },
            legend: {
                data: handleData.legend
            },
            xAxis: {
                type: 'time',
                boundaryGap: true,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#6387AC',
                    formatter: function (value, index) {
                        var date = new Date(value);
                        return `${date.getMonth() + 1}月${date.getDate()}日`;
                    }
                },
                axisPointer: {
                    label: {
                        show: true,
                        formatter: function (params) {
                            return getShowTime(params.value);
                        }
                    }
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
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#6387AC'
                },
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                }
            },
            series: handleData.data
        };
        chart.clear();
        chart.setOption(option);
    }
    boxplot() {
        const chart = echarts.init(this.refs[this.props.chartid]);
        const handleData = this._handleData();
        const option = {
            color: ['#AA68F9', '#FCCB7C', '#EE757C', '#A0C1FE', '#32D184', '#E4B669', '#1890FF', '#EA4C48', '#5D3AB3', '#7AAFD5',],
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
                formatter: function (param) {
                    return [
                        param[0].axisValue,
                        '最小值: ' + param[0].data[1],
                        '最小四分位数: ' + param[0].data[2],
                        '中位数: ' + param[0].data[3],
                        '最大四分位数: ' + param[0].data[4],
                        '最大值: ' + param[0].data[5]
                    ].join('<br/>');
                }
            },
            dataZoom: [
                {
                    show: false,
                    type: 'slider',
                    realtime: true,
                    height: 15,
                    // start: 70,
                    // end: 100
                },
                {
                    type: 'inside',
                }
            ],
            grid: {
                top: '20',
                bottom: '10',
                left: '10',
                right: '30',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#6387AC',
                    formatter: function (value, index) {
                        var date = new Date(value);
                        return `${date.getMonth() + 1}月${date.getDate()}日`;
                    }
                },
                data: handleData.time
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
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#6387AC'
                },
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                }
            },
            series: [
                {
                    name: 'boxplot',
                    type: 'boxplot',
                    data: handleData.boxData
                },
                {
                    name: 'outlier',
                    type: 'scatter',
                    data: handleData.boxScatterData
                }
            ]
        };
        chart.clear();
        chart.setOption(option);
    }
}

export default Chart;

//厦门中平