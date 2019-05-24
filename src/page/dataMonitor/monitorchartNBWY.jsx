import React, { Component } from 'react';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { autorun,toJS } from 'mobx';
import './monitor.scss';
import datamonitor from 'store/datamonitor.js';
import axios from 'axios';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';

@observer
class MonitorChartNBWY extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {        
        return(
            <div className="datamonitor-chart" ref={this.props.typeValue} style={{padding:'5px',width:'100%',height:'290px'}}>
            </div>
        );
    }
    
    componentDidMount() {       
        this.getMonitorPointName();
        //this.getMonitorEchartData();
        this.initChart();
    }
    componentWillUnmount() {
        
    }
    getMonitorPointName() {
        const monitorType = this.props.typeValue;
        console.log("指标类型:",monitorType);
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: monitorType
            }
        }).then(res => {
            const { code, data } = res.data;
            if (code === 0) {
                this.pointNameData = data;
                console.log(data);
                this.getMonitorEchartData();              
            } else {
                this.pointNameData = [];
                //console.log('/point/queryMonitorPointName code: ', code, msg);
            }
        })
    }
    getMonitorEchartData(){
        const timeType = datamonitor.timeType;
        const monitorType = this.props.typeValue;
        let beginTime = '', endTime = '';
        beginTime = getTime(timeType)[0];
        endTime = getTime(timeType)[1];
        console.log(monitorType);
        
        console.log(JSON.stringify(this.pointNameData));
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: monitorType,
                pointNames: JSON.stringify(this.pointNameData),
                beginTime: beginTime,
                endTime: endTime,
                dateType: 1
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.datamonitorChartData = data.comparisonVO;
                this.getMonitorEchartDataLoading = false;
                console.log(data.comparisonVO);
                console.log('/sector/queryComparisonData code: ', code, msg);
                this.setEchartData();
            } else {
                this.datamonitorChartData = [];
                this.getMonitorEchartDataLoading = false;
                //console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
    }
    initChart() {
        const chart = echarts.init(this.refs[this.props.typeValue]);
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
            grid: {
                top: '30',
                bottom: '10',
                left: '0',
                right: '30',
                containLabel: true
            },
            legend: {
                data:[]
            },
            toolbox: {
                feature: {
                    dataView: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'value',
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
            series:[]
        };
        chart.clear();
        chart.setOption(option);

        this.chart = chart;
        window.addEventListener('resize', _ => {
            chart.resize();
        });
    }
    setEchartData(){
        const chart = this.chart;
        let legend = [], dataAry = [], Depth = [];
        const datamonitorChartData = toJS(this.datamonitorChartData);
        console.log(datamonitorChartData);
        if(!datamonitorChartData){
            return;
        }
        const pointdataTypeX = 'totalChangeX';
        const monitorType = this.props.typeValue;
        console.log(monitorType);
        datamonitorChartData.forEach(v => {
            legend.push(v.monitorPointNumber);
            dataAry.push({
                name: v.monitorPointNumber,
                type: 'line',
                smooth: true,
                symbol: "none",
                data: v[pointdataTypeX]
            });
        });
        console.log(legend);
        chart.setOption({
            legend:{
                data:legend.slice(0,10)
            },

            xAxis:{
                data:[]
            },
            yAxis:{

            },
            series:dataAry.slice(0,10)
        });
        console.log(this.props.value);
        console.log("生成图表！！！");
    }
}

export default MonitorChartNBWY;