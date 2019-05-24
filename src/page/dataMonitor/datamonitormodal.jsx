import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS,autorun } from 'mobx';
import { Radio,Table } from 'antd';
import echarts from 'echarts';
import './monitor.scss';
import datamonitor from 'store/datamonitor.js';
import axios from 'axios';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';
import { getUnit } from 'common/js/util.js';

const RadioGroup = Radio.Group;

@observer
class DataMonitorModal extends Component {
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
            {
                title: '测点名称',
                render:()=>datamonitor.pointName,
            },
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
            
            <div className="monitor-modal-content">
                <div className="left-monitor-modal" style={{backgroundColor:'#FAFBFF'}}>
                    <div className="dataAnalyse-operate-title">{datamonitor.monitorTypeName}</div>
                    <div className="dataAnalyse-operate-content" style={{marginTop:'30px',height:'324px',overflowY:'auto'}}>
                        <RadioGroup
                            //key={datamonitor.pointName}
                            onChange={(e) => { datamonitor.pointName = e.target.value;
                                this.getPointEchartData();  
                            }}
                            value={datamonitor.pointName}                            
                        >
                            {datamonitor.pointNameData.map(v => {
                                return <Radio key={v} value={v}>{v}</Radio>;
                            })}
                        </RadioGroup>
                    </div>

                </div>
                <div className="right-monitor-modal">
                    <div className="monitorChart" style={{width:'100%',height:'350px'}}>
                            <div className="datamonitor-chart" ref='chart2' value={datamonitor.pointName} style={{padding:'10px',width:'100%',height:'300px',marginTop:'50px'}}>
                            </div>  
                    </div>
                    <div className="datamonitor-table" style={{width:'100%',height:'282px',padding:'10px',overflowY:'auto'}}>                        
                        <Table
                            //key={Math.random()}
                            className='pointNameData'
                            columns={columns}
                            bordered={true}
                            pagination={false}
                            dataSource={this.state.TableData}
                        />
                    </div>
                </div>
            </div>
        );
    }
    
    componentDidMount() {    
        this.initChart();                      
    }
    componentWillUnmount() {
          
    }
    getPointEchartData() {
        const timeType = 'day';
        let beginTime = '', endTime = '';
        beginTime = getTime(timeType)[0];
        endTime = getTime(timeType)[1];
        console.log(datamonitor.pointName);
        axios.get('/sector/querySensorData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: datamonitor.monitorType,
                monitorPointNumber: datamonitor.pointName,
                beginTime: beginTime,
                endTime: endTime,
            }
        }).then(res => {
            const { code,data } = res.data;
            if (code === 0) {
                this.pointEchartData = data;
                this.timeselectLoading = false;
                console.log(this.pointEchartData.commonDataVOs.length);  
                this.setEchartLine(this.pointEchartData);
                const TableData = data.commonDataVOs.map(v => {
                    return { ...v, key: Math.random()};
                });
                console.log(TableData);
                this.setState({TableData}); 
            } else {
                this.setState({TableData:[]});
                this.pointTableData = [];
                this.isShowPointChart = false;
                this.timeselectLoading = false;
            }
        })
    }
    
    initChart(){
        const chart = echarts.init(this.refs.chart2);
        const option = {
            color: ['#32D184', '#E4B669', '#1890FF'],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0.82)',
                textStyle: {
                    fontSize: 13,

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
                data: []
            },
            yAxis: {
            },
            series: [
                
            ]
        };
        chart.showLoading({color:'#fff',text:'请选择测点!!!',textStyle:{fontSize:20}});
        window.addEventListener('resize', _ => {
            chart.resize();
        });
        chart.clear();
        chart.setOption(option);
        this.chart = chart;
        
    }
    setEchartLine(data) {
        const chart = this.chart;
        const monitorTypeName = this.props.typeValue;

        const totalChangeUnit = getUnit(monitorTypeName).unitA;
        const singleChangeUnit = getUnit(monitorTypeName).unitB;
        const speedChangeUnit = getUnit(monitorTypeName).unitC;
        let time = [], singleChange = [], totalChange = [], speedChange = [];
        console.log(data.commonDataVOs);
        data.commonDataVOs && data.commonDataVOs.forEach(v => {
            time.push(v.createDate);
            singleChange.push(v.singleChange);
            totalChange.push(v.totalChange);
            speedChange.push(v.speedChange);
        });
        chart.hideLoading();
        chart && chart.setOption({
            legend: {
                data: ['累计变化量'+totalChangeUnit, '单次变化量'+singleChangeUnit, '变化速率'+speedChangeUnit],
                //selectedMode: 'single'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { 
                        show: true,
                        title: '数据视图',
                        textColor: 'rgba(0, 0, 0, 0.65)',
                        textareaBorderColor: '#DFDDEC',
                        
                        readOnly: true,
                        lang:['数据视图','关闭','刷新'],
                        optionToContent: function (opt) {
                            let axisData = opt.xAxis[0].data; //坐标数据
                            let series = opt.series; //折线图数据
                            let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
                            let tdBodys = ''; //数据
                            series.forEach(function (item) {
                                //组装表头
                                tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
                            });
                            let table = `<table border="1" style="width:100%;border-collapse:collapse;font-size:14px;text-align:center;border-color:#DFDDEC"><tbody><tr>${tdHeads} </tr>`;
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
                data: time
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
                {
                    name: '累计变化量'+totalChangeUnit,
                    type: 'line',
                    data: totalChange
                },
                {
                    name: '单次变化量'+singleChangeUnit,
                    type: 'line',
                    data: singleChange
                },
                {
                    name: '变化速率'+speedChangeUnit,
                    type: 'line',
                    data: speedChange
                }
            ]
        })
        //setTimeout(() => { chart.resize && chart.resize() }, 16);
    }
}

export default DataMonitorModal;