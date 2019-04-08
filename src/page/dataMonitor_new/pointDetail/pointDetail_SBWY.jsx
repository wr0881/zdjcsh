import React, { Component } from 'react';
import axios from 'axios';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { DatePicker, message, Radio } from 'antd';
import pagedata from 'store/page.js';
import monitorpage from 'store/monitorpage.js';
import { getTime } from 'common/js/util.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@observer
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selsectTime: [],
            selsectWay: 'x',
            chart: null
        }
    }
    render() {
        const { pointDetailData } = monitorpage;
        return (
            <div className="point-detail-wrapper">
                <div className="point-detail-operate">
                    <span>时间</span>
                    <RangePicker showTime format={dateFormat}
                        onOk={v => {
                            this.setState({ selsectTime: v });
                        }}
                    />
                    {/* <DatePicker onChange={v => {
                        this.setState({ selsectTime: v })
                    }} /> */}
                    <div className="point-detail-operate-timeselect"
                    >查看</div>
                    <div className="point-detail-operate-timeselect"
                        onClick={_ => {
                            monitorpage.dataContrastVisible = true;
                        }}
                    >数据对比</div>
                </div>
                <div style={{ display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'block' : 'none', height: '400px' }}>
                    <div style={{ height: '50px' }}></div>
                    <span style={{ padding: '50px' }}>暂无数据信息，请选择测点!</span>
                </div>
                <div className="point-detail-content" style={{
                    display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'none' : 'flex'
                }}>
                    <div className="point-detail-table-wrapper">
                        <div className="point-detail-table1">
                            <div className="point-detail-table1-item">
                                <span>测点名称</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>终端通道</span>
                                <span>{pointDetailData.terminalChannel || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>传感器编号</span>
                                <span>{pointDetailData.sensorNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>检测指标</span>
                                <span>{pointDetailData.monitorTypeName || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>采集器编号</span>
                                <span>{pointDetailData.terminalNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>一级告警</span>
                                <span>{pointDetailData.oneMinValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>二级告警</span>
                                <span>{pointDetailData.twoMinValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>三级告警</span>
                                <span>{pointDetailData.threeMinValue || '暂无数据'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        display: this.state.isShowChart ? 'block' : 'none'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            zIndex: '100'
                        }}>
                            <RadioGroup key={Math.random()}
                                size='small'
                                defaultValue={this.state.selsectWay}
                                onChange={e => {
                                    this.setState({ selsectWay: e.target.value })
                                }}
                            >
                                <RadioButton value="x" >x通道</RadioButton>
                                <RadioButton value="y">y通道</RadioButton>
                            </RadioGroup>
                        </div>
                        <div>
                            <div className="point-detail-chart" ref='chart'></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.initChart();

        let destroyAutorun = autorun(() => {
            const selectPoint = toJS(monitorpage.selectPoint);
            if (JSON.stringify(selectPoint) !== '{}') {
                this.getPointDetailData();
                this.getEchartData();
            }
        });
        this.setState({ destroyAutorun });
    }
    componentWillUnmount() {
        this.state.destroyAutorun && this.state.destroyAutorun();
    }
    initChart() {
        const chart = echarts.init(this.refs.chart);

        const option = {
            color: ['#32D184', '#E4B669', '#1890FF'],
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
            grid: {
                top: '30',
                bottom: '10',
                left: '0',
                right: '30',
                containLabel: true
            },
            legend: {
                data: ['累计变化量', '单次变化量', '变化速率'],
                selectedMode: 'single'
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
                },
                data: []
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
            series: [
                {
                    name: '累计变化量',
                    type: 'line',
                    data: []
                },
                {
                    name: '单次变化量',
                    type: 'line',
                    data: []
                },
                {
                    name: '变化速率',
                    type: 'line',
                    data: []
                }
            ]
        };

        chart.setOption(option);

        this.setState({ chart });

        window.addEventListener('resize', _ => {
            chart.resize();
        });
    }
    getPointDetailData() {
        const selectPoint = toJS(monitorpage.selectPoint);
        axios.get('/sector/queryTerminalAndSensor', {
            params: {
                sectorId: pagedata.sector.sectorId,
                monitorType: selectPoint.monitorType,
                monitorPointNumber: selectPoint.monitorPointNumber
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                if (data) {
                    monitorpage.pointDetailData = data;
                }
            } else {
                monitorpage.pointDetailData = {};
                console.log('/sector/queryTerminalAndSensor code: ', code, msg);
            }
        })
    }
    getEchartData() {
        const selectPoint = toJS(monitorpage.selectPoint);
        const { selsectTime } = this.state;
        axios.get('/sector/querySensorData', {
            params: {
                sectorId: pagedata.sector.sectorId,
                monitorType: selectPoint.monitorType,
                monitorPointNumber: selectPoint.monitorPointNumber,
                beginTime: selsectTime[0] ? selsectTime[0].format(dateFormat) : getTime('day')[0],
                endTime: selsectTime[1] ? selsectTime[1].format(dateFormat) : getTime('day')[1],
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            console.log('chartdata', data)
            if (code === 0) {
                this.setState({ isShowChart: true })
                this.setEchartLine(data);
            } else {
                this.setState({ isShowChart: false })
                message.info(msg);
            }
        })
    }
    setEchartLine(data) {
        const { chart, selsectWay } = this.state;
        let depth = [], singleChangeX = [], totalChangeX = [], speedChangeX = [], singleChangeY = [], totalChangeY = [], speedChangeY = [];
        data.deepDatas && data.deepDatas.forEach(v => {
            depth.push(v.sensorDeep);
            singleChangeX.push(v.singleChangeX);
            totalChangeX.push(v.totalChangeX);
            speedChangeX.push(v.speedChangeX);
            singleChangeY.push(v.singleChangeY);
            totalChangeY.push(v.totalChangeY);
            speedChangeY.push(v.speedChangeY);
        });
        chart && chart.setOption({
            xAxis: {
                data: depth
            },
            series: [
                {
                    name: '累计变化量',
                    type: 'line',
                    data: selsectWay === 'x' ? totalChangeX : totalChangeY
                },
                {
                    name: '单次变化量',
                    type: 'line',
                    data: selsectWay === 'x' ? singleChangeX : singleChangeY
                },
                {
                    name: '变化速率',
                    type: 'line',
                    data: selsectWay === 'x' ? speedChangeX : speedChangeY
                }
            ]
        })
        chart.resize();
    }
}

export default PointDetail;