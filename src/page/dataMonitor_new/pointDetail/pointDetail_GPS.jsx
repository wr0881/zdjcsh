import React, { Component } from 'react';
import axios from 'axios';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { DatePicker, message } from 'antd';
import pagedata from 'store/page.js';
import monitorpage from 'store/monitorpage.js';
import { getTime } from 'common/js/util.js';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@observer
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selsectTime: [],
            chart: null,
            size: 'default'
        }
    }
    render() {
        const { pointDetailData } = monitorpage;
        return (
            <div className="point-detail-wrapper">
                <div className="point-detail-operate">
                    <span>时间区间</span>
                    <RangePicker showTime format={dateFormat}
                        onOk={v => {
                            this.setState({ selsectTime: v });
                        }}
                    />
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
                    display: JSON.stringify(toJS(monitorpage.selectPoint)) === '{}' ? 'none' : 'block'
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
                        <div className="point-detail-table2" id="detailData2">
                            <div className="point-detail-table2-item">
                                <span>初始时间</span>
                                <span>{pointDetailData.firstTime || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table2-item">
                                <span>初始值X</span>
                                <span>{pointDetailData.firstDataX || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table2-item">
                                <span>初始值Y</span>
                                <span>{pointDetailData.firstDataY || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table2-item">
                                <span>初始值Z</span>
                                <span>{pointDetailData.firstDataZ || '暂无数据'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        display: this.state.isShowChart ? 'block' : 'none'
                    }}>
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
        this.state.destroyAutorun();
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
                data: ['累计变化量X', '累计变化量Y', '累计变化量Z'],
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                    name: '累计变化量X',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '累计变化量Y',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '累计变化量Z',
                    type: 'line',
                    data: [150, 232, 201, 154, 190, 330, 410]
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
            //console.log(code);
            //console.log(data);
            
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
        const { chart } = this.state;
        let time = [], totalChangeX = [], totalChangeY = [], totalChangeZ = [];
        data.commonDataVOs.forEach(v => {
            time.push(v.createDate);
            totalChangeX.push(v.totalChangeX);
            totalChangeY.push(v.totalChangeY);
            totalChangeZ.push(v.totalChangeZ);
        });
        chart && chart.setOption({
            xAxis: {
                data: time
            },
            series: [
                {
                    name: '累计变化量X',
                    type: 'line',
                    data: totalChangeX
                },
                {
                    name: '累计变化量Y',
                    type: 'line',
                    data: totalChangeY
                },
                {
                    name: '累计变化量Z',
                    type: 'line',
                    data: totalChangeZ
                }
            ]
        })
        chart.resize();
    }
}

export default PointDetail;