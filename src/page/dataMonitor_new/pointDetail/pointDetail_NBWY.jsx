import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { DatePicker, Select, Button } from 'antd';
import monitorpage from 'store/monitorpage.js';
import { getUnit } from 'common/js/util.js';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const { Option } = Select;

@observer
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selsectTime: [],
            chart1: null,
            chart2: null,
        }

    }

    render() {
        const { pointDetailData } = monitorpage;
        return (
            <div className="point-detail-wrapper">
                <div className="point-detail-operate">
                    <span>时间区间</span>
                    <RangePicker showTime format={dateFormat} defaultValue={monitorpage.selsectTime}
                        onOk={v => {
                            monitorpage.selsectTime = v;
                            monitorpage.timeselectLoading = true;
                            monitorpage.getMapEchartData();
                            monitorpage.getMapEchartDataNBWY();
                        }}
                    />
                    <Button
                        type='primary'
                        loading={monitorpage.timeselectLoading}
                        onClick={() => {
                            monitorpage.timeselectLoading = true;
                            monitorpage.getMapEchartData();
                            monitorpage.getMapEchartDataNBWY();                          
                        }}
                    >查看</Button>
                    <Button
                        type='primary'
                        style={{ marginLeft: '20px' }}
                        onClick={_ => {
                            monitorpage.dataContrastVisible = true;
                        }}
                    >数据对比</Button>
                    <div style={{
                        flex: '1 1 auto',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <div style={{ marginRight: '10px' }}>选择测点: </div>
                        <Select
                            showSearch
                            style={{ width: 200, float: 'right' }}
                            placeholder="选择测点"
                            value={monitorpage.selectPoint.monitorPointNumber}
                            onChange={v => { monitorpage.selectPoint = JSON.parse(v) }}
                        >
                            {toJS(monitorpage.selectPointList).map(v => {
                                return <Option key={v.monitorPointNumber} value={JSON.stringify(v)}>{v.monitorPointNumber}</Option>
                            })}
                        </Select>
                    </div>
                </div>
                <div style={{ display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'block' : 'none', height: '400px' }}>
                    <div style={{ height: '50px' }}></div>
                    <span style={{ padding: '50px' }}>暂无数据信息，请选择测点!</span>
                </div>
                <div className="point-detail-content" style={{
                    display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'none' : 'flex'
                }}>
                    <div className="point-detail-table-wrapper" style={{ width: '20%' }}>
                        <div className="point-detail-table3">
                            <div className="point-detail-table3-item">
                                <span>测点名称</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>采集器编号</span>
                                <span>{pointDetailData.terminalNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>采集器通道</span>
                                <span>{pointDetailData.terminalChannel || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>检测指标</span>
                                <span>{pointDetailData.monitorTypeName || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>传感器类型</span>
                                <span>{pointDetailData.sensorName || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>深度</span>
                                <span>{pointDetailData.sensorDeepInfo || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>一级告警</span>
                                <span>{pointDetailData.oneMinValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>二级告警</span>
                                <span>{pointDetailData.twoMinValue || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table3-item">
                                <span>三级告警</span>
                                <span>{pointDetailData.threeMinValue || '暂无数据'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width: '30%',
                        display: monitorpage.isShowMapChart ? 'block' : 'none'
                    }}>
                        <div>
                            <div className="point-detail-chart" ref='chart1'></div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width: '50%',
                        display: monitorpage.isShowMapChart ? 'block' : 'none'
                    }}>
                        <span style={{ marginRight:'10px' }}>深度</span>
                        <Select
                            showSearch
                            className="deep"
                            style={{ width: 200 }}
                            onChange={v => { monitorpage.selectDeep = v }}
                            value={monitorpage.selectDeep}
                        >
                            {monitorpage.mapEchartData.sensorNumbers && monitorpage.mapEchartData.sensorNumbers.map((item,index) => {
                                return <Option className="deepSelect" key={index} value={item}>{monitorpage.mapEchartData.sensorDeep[index]}m</Option>
                            })}
                            {/* {monitorpage.mapEchartData.sensorNumbers && monitorpage.mapEchartData.sensorNumbers.map((item) => {
                                return <Option className="deepSelect" key={item} value={item}>{item}</Option>
                            })} */}
                            {/* {monitorpage.mapEchartData.sensorNumbers && monitorpage.mapEchartData.sensorNumbers.map((item,index) => {
                                return <Option className="deepSelect" key={index} value={item}>{item}</Option>
                            })} */}
                        </Select>
                        <div>
                            <div className="point-detail-chart" ref='chart2'></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.initChart();
        let destroyAutorun = autorun(() => {
            const mapEchartData = toJS(monitorpage.mapEchartData);
            const mapEchartDataNBWY = toJS(monitorpage.mapEchartDataNBWY);
            if (JSON.stringify(mapEchartData) !== '{}') {
                this.setEchartLine(mapEchartData);
            }
            if (JSON.stringify(mapEchartDataNBWY) !== '{}') {
                this.setEchartLineNBWY(mapEchartDataNBWY);
            }else {
                this.isShowMapChartNBWY = false;
            }
        });
        this.destroyAutorun = destroyAutorun;
    }
    componentWillUnmount() {
        this.destroyAutorun && this.destroyAutorun();
    }
    initChart() {
        const chart1 = echarts.init(this.refs.chart1);
        const chart2 = echarts.init(this.refs.chart2);
        const option1 = {
            color: ['#2a82e4', '#55bfc0'],
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
                data: [],
                //selectedMode: 'single'
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
                data: ['0.5m', '1m', '1.5m', '2m', '2.5m', '3m', '3.5m']
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
                    name: 'X',
                    type: 'line',
                    smooth: true,
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Y',
                    type: 'line',
                    smooth: true,
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };
        const option2 = {
            color: ['#2a82e4', '#55bfc0', '#937bcf'],
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
                data: ['深度X通道', '深度Y通道'],
                //selectedMode: 'single'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#E9E9E9'
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
                    name: 'DeepX',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210]
                }
            ]
        };
        chart1.clear();
        chart1.setOption(option1);
        this.chart1 = chart1;
        chart2.clear();
        chart2.setOption(option2);
        this.chart2 = chart2;
        window.addEventListener('resize', _ => {
            chart1.resize();
            chart2.resize();
        });
    }
    setEchartLine(data) {
        const chart1 = this.chart1;
        const monitorTypeName = monitorpage.selectPoint.monitorTypeName;

        const totalChangeUnit = getUnit(monitorTypeName).unitA;
        let totalChangeX = [], totalChangeY = [], Depth = [];
        data.deepDatas && data.deepDatas.forEach(v => {
            Depth.push(v.sensorDeep + 'm');
            totalChangeX.push(v.totalChangeX);
            totalChangeY.push(v.totalChangeY);
        });
        chart1 && chart1.setOption({
            legend: {
                data: ['X通道' + totalChangeUnit, 'Y通道' + totalChangeUnit],
                //selectedMode: 'single'
            },
            xAxis: {
                data: Depth
            },
            series: [
                {
                    name: 'X通道' + totalChangeUnit,
                    type: 'line',
                    smooth: true,
                    data: totalChangeX,
                },
                {
                    name: 'Y通道' + totalChangeUnit,
                    type: 'line',
                    smooth: true,
                    data: totalChangeY
                }
            ]
        });
        setTimeout(() => { chart1.resize && chart1.resize() }, 16);
    }
    setEchartLineNBWY(data) {
        const chart2 = this.chart2;
        const monitorTypeName = monitorpage.selectPoint.monitorTypeName;

        const measuredDataUnit = getUnit(monitorTypeName).unitA;
        let time = [], measuredDataX = [], measuredDataY = [];
        data.measuredDataX && data.measuredDataX.forEach(v => {
            time.push(v.createDate);
            measuredDataX.push(v.date);
        });
        data.measuredDataY && data.measuredDataY.forEach(v => {
            measuredDataY.push(v.date);
        });
        
        chart2 && chart2.setOption({
            legend: {
                data: ['深度X通道' + measuredDataUnit, '深度Y通道' + measuredDataUnit],
                //selectedMode: 'single'
            },
            xAxis: {
                data: time
            },
            series: [
                {
                    name: '深度X通道' + measuredDataUnit,
                    type: 'line',
                    data: measuredDataX
                },
                {
                    name: '深度Y通道' + measuredDataUnit,
                    type: 'line',
                    data: measuredDataY
                }
            ]
        })
        setTimeout(() => { chart2.resize && chart2.resize() }, 16);
    }
}

export default PointDetail;