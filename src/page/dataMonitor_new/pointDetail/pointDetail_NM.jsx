import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { DatePicker, Select, Button } from 'antd';
import monitorpage from 'store/monitorpage.js';
import { getUnit } from 'common/js/util.js';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@observer
class PointDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selsectTime: [],
            chart: null
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
                        }}
                    />
                    <Button
                        type='primary'
                        loading={monitorpage.timeselectLoading}
                        onClick={() => {
                            monitorpage.timeselectLoading = true;
                            monitorpage.getMapEchartData();
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
                    <div className="point-detail-table-wrapper">
                        <div className="point-detail-table1">
                            <div className="point-detail-table1-item">
                                <span>测点名称</span>
                                <span>{pointDetailData.monitorPointNumber || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table1-item">
                                <span>检测指标</span>
                                <span>{pointDetailData.monitorTypeName || '暂无数据'}</span>
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
                        <div className="point-detail-table2">
                            <div className="point-detail-table2-item">
                                <span>初始时间</span>
                                <span>{pointDetailData.firstTime || '暂无数据'}</span>
                            </div>
                            <div className="point-detail-table2-item">
                                <span>初始值</span>
                                <span>{pointDetailData.firstData || '暂无数据'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="point-detail-chart-wrapper" style={{
                        display: monitorpage.isShowMapChart ? 'block' : 'none'
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
            const mapEchartData = toJS(monitorpage.mapEchartData);
            if (JSON.stringify(mapEchartData) !== '{}') {
                this.setEchartLine(mapEchartData);
            }
        });
        this.destroyAutorun = destroyAutorun;
    }
    componentWillUnmount() {
        this.destroyAutorun && this.destroyAutorun();
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
                data: [],
                selectedMode: 'single'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { 
                        show: true,
                        title: '数据视图',
                        textColor: 'rgba(0, 0, 0, 0.65)',
                        textareaBorderColor: '#DFDDEC',
                        buttonColor: '#5D3AB3',
                        readOnly: true,
                        lang:['数据视图','关闭','刷新'],
                        optionToContent: function (opt) {
                            let axisData = opt.xAxis[0].data; //坐标数据
                            console.log(opt.xAxis[0]);
                            let series = opt.series; //折线图数据
                            let tdHeads = '<td  style="padding: 0 10px">测试时间</td>'; //表头
                            let tdBodys = ''; //数据
                            series.forEach(function (item) {
                                //组装表头
                                tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                            });
                            let table = `<table border="1" style="width:100%;border-collapse:collapse;font-size:14px;text-align:center;border-color:#DFDDEC"><tbody><tr>${tdHeads} </tr>`;
                            console.log(axisData.length);
                            for (let i = 0, l = axisData.length; i < l; i++) {
                                for (let j = 0; j < series.length; j++) {
                                    //组装表数据
                                    tdBodys += `<td>${ series[j].data[i]}</td>`;
                                }
                                table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
                                tdBodys = '';
                            }
                            table += '</tbody></table>';
                            return table;
                        }
                    },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    symbol: ['none', 'arrow'],
                    onZero: false,
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
                    showMaxLabel: false,
                    color: '#545454'
                },
                axisLine: {
                    symbol: ['none', 'arrow'],
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                }
            },
            series: [

            ]
        };

        chart.setOption(option);

        this.chart = chart;

        window.addEventListener('resize', _ => {
            chart.resize();
        });
    }
    setEchartLine(data) {
        const chart = this.chart;
        const monitorTypeName = monitorpage.selectPoint.monitorTypeName;

        const totalChangeUnit = getUnit(monitorTypeName).unitA;
        const singleChangeUnit = getUnit(monitorTypeName).unitB;
        const speedChangeUnit = getUnit(monitorTypeName).unitC;

        let time = [], singleChange = [], totalChange = [], speedChange = [];
        data.commonDataVOs && data.commonDataVOs.forEach(v => {
            time.push(v.createDate);
            singleChange.push(v.singleChange);
            totalChange.push(v.totalChange);
            speedChange.push(v.speedChange);
        });
        chart && chart.setOption({
            legend: {
                data: ['累计变化量' + totalChangeUnit, '单次变化量' + singleChangeUnit, '变化速率' + speedChangeUnit],
                selectedMode: 'single'
            },
            xAxis: {
                data: time
            },
            yAxis: {
                name: `单位: ${singleChangeUnit}`
            },
            series: [
                {
                    name: '累计变化量' + totalChangeUnit,
                    type: 'line',
                    data: totalChange
                },
                {
                    name: '单次变化量' + singleChangeUnit,
                    type: 'line',
                    data: singleChange
                },
                {
                    name: '变化速率' + speedChangeUnit,
                    type: 'line',
                    data: speedChange
                }
            ]
        })
        setTimeout(() => { chart.resize && chart.resize() }, 16);
    }
}

export default PointDetail;