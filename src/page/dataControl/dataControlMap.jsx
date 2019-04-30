import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Checkbox,Radio,Modal } from 'antd';
import echarts from 'echarts';
import { autorun,toJS } from 'mobx';
import monitorpage from 'store/monitorpage.js';
import './control.scss';
import datacontrol from 'store/datacontrol.js';
import enlarge from 'common/image/enlarge.png';
import enlarge2 from 'common/image/enlarge2.png';
import DataControlChart from './dataControlChart';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControlMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return(
            <div className="datacontrol-box">
                <div className="datacontrol-content-wrapper">                    
                    <div className="datacontrol-content">                        
                        <div className="datacontrol-chart-wrapper">
                            <div className="datacontrol-type-wrapper">                           
                                <span className="datacontrol-type-title"> {this.props.value}                           
                                </span>
                                <div className="datacontrol-type-ul" value={this.props.value} onClick={e => {
                                    datacontrol.dataEnlargeVisible = true;
                                    datacontrol.monitorType = this.props.typeValue;
                                    datacontrol.monitorTypeName = this.props.value;
                                    console.log("test11111111");
                                    console.log("断点2222222222");
                                    datacontrol.getControlPointName();
                                    console.log("test22222222");
                                }}   
                                >
                                    <ul>
                                        <li><img className="enlarge" src={enlarge} alt="" /></li>
                                        <li><img className="enlarge2" src={enlarge2} alt="" /></li>
                                    </ul>                                   
                                </div>
                            </div>
                            <div className="datacontrol-chart-wrapper1" style={{
                                //display: monitorpage.isShowMapChart ? 'block' : 'none',
                                height:'300px',
                                marginLeft:'22px'
                            }}>
                                <div className="datacontrol-chart" ref="chart" value={{}} style={{padding:'5px',width:'100%',height:'290px'}}>
                                </div>
                            </div>
                        </div>
                        <div className="datacontrol-table-wrapper">
                            <div className="datacontrol-table">
                                <div className="datacontrol-table-item">
                                    <span>实时值</span>
                                    <span>{this.props.value || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>累计值</span>
                                    <span>{this.props.value || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>单次值</span>
                                    <span>{this.props.typeValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>速率值</span>
                                    <span>{this.props.typeValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>最大值</span>
                                    <span>{datacontrol.maxValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>最小值</span>
                                    <span>{datacontrol.minValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>一级告警</span>
                                    <span>{datacontrol.oneMinValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>二级告警</span>
                                    <span>{datacontrol.twoMinValue || '暂无数据'}</span>
                                </div>
                                <div className="datacontrol-table-item">
                                    <span>三级告警</span>
                                    <span>{datacontrol.threeMinValue || '暂无数据'}</span>
                                </div>
                            </div>
                        </div>
                    </div>                           
                </div>
                <div className="datacontrol-enlarge-content" style={{width:'100%',height:'400px',border:'1px dashed #f00',position:'absolute',marginTop:'-364px',display:'none'}}></div>
                <Modal
                    //title={datacontrol.controlTypeData[index].monitorType}
                    visible={datacontrol.dataEnlargeVisible}
                    destroyOnClose={true}
                    keyboard={true}
                    footer={null}
                    width='1400px'
                    height='600px'
                    bodyStyle={{ padding: '0px' }}
                    onCancel={_ => { datacontrol.dataEnlargeVisible = false }}
                >
                    <DataControlChart value={this.props.value} typeValue={this.props.typeValue}/>
                </Modal>
            </div>
        );
    }
    componentDidMount() {
        this.initChart();
        console.log("断点3333333333");
        //datacontrol.getControlPointName();
        // if(datacontrol.controlTypeData!==[]){
        //     datacontrol.getControlEchartData();
        // }
        //this.setEchartData();        
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
                data:['测点一','测点二','测点三','测点四','测点五']
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
                axisLine: {
                    //symbol: ['none', 'arrow'],
                    onZero: false,
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                },
                axisLabel: {
                    color: '#545454'
                },
                data: ['2019-04-03','2019-04-04','2019-04-05','2019-04-06','2019-04-07','2019-04-08','2019-04-09']
            },
            yAxis: {
                type: 'value',
                // splitLine: {
                //     show: true,
                //     lineStyle: {
                //         type: 'dashed',
                //         color: '#E9E9E9'
                //     }
                // },
                axisLabel: {
                    showMaxLabel: false,
                    color: '#545454'
                },
                axisLine: {
                    //symbol: ['none', 'arrow'],
                    lineStyle: {
                        color: '#BFBFBF'
                    }
                }
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

        chart.setOption(option);

        this.chart = chart;

        window.addEventListener('resize', _ => {
            chart.resize();       
        });
    }
    setEchartData(){
        let legend = [], dataAry = [];
        const { chart } = this.state;
        const contrastChartData = toJS(monitorpage.contrastChartData);
        contrastChartData.forEach(v => {
            legend.push(v.monitorPointNumber);
            dataAry.push({
                name: v.monitorPointNumber,
                type: 'line',
                smooth: true,
                symbol: "none",
                data: v[monitorpage.pointdataType]
            });
        });
        chart && chart.setOption({
            legend:{
                data:legend
            },
            xAxis:{
                data:[]
            },
            yAxis:{

            },
            series:dataAry
        });
        // setTimeout(() => {
        //     chart.resize();
        // }, 100);
    }
}

export default DataControlMap;