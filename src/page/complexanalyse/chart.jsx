import React, { Component } from 'react';
import echarts from 'echarts';
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
            <div ref={this.props.chartid} style={{border:'0.5px dashed green'}}></div>
        );
    }
    componentDidMount() {
        autorun(_ => {
            if (analyse.chartData) {
                this.line();
            }
        });
    }
    _handleData() {
        const chartData = toJS(analyse.chartData);
        const { charttype } = this.props;
        let legend = [], data = [];
        chartData.forEach(v => {
            legend.push(v.monitorPointNumber);
            if (charttype === 'line') {
                data.push({
                    name: v.monitorPointNumber,
                    type: 'line',
                    smooth: true,
                    symbol: "none",
                    data: v[analyse.pointdataType]
                });
            } else if (charttype === 'scatter') {
                data.push({
                    name: v.monitorPointNumber,
                    type: 'scatter',
                    data: v[analyse.pointdataType]
                });
            }
        });
        return { legend, data };
    }
    //折线
    line() {
        const chart = echarts.init(this.refs[this.props.chartid]);
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
            // dataZoom: [
            //     {
            //         type: 'slider',
            //         realtime: true,
            //         height: 15,
            //         // start: 70,
            //         // end: 100
            //     },
            //     {
            //         type: 'inside',
            //     }
            // ],
            grid: {
                top: '30',
                bottom: '0',
                left: '0',
                right: '10',
                containLabel: true
            },
            legend: {
                data: this._handleData().legend
            },
            xAxis: {
                type: 'time',
                boundaryGap: false,
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
            series: this._handleData().data
        };
        chart.clear();
        chart.setOption(option);
    }
}

export default Chart;