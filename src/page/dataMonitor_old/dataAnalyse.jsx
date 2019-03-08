import React, { Component } from 'react';
import axios from 'axios';
import echarts from 'echarts';
import { Checkbox, Radio } from 'antd';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';
import './dataAnalyse.scss';

const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class DataAnalyse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
            echartData: [],
            selectPointTypeValue: '',
            selectPointValue: [],
            pointdataType: 'totalChange',
            timeType: 'week',
        }
    }
    render() {
        const { selectPointValue, timeType, pointdataType, echartData } = this.state;
        return (
            <div className="dataAnalyse-wrapper">
                <div className="dataAnalyse-chart-wrapper">
                    <div className="dataAnalyse-type-wrapper">
                        <div className="dataAnalyse-type-name">{pageData.sector.sectorName}</div>
                        <div className="dataAnalyse-type-btnGrounp">
                            <RadioGroup key={Math.random()} defaultValue={pointdataType}
                                onChange={e => { this.setState({ pointdataType: e.target.value }, this.setEchartData.bind(this, e.target.value)) }}
                            >
                                <RadioButton value="totalChange">累计变化量</RadioButton>
                                <RadioButton value="singleChange">单次变化量</RadioButton>
                                <RadioButton value="speedChange">变化速率</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>
                    <div style={{ display: echartData.length ? 'block' : 'none' }}>
                        <div className='dataAnalyse-chart' ref='chart'></div>
                    </div>
                    <div style={{ display: echartData.length ? 'none' : 'block', height: '400px' }}>
                        <span style={{ margin: '50px' }}>暂无数据信息，请选择测点!</span>
                    </div>
                    <div className="dataAnalyse-type-wrapper">
                        <div className="dataAnalyse-type-btnGrounp">
                            <RadioGroup key={Math.random()} defaultValue={timeType}
                                onChange={e => { this.setState({ timeType: e.target.value }, this.getEchartData.bind(this)) }}
                            >
                                <RadioButton value="全部" disabled>全部</RadioButton>
                                <RadioButton value="week">一周</RadioButton>
                                <RadioButton value="month">一月</RadioButton>
                                <RadioButton value="year" disabled>一年</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
                <div className="dataAnalyse-operate-wrapper">
                    <div className="dataAnalyse-operate-title">选择指标:</div>
                    <div className="dataAnalyse-operate-content">
                        <RadioGroup
                            key={Math.random()}
                            onChange={e => { this.setState({ selectPointTypeValue: e.target.value }) }}
                            value={this.state.selectPointTypeValue}
                        >
                            {this.state.pointTypeData.map(v => {
                                return <Radio key={v.monitorType} value={v.monitorType}>{v.monitorTypeName}</Radio>;
                            })}
                        </RadioGroup>
                    </div>
                    <div className="dataAnalyse-operate-title">选择测点:</div>
                    <div className="dataAnalyse-operate-select">
                        <CheckboxGroup
                            key={Math.random()}
                            defaultValue={selectPointValue}
                            onChange={v => { this.setState({ selectPointValue: v }) }}
                        >
                            {this.state.pointNameData.map(v => {
                                return <Checkbox key={v} value={v}>{v}</Checkbox>;
                            })}
                        </CheckboxGroup>
                    </div>
                    <div className="dataAnalyse-operate-btn">
                        <span className="dataAnalyse-operate-btn1">重置</span>
                        <span className="dataAnalyse-operate-btn2"
                            onClick={this.getEchartData.bind(this)}
                        >对比</span>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getPointType();
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.selectPointTypeValue !== this.state.selectPointTypeValue) {
            this.getPointName(nextState.selectPointTypeValue);
        };
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
        window.addEventListener('resize', _ => {
            chart.resize();
        });
    }
    getPointType() {
        axios.get('/common/queryMonitorTypeName', {
            params: {
                sectorId: pageData.sector.sectorId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.setState({ pointTypeData: data });
            } else {
                // this.setState({ pointTypeData: [] });
                console.log('/common/queryMonitorTypeName code: ', code, msg);
            }
        })
    }
    getPointName(value) {
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: value
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                console.log(data);
                this.setState({ pointNameData: data });
            } else {
                // this.setState({ pointNameData: [] });
                console.log('/point/queryMonitorPointName code: ', code, msg);
            }
        })
    }
    getEchartData() {
        const { selectPointTypeValue, selectPointValue, pointdataType, timeType } = this.state;
        this.initChart();
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: selectPointTypeValue,
                pointNames: JSON.stringify(selectPointValue),
                beginTime: getTime(timeType)[0],
                endTime: getTime(timeType)[1],
                dateType: 1
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                console.log(data);
                this.setState({ echartData: data.comparisonVO }, this.setEchartData.bind(this, pointdataType));
            } else {
                this.setState({ echartData: [] });
                console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
    }
    setEchartData(dataType) {
        const { chart, echartData, selectPointTypeValue, selectPointValue } = this.state;
        let legend = [], dataAry = [];
        if (selectPointTypeValue && selectPointValue.length) {
            echartData.forEach(v => {
                legend.push(v.monitorPointNumber);
                dataAry.push({
                    name: v.monitorPointNumber,
                    type: 'line',
                    smooth: true,
                    symbol: "none",
                    data: v[dataType]
                });
            });
            chart.setOption({
                legend: {
                    data: legend
                },
                series: dataAry
            });
            chart.resize();
        }
    }
}

export default DataAnalyse;