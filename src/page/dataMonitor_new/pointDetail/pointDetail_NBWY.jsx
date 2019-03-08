import React, { Component } from 'react';
import axios from 'axios';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { DatePicker, message, Select } from 'antd';
import pagedata from 'store/page.js';
import monitorpage from 'store/monitorpage.js';
import { getTime } from 'common/js/util.js';

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
            spinState: false
        }
        
    }
    // handleSearch = (keywords) => {
    //     //调用接口前清空数据
    //     this.setState({
    //         list: [],
    //         spinState: true
    //     })        
    //     //请求后端搜索接口
    //     axios('/sector/querySensorData', {
    //         keywords,
    //     }).then(res => {
    //         const { code, data } = res.data; 
    //         console.log(data.sensorNumbers);
    //         if (code === 0) {
    //             this.setState({
    //                 list: data.sensorNumbers,
    //                 spinState: false
    //             })
    //         }
    //     })
    // }
    render() {
        const { pointDetailData } = monitorpage;
        const { list } = this.state;
        return (
            <div className="point-detail-wrapper">
                <div className="point-detail-operate">
                    <span>传感器编号</span>  
                    <Select
                        showSearch
                        key={Math.random()}
                        placeholder="请选择..."
                        style={{ width:160 }}
                        filterOption={false}
                        onSearch={this.handleSearch}
                    >
                        {
                            list.map((item,index)=>(
                                <Option key={index} value={item}>{item}</Option>
                            ))
                        }
                    </Select>
                    <div style={{ display: 'inline-block', width: '20px' }}></div>
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
                    <div className="point-detail-table-wrapper" style={{ width:280 }}>
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
                        {/* <div className="point-detail-table2" id="detailData2">
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
                        </div> */}
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width:520,
                        display: this.state.isShowChart ? 'block' : 'none'
                    }}>
                        <div>
                            <div className="point-detail-chart" ref='chart1'></div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width:680,
                        display: this.state.isShowChart ? 'block' : 'none'
                    }}>
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
                data: [],
                //selectedMode: 'single'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    show:true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#E9E9E9'
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
            console.log(code);
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
                console.log(data.sensorNumbers);             
                this.setState({ isShowChart: true })
                this.setEchartLine(data);
                console.log("test111111");
            } else {
                this.setState({ isShowChart: false })
                message.info(msg);
            }
        })
        console.log(pagedata.sector.sectorId);
        console.log(selectPoint.monitorType);
        console.log(selectPoint.monitorPointNumber);
        
    }

    setEchartLine(data) {
        const { chart1,chart2 } = this.state;
        let time = [], totalChangeX = [], totalChangeY = [], Depth = [];
        data.deepDatas.forEach(v => {
            time.push(v.createDate);
            Depth.push(v.sensorDeep+'m');
            totalChangeX.push(v.totalChangeX);
            totalChangeY.push(v.totalChangeY);
        });
        console.log(data.deepDatas);
        console.log(Depth);
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
        chart2 && chart2.setOption({
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
            ]
        })
        chart1.resize();
        chart2.resize();
    }
}

export default PointDetail;