import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { DatePicker, Select, Button } from 'antd';
import monitorpage from 'store/monitorpage.js';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const Option = Select.Option;

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
                    <div style={{ display: 'inline-block', width: '20px' }}></div>
                    <span>时间区间</span>
                    <RangePicker showTime format={dateFormat} defaultValue={monitorpage.selsectTime}
                        onOk={v => {
                            monitorpage.selsectTime = v;
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
                </div>
                <div style={{ display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'block' : 'none', height: '400px' }}>
                    <div style={{ height: '50px' }}></div>
                    <span style={{ padding: '50px' }}>暂无数据信息，请选择测点!</span>
                </div>
                <div className="point-detail-content" style={{
                    display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'none' : 'block'
                }}>
                    <div className="point-detail-table-wrapper" style={{ width: 280 }}>
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
                        width: 520,
                        display: monitorpage.isShowMapChart ? 'block' : 'none'
                    }}>
                        <div>
                            <div className="point-detail-chart" ref='chart1'></div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width: 680,
                        display: monitorpage.isShowMapChartNBWY ? 'block' : 'none'
                    }}>
                        <span>深度</span>
                        <Select
                            showSearch
                            className="deep"
                            style={{ width: 200 }}
                            onChange={v => { monitorpage.selectDeep = v }}
                            value={monitorpage.selectDeep}
                        >
                            {monitorpage.mapEchartData.sensorNumbers && monitorpage.mapEchartData.sensorNumbers.map(item => {
                                return <Option className="deepSelect" key={item} value={item}>{item}</Option>
                            })}
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
        chart1.setOption(option1);
        this.setState({ chart1 });
        chart2.setOption(option2);
        this.setState({ chart2 });
        window.addEventListener('resize', _ => {
            chart1.resize();
            chart2.resize();
        });
    }
    // getDepth(){
    //     const selectPoint = toJS(monitorpage.selectPoint);
    //     const { selsectTime } = this.state;
    //     axios.get('/sector/querySensorData', {
    //         params: {
    //             sectorId: pagedata.sector.sectorId,
    //             monitorType: selectPoint.monitorType,
    //             monitorPointNumber: selectPoint.monitorPointNumber,
    //             beginTime: selsectTime[0] ? selsectTime[0].format(dateFormat) : getTime('day')[0],
    //             endTime: selsectTime[1] ? selsectTime[1].format(dateFormat) : getTime('day')[1],
    //         }
    //     }).then(res => {
    //         const { code, msg, data } = res.data;
    //         console.log(data);
    //         if (code === 0) {
    //             const deepArr = data.sensorNumbers;
    //             let deepOption = [];
    //             deepArr.map((item,i)=>(
    //                 deepOption.push(
    //                     <Option className="deepSelect" key={i} value={item}>{item}</Option>
    //                 )           
    //             ));
    //             this.setState({deepOption});
    //         }else {
    //             message.info(msg);
    //         }
    //     })
    // }
    setEchartLine(data) {
        const { chart1 } = this.state;
        let totalChangeX = [], totalChangeY = [], Depth = [];
        console.log(data);
        data.deepDatas.forEach(v => {
            Depth.push(v.sensorDeep + 'm');
            totalChangeX.push(v.totalChangeX);
            totalChangeY.push(v.totalChangeY);
        });
        chart1 && chart1.setOption({
            xAxis: {
                data: Depth
            },
            series: [
                {
                    name: 'X',
                    type: 'line',
                    smooth: true,
                    data: totalChangeX
                },
                {
                    name: 'Y',
                    type: 'line',
                    smooth: true,
                    data: totalChangeY
                }
            ]
        });
        chart1.resize();
    }
    setEchartLineNBWY(data) {
        const { chart2 } = this.state;
        let time = [], measuredDataX = [], measuredDataY = [];
        console.log(data);
        data.measuredDataX.forEach(v => {
            time.push(v.createDate);
            measuredDataX.push(v.date);
        });
        data.measuredDataY.forEach(v => {
            measuredDataY.push(v.date);
        });
        chart2 && chart2.setOption({
            xAxis: {
                data: time
            },
            series: [
                {
                    name: '深度X通道',
                    type: 'line',
                    data: measuredDataX
                },
                {
                    name: '深度Y通道',
                    type: 'line',
                    data: measuredDataY
                }
            ]
        })
        chart2.resize();
    }
}

export default PointDetail;