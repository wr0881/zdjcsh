import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS,autorun } from 'mobx';
import { Radio,Table } from 'antd';
import echarts from 'echarts';
import './control.scss';
import datacontrol from 'store/datacontrol.js';
import axios from 'axios';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';

const RadioGroup = Radio.Group;

@observer
class DataControlChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            tableData:[],
            //pointName:''
        };
    }

    render() {
        const columns = [
            // {
            //     title: '测点名称',
            //     dataIndex: '{datacontrol.pointName}',
            // },
            {
                title: '测试时间',
                dataIndex: 'createDate'
            },
            {
                title: '测试值',
                dataIndex: 'measuredData'
            },
            {
                title: '累计变化量',
                dataIndex: 'totalChange'
            },
            {
                title: '单次变化量',
                dataIndex: 'singleChange'
            },
            {
                title: '变化速率',
                dataIndex: 'speedChange'
            },
        ];
        return(
            
            <div className="control-modal-content">
                <div className="left-control-modal" style={{backgroundColor:'#FAFBFF'}}>
                    <div className="dataAnalyse-operate-title">{datacontrol.monitorTypeName}</div>
                    <div className="dataAnalyse-operate-content">
                        <RadioGroup
                            key={Math.random()}
                            onChange={(e) => { datacontrol.pointName = e.target.value;
                                this.getPointEchartData();  
                            }}
                            value={datacontrol.pointName}                            
                        >
                            {datacontrol.pointNameData.map(v => {
                                return <Radio key={v} value={v}>{v}</Radio>;
                            })}
                        </RadioGroup>
                    </div>
                    
                </div>
                <div className="right-control-modal">
                    <div className="controlChart" style={{width:'100%',height:'350px'}}>
                        
                        <div className="datacontrol-chart" ref='chart' value={datacontrol.pointName} style={{padding:'10px',width:'100%',height:'300px',marginTop:'50px'}}>
                        </div>                        
                    </div>
                    <div className="datacontrol-table" style={{width:'100%',height:'240px',padding:'10px'}}>
                        
                        <Table
                            key={Math.random()}
                            className='pointNameData'
                            columns={columns}
                            bordered={true}
                            
                            //dataSource={this.state.tableData}
                        />
                    </div>
                </div>
            </div>
        );
    }
    
    componentDidMount() {       
        this.initChart();
        datacontrol.getControlTypeData();
    }
    componentWillUnmount() {
        
    }
    getPointEchartData() {
        const timeType = 'day';
        const monitorType = this.props.typeValue;
        let beginTime = '', endTime = '';
        beginTime = getTime(timeType)[0];
        endTime = getTime(timeType)[1];
        console.log(datacontrol.pointName);
        //console.log(this.pointName);
        console.log(monitorType);
        axios.get('/sector/querySensorData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: monitorType,
                monitorPointNumber: datacontrol.pointName,
                beginTime: beginTime,
                endTime: endTime,
            }
        }).then(res => {
            const { code,data } = res.data;
            if (code === 0) {
                this.pointEchartData = data;
                this.timeselectLoading = false;  
                console.log(data);
                this.setEchartLine(this.pointEchartData);
                // this.pointTableData = data.commonDataVOs.map(v => {
                //     return { ...v, key: Math.random() };
                // });
                // console.log(this.pointTableData); 
            } else {
                this.pointTableData = [];
                this.isShowPointChart = false;
                this.timeselectLoading = false;
            }
        })
        //this.displayChart();
    }
    initChart(){
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
                //selectedMode: 'single'
            },
            toolbox: {
                show: true,
                feature: {
                    // dataZoom: {
                    //     yAxisIndex: 'none'
                    // },
                    dataView: { readOnly: false },
                    // magicType: { type: ['line', 'bar'] },
                    //restore: {},
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
        // const monitorTypeName = datacontrol.pointName.monitorType;

        // const totalChangeUnit = getUnit(monitorTypeName).unitA;
        // const singleChangeUnit = getUnit(monitorTypeName).unitB;
        // const speedChangeUnit = getUnit(monitorTypeName).unitC;
        let time = [], singleChange = [], totalChange = [], speedChange = [];
        data.commonDataVOs && data.commonDataVOs.forEach(v => {
            time.push(v.createDate);
            singleChange.push(v.singleChange);
            totalChange.push(v.totalChange);
            speedChange.push(v.speedChange);
        });
        const monitorType = this.props.typeValue;
        
        chart && chart.setOption({
            legend: {
                data: ['累计变化量', '单次变化量', '变化速率'],
                //selectedMode: 'single'
            },
            xAxis: {
                data: time
            },
            yAxis: {
                
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
        //setTimeout(() => { chart.resize && chart.resize() }, 16);
    }
}

export default DataControlChart;