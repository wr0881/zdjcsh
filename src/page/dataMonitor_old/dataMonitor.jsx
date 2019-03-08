import React, { Component } from 'react';
import axios from 'axios';
import { toJS } from 'mobx';
import { DatePicker, Modal, message } from 'antd';
import echarts from 'echarts';
import Hot from 'component/Hot/hot';
import DataAnalyse from './dataAnalyse';
import pagedata from 'store/page.js';
import unit from 'store/unit';
import { getTime } from 'common/js/util.js';
//banner图
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

import './dataMonitor.scss';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

class DataMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            chart: null,
            selectPointInfo: {},
            selsectTime: [],
            blueprintData: [],
            pointDetailData: {},
        }
    }
    render() {
        const { blueprintData, pointDetailData, selectPointInfo } = this.state;
        return (
            <div className='dataMonitor-wrapper'>
                <div className="point-map-wrapper">
                    <div className="swiper-container">
                        <div className="swiper-wrapper" style={{ width: '800px', height: '300px' }}>
                            {blueprintData.map(v => {
                                return (
                                    <div key={Math.random()} className="swiper-slide">
                                        <Hot
                                            key={Math.random()}
                                            style={{ width: '100%', height: '100%' }}
                                            imgUrl={`${window.Psq_ImgUrl}${v.imageUrl}`}
                                            onClick={v => {
                                                this.setState({ selectPointInfo: v });
                                            }}
                                            imgInfo={v}
                                            dataSource={v.monitorPoints}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>
                <div className="point-detail-wrapper">
                    <div className="point-detail-operate">
                        <span>时间区间</span>
                        <RangePicker showTime format={dateFormat}
                            onOk={v => {
                                this.setState({ selsectTime: v });
                            }}
                        />
                        <div className="point-detail-operate-timeselect"
                            onClick={this.setChart.bind(this, selectPointInfo)}
                        >查看</div>
                        <div className="point-detail-operate-timeselect"
                            onClick={_ => {
                                this.setState({ visible: true });
                            }}
                        >数据对比</div>
                    </div>
                    <div className="point-detail-content" style={{ display: pointDetailData.monitorPointNumber ? 'block' : 'none' }}>
                        <div className="point-detail-table-wrapper">
                            <div className="point-detail-table1">
                                <div className="point-detail-table1-item">
                                    <span>测点名称</span>
                                    <span>{pointDetailData.monitorPointNumber}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>终端通道</span>
                                    <span>{pointDetailData.terminalChannel}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>传感器编号</span>
                                    <span>{pointDetailData.sensorNumber}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>检测指标</span>
                                    <span>{pointDetailData.monitorTypeName}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>采集器编号</span>
                                    <span>{pointDetailData.terminalNumber}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>一级告警</span>
                                    <span>{pointDetailData.oneMinValue}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>二级告警</span>
                                    <span>{pointDetailData.twoMinValue}</span>
                                </div>
                                <div className="point-detail-table1-item">
                                    <span>三级告警</span>
                                    <span>{pointDetailData.threeMinValue}</span>
                                </div>
                            </div>
                            <div className="point-detail-table2">
                                <div className="point-detail-table2-item">
                                    <span>初始时间</span>
                                    <span>{pointDetailData.firstTime}</span>
                                </div>
                                <div className="point-detail-table2-item">
                                    <span>初始值</span>
                                    <span>{pointDetailData.firstData}</span>
                                </div>
                            </div>
                        </div>
                        <div className="point-detail-chart-wrapper">
                            <div>
                                <div className="point-detail-chart" ref='chart'></div>
                            </div>
                        </div>
                    </div>
                    <div className="point-detail-content" style={{ display: pointDetailData.monitorPointNumber ? 'none' : 'block' }}>
                        <span>暂无数据信息，请选择测点!</span>
                    </div>
                </div>
                <Modal
                    key='dataAnalyse'
                    title={<div className='user-change-pwd'>数据对比</div>}
                    visible={this.state.visible}
                    destroyOnClose={true}
                    footer={null}
                    width='1200px'
                    bodyStyle={{ padding: '0px' }}
                    // onOk={this.handleOk}
                    onCancel={_ => { this.setState({ visible: false }) }}
                >
                    <DataAnalyse />
                </Modal>
            </div>
        );
    }
    componentDidMount() {
        this.initBanner();
        this.initChart();
        this.getBlueprintData();
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.selectPointInfo.monitorPointNumber !== this.state.selectPointInfo.monitorPointNumber) {
            this.setChart(nextState.selectPointInfo);
            this.getPointDetailData(nextState.selectPointInfo);
        };
        if (nextState.selectPointInfo.monitorPointNumber) {
            setTimeout(() => {
                this.state.chart.resize();
            }, 16);
        }
        return true;
    }
    initBanner() {
        new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            observer: true,
        });
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
                    name: '累计变化量',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '单次变化量',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '变化速率',
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
    setChart(pointInfo) {
        const { chart, selsectTime, pointDetailData } = this.state;
        console.log(toJS(unit))
        console.log(pointDetailData)
        if (chart && pointInfo.monitorPointNumber) {
            axios.get('/sector/querySensorData', {
                params: {
                    sectorId: pagedata.sector.sectorId,
                    monitorType: pointInfo.monitorType,
                    monitorPointNumber: pointInfo.monitorPointNumber,
                    beginTime: selsectTime[0] ? selsectTime[0].format(dateFormat) : getTime('day')[0],
                    endTime: selsectTime[1] ? selsectTime[1].format(dateFormat) : getTime('day')[1],
                }
            }).then(res => {
                const { code, msg, data } = res.data;
                let time = [], singleChange = [], totalChange = [], speedChange = [];
                if (code === 0) {
                    data.commonDataVOs.forEach(v => {
                        time.push(v.createDate);
                        singleChange.push(v.singleChange);
                        totalChange.push(v.totalChange);
                        speedChange.push(v.speedChange);
                    });
                    chart.setOption({
                        xAxis: {
                            data: time
                        },
                        series: [
                            {
                                name: '累计变化量',
                                type: 'line',
                                data: totalChange
                            },
                            {
                                name: '单次变化量',
                                type: 'line',
                                data: singleChange
                            },
                            {
                                name: '变化速率',
                                type: 'line',
                                data: speedChange
                            }
                        ]
                    })
                } else {
                    chart.setOption({
                        xAxis: {
                            data: []
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
                    });
                    message.error(msg);
                    console.log('/sector/querySensorData code: ', code, msg);
                }
            })
        }
    }
    getBlueprintData() {
        axios.get('/sector/queryImagesMonitorPoint', {
            params: {
                sectorId: pagedata.sector.sectorId,
                imageType: 3
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.setState({ blueprintData: data });
            } else {
                this.setState({ blueprintData: [] });
                message.error('暂无布点图信息');
                console.log('/sector/queryImagesMonitorPoint code: ', code, msg);
            }
        })
    }
    getPointDetailData(pointInfo) {
        axios.get('/sector/queryTerminalAndSensor', {
            params: {
                sectorId: pagedata.sector.sectorId,
                monitorType: pointInfo.monitorType,
                monitorPointNumber: pointInfo.monitorPointNumber
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.setState({ pointDetailData: data });
            } else {
                this.setState({ pointDetailData: {} });
                console.log('/sector/queryTerminalAndSensor code: ', code, msg);
            }
        })
    }
}

export default DataMonitor;