import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Checkbox,Radio } from 'antd';
import echarts from 'echarts';
import { autorun } from 'mobx';
import monitorpage from 'store/monitorpage.js';
import './control.scss';
import datacontrol from 'store/datacontrol.js';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControlChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return(
            
            <div className="control-modal-content">
                <div className="left-control-modal" style={{backgroundColor:'#FAFBFF'}}>
                    <div className="dataAnalyse-operate-title">{datacontrol.monitorTypeName}</div>
                    <div className="dataAnalyse-operate-select">
                        <CheckboxGroup
                            key={Math.random()}
                            defaultValue={datacontrol.selectPointName}
                            onChange={v => { datacontrol.selectPointName = v }
                            
                        }
                        >
                            {datacontrol.pointNameData.map(v => {
                                return <Checkbox key={v} value={v}>{v}</Checkbox>;
                            })}
                        </CheckboxGroup>
                    </div>
                </div>
                <div className="right-control-modal">
                    <div className="datacontrol-chart" ref='chart' style={{padding:'10px',width:'100%',height:'300px',marginTop:'50px'}}>
                    </div>
                    <div className="datacontrol-table" style={{width:'100%',height:'220px',marginTop:'20px',padding:'10px'}}>
                        <table style={{width:'100%',height:'100%',border:'1px solid #DFDDEC'}}>
                            <tbody style={{border:'1px solid #DFDDEC'}}>
                                <tr>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC',backgroundColor:'#F4F7FC'}}></td>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC'}}></td>
                                </tr>
                                <tr>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC',backgroundColor:'#F4F7FC'}}></td>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC'}}></td>
                                </tr>
                                <tr>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC',backgroundColor:'#F4F7FC'}}></td>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC'}}></td>
                                </tr>
                                <tr>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC',backgroundColor:'#F4F7FC'}}></td>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC'}}></td>
                                </tr>
                                <tr>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC',backgroundColor:'#F4F7FC'}}></td>
                                    <td style={{width:'50%',border:'1px solid #DFDDEC'}}></td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
    componentDidMount() {       
        this.initChart();
    }
    componentWillUnmount() {
        monitorpage.monitorTypeName = null;
        monitorpage.selectPointName = null;
        monitorpage.pointNameData = [];
        monitorpage.contrastChartData = [];
    }
    initChart(){
        const myChart = echarts.init(this.refs.chart);
        let option = null;
        option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['测点一','测点二','测点三','测点四','测点五']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
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
                data: ['2019-04-03','2019-04-04','2019-04-05','2019-04-06','2019-04-07','2019-04-08','2019-04-09']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'测点一',
                    type:'line',
                    stack: '累计变化量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'测点二',
                    type:'line',
                    stack: '累计变化量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'测点三',
                    type:'line',
                    stack: '累计变化量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'测点四',
                    type:'line',
                    stack: '累计变化量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'测点五',
                    type:'line',
                    stack: '累计变化量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        ;
        if (option) {
            myChart.setOption(option, true);
        }
    }
    setEchartLine(data) {
        const chart = this.chart;

        let time = [], singleChange = [], totalChange = [], speedChange = [];
        data.commonDataVOs && data.commonDataVOs.forEach(v => {
            time.push(v.createDate);
            singleChange.push(v.singleChange);
            totalChange.push(v.totalChange);
            speedChange.push(v.speedChange);
        });
        chart && chart.setOption({
            legend: {
                data: datacontrol.monitorTypeName,
                selectedMode: 'single'
            },
            xAxis: {
                data: time
            },
            yAxis: {
                
            },
            series: [
                
            ]
        })
        setTimeout(() => { chart.resize && chart.resize() }, 16);
    }
}

export default DataControlChart;