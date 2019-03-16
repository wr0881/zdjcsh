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

    render() {
        const { pointDetailData } = monitorpage;
        return (
            <div className="point-detail-wrapper">
                <div className="point-detail-operate">
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
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width:520,
                        display: this.state.isShowChart1 ? 'block' : 'none'
                    }}>
                        <div>
                            <div className="point-detail-chart" ref='chart1'></div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        width:680,
                        display: this.state.isShowChart2 ? 'block' : 'none'
                    }}>
                        <span>深度</span>
                        <Select
                            showSearch
                            className="deep"
                            style={{ width: 200 }}
                            onChange={this.handleChange}
                            defaultValue="lmp03"
                        >
                            {this.state.options}
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
        this.setDepth();
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
    getPointDetailData() {
        const selectPoint = toJS(monitorpage.selectPoint);
        axios.get('/sector/queryTerminalAndSensor', {
            params: {
                sectorId: pagedata.sector.sectorId,
                monitorType: selectPoint.monitorType,
                monitorPointNumber: selectPoint.monitorPointNumber
            }
        }).then(res => {
            const { code, data } = res.data;
            if (code === 0 || code === 2) {
                if (data) {
                    monitorpage.pointDetailData = data;
                }
            } else {
                monitorpage.pointDetailData = {};
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
                this.setState({ isShowChart1: true });
                this.setEchartLine1(data);
                //this.setDepth(data);
                //this.handleChange(data);
                console.log("test!!!!!!!");
            } else {
                this.setState({ isShowChart1: false })
                message.info(msg);
            }
        })
        axios.get('/data/queryDeepData', {
            params: {
                sectorId: pagedata.sector.sectorId,
                monitorType: selectPoint.monitorType,
                monitorPointNumber: selectPoint.monitorPointNumber,
                sensorNumber: 'lmp03',
                beginTime: selsectTime[0] ? selsectTime[0].format(dateFormat) : getTime('day')[0],
                endTime: selsectTime[1] ? selsectTime[1].format(dateFormat) : getTime('day')[1],
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            //console.log(data);
            if (code === 0) {
                this.setState({ isShowChart2: true });
                this.setEchartLine2(data);
            } else {
                this.setState({ isShowChart2: false });
                message.info(msg);
            }
        })
    }
    setDepth(){
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
                const deepArr = data.sensorNumbers;
                const options = deepArr.map(item=><Option />);
                this.setState({options});
            }else {
                message.info(msg);
            }
        })
    }
    // setDepth(data){
    //     const deepArr = data.sensorNumbers;
    //     //console.log(deepArr);
    //     let deepOption = [];
    //     deepArr.map((item,i)=>(
    //         deepOption.push(
    //             <Option className="deepSelect" key={i} value={item}>{item}</Option>
    //         )           
    //     ));
    //     //this.setState({deepOption});  
    //     console.log(deepOption);  
    // }
    handleChange(data){
        const selectOption = data.sensorNumbers;
        this.setState(selectOption);
        //console.log('the current state is:',this.state);
        this.getEchartData2();
        //console.log("获取各深度图表！！！！！");
    }
    // getEchartData2() {
    //     const selectPoint = toJS(monitorpage.selectPoint);
    //     const { selsectTime } = this.state;
    //     //console.log(deepOption);
    //     axios.get('/data/queryDeepData', {
    //         params: {
    //             sectorId: pagedata.sector.sectorId,
    //             monitorType: selectPoint.monitorType,
    //             monitorPointNumber: selectPoint.monitorPointNumber,
    //             sensorNumber: 'lmp03',
    //             beginTime: selsectTime[0] ? selsectTime[0].format(dateFormat) : getTime('day')[0],
    //             endTime: selsectTime[1] ? selsectTime[1].format(dateFormat) : getTime('day')[1],
    //         }
    //     }).then(res => {
    //         const { code, msg, data } = res.data;
    //         //console.log(data);
    //         if (code === 0) {
    //             this.setState({ isShowChart2: true });
    //             this.setEchartLine2(data);
    //         } else {
    //             this.setState({ isShowChart2: false });
    //             message.info(msg);
    //         }
    //     })
    // }
    setEchartLine1(data) {
        const { chart1 } = this.state;
        let totalChangeX = [], totalChangeY = [], Depth = [];
        data.deepDatas.forEach(v => {
            Depth.push(v.sensorDeep+'m');
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
    setEchartLine2(data) {
        const { chart2 } = this.state;
        let time = [], measuredDataX = [];
        data.measuredDataX.forEach(v => {
            time.push(v.createDate);
            measuredDataX.push(v.date);
            //measuredDataY.push(v.totalChangeY);
        });
        chart2 && chart2.setOption({
            xAxis: {
                data: time
            },
            series: [
                {
                    name: 'DeepX',
                    type: 'line',
                    data: measuredDataX
                }
            ]
        })
        chart2.resize();
    }
}

export default PointDetail;