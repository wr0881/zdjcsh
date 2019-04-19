import React, { Component } from 'react';
//import { toJS } from 'mobx';
//import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
//import PointMap from './pointMap';
import monitorpage from 'store/monitorpage.js';
import { getUnit } from 'common/js/util.js';
import './control.scss';
import { Modal } from 'antd';
import $ from 'jquery';
import datacontrol from 'store/datacontrol.js';
//import Card from 'component/Card/Card';
import enlarge from 'common/image/enlarge.png';
import enlarge2 from 'common/image/enlarge2.png';
import DataControlChart from './dataControlChart';
//import DataControlChart from './dataControlChart';

//const RadioButton = Radio.Button;
//const RadioGroup = Radio.Group;
//const CheckboxGroup = Checkbox.Group;


@observer
class DataControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
            checked: false,
            monitorTypeName:[]
        };
    }

    render() { 

        return (
            <div className='datacontrol-wrapper'>
                <div className='datacontrol-top'></div>
                <ul className="datacontrol-ul">
                {datacontrol.controlTypeData && datacontrol.controlTypeData.map((v,index)=>{
                    return (
                    <li className="datacontrol-ul-li" key={index} value={v.monitorTypeName} style={{listStyle:'none', marginTop:'20px'}}>
                        <div className="datacontrol-box">
                            <div className="datacontrol-content-wrapper">                    
                                <div className="datacontrol-content">                        
                                    <div className="datacontrol-chart-wrapper">
                                        <div className="datacontrol-type-wrapper">                           
                                            <span style={{float:'left',width:'100px',height:'30px',marginLeft:'20px', marginTop:'10px',fontSize:'16px',color:'#121521'}}>{v.monitorTypeName}                            
                                            </span>
                                            <div className="datacontrol-type-ul" value={v.monitorTypeName} onClick={e => {
                                                datacontrol.dataEnlargeVisible = true;
                                                monitorpage.monitorTypeName = e.target.value
                                            }}>
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
                                            <div className="datacontrol-chart" ref={"chart"+index} style={{padding:'5px',width:'100%',height:'290px'}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="datacontrol-table-wrapper">
                                        <div className="datacontrol-table">
                                            <div className="datacontrol-table-item">
                                                <span>实时值</span>
                                                <span>{datacontrol.controlTypeData[index].monitorType || '暂无数据'}</span>
                                            </div>
                                            <div className="datacontrol-table-item">
                                                <span>累计值</span>
                                                <span>{v.monitorTypeName || '暂无数据'}</span>
                                            </div>
                                            <div className="datacontrol-table-item">
                                                <span>单次值</span>
                                                <span>{datacontrol.singleValue || '暂无数据'}</span>
                                            </div>
                                            <div className="datacontrol-table-item">
                                                <span>速率值</span>
                                                <span>{datacontrol.speedValue || '暂无数据'}</span>
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
                        </div>
                        
                    </li>)
                })}
                </ul>
                <Modal
                    key='enlarge'
                    ref="modal"
                    //title={<div className='user-change-pwd' style={{height:"0px"}}></div>}
                    visible={datacontrol.dataEnlargeVisible}
                    destroyOnClose={true}
                    keyboard={true}
                    footer={null}
                    width='1400px'
                    height='600px'
                    bodyStyle={{ padding: '0px' }}
                    onCancel={_ => { datacontrol.dataEnlargeVisible = false }}
                    //getContainer={document.getElementsByClassName("datacontrol-ul-li")}
                >
                    <DataControlChart />
                </Modal>                                       
            </div>            
        );
    }
    componentDidMount() {
        //this.initChart();
        //datacontrol.ConnectWithWS();
        datacontrol.getControlTypeData(); 
        for(var i=0;i<=datacontrol.controlTypeData.length;i++){
            const myChart = echarts.init(this.refs.chart);
            let option = null;
            option = {
                title: {
                    text: '指标'
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
    }
    componentWillUnmount() {
        this.destroyAutorun && this.destroyAutorun();
    }
   
    // initChart() {
    //     for(var i=0;i<=datacontrol.controlTypeData.length;i++){
    //     const chart = echarts.init(this.refs.chart);

    //     const option = {
    //         color: ['#32D184', '#E4B669', '#1890FF'],
    //         tooltip: {
    //             trigger: 'axis',
    //             backgroundColor: 'rgba(0,0,0,0.82)',
    //             textStyle: {
    //                 fontSize: 13
    //             },
    //             axisPointer: {
    //                 type: 'cross',
    //                 label: {
    //                     color: '#fff',
    //                     backgroundColor: '#5D3AB3'
    //                 }
    //             }
    //         },
    //         grid: {
    //             top: '30',
    //             bottom: '10',
    //             left: '0',
    //             right: '30',
    //             containLabel: true
    //         },
    //         legend: {
    //             data: [],
    //             selectedMode: 'single'
    //         },
    //         toolbox: {
    //             show: true,
    //             right: '10px',
    //             feature: {
    //                 //dataZoom: {
    //                 //    yAxisIndex: 'none'
    //                 //},
    //                 dataView: { 
    //                     show: true,
    //                     title: '数据视图',
    //                     textColor: 'rgba(0, 0, 0, 0.65)',
    //                     textareaBorderColor: '#DFDDEC',
                        
    //                     readOnly: true,
    //                     lang:['数据视图','关闭','刷新'],
    //                     optionToContent: function (opt) {
    //                         let axisData = opt.xAxis[0].data; //坐标数据
    //                         let series = opt.series; //折线图数据
    //                         let tdHeads = '<td  style="padding: 0 10px">时间</td>'; //表头
    //                         let tdBodys = ''; //数据
    //                         series.forEach(function (item) {
    //                             //组装表头
    //                             tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
    //                         });
    //                         let table = `<table border="1" style="width:100%;border-collapse:collapse;font-size:14px;text-align:center;border-color:#DFDDEC"><tbody><tr>${tdHeads} </tr>`;
    //                         for (let i = 0, l = axisData.length; i < l; i++) {
    //                             for (let j = 0; j < series.length; j++) {
    //                                 //组装表数据
    //                                 tdBodys += `<td>${ series[j].data[i]}</td>`;
    //                             }
    //                             table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
    //                             tdBodys = '';
    //                         }
    //                         table += '</tbody></table>';
    //                         return table;
    //                     }
    //                 },
    //                 //magicType: { type: ['line', 'bar'] },
    //                 //restore: {},
    //                 saveAsImage: {
    //                     title: '保存图片'
    //                 }
    //             }
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             axisLine: {
    //                 symbol: ['none', 'arrow'],
    //                 onZero: false,
    //                 lineStyle: {
    //                     color: '#BFBFBF'
    //                 }
    //             },
    //             axisLabel: {
    //                 color: '#545454'
    //             },
    //             data: []
    //         },
    //         yAxis: {
    //             type: 'value',
    //             splitLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     type: 'dashed',
    //                     color: '#E9E9E9'
    //                 }
    //             },
    //             axisLabel: {
    //                 showMaxLabel: false,
    //                 color: '#545454'
    //             },
    //             axisLine: {
    //                 symbol: ['none', 'arrow'],
    //                 lineStyle: {
    //                     color: '#BFBFBF'
    //                 }
    //             }
    //         },
    //         series: [

    //         ]
    //     };
    //     chart.setOption(option);
    //     this.chart = chart;
    //     window.addEventListener('resize', _ => {
    //         chart.resize();
    //     });
    //     }
    // }
    // setEchartLine(data) {
    //     const chart = this.chart;
    //     const monitorTypeName = monitorpage.selectPoint.monitorTypeName;

    //     const totalChangeUnit = getUnit(monitorTypeName).unitA;
    //     const singleChangeUnit = getUnit(monitorTypeName).unitB;
    //     const speedChangeUnit = getUnit(monitorTypeName).unitC;

    //     let time = [], singleChange = [], totalChange = [], speedChange = [];
    //     data.commonDataVOs && data.commonDataVOs.forEach(v => {
    //         time.push(v.createDate);
    //         singleChange.push(v.singleChange);
    //         totalChange.push(v.totalChange);
    //         speedChange.push(v.speedChange);
    //     });
    //     chart && chart.setOption({
    //         legend: {
    //             data: ['累计变化量' + totalChangeUnit, '单次变化量' + singleChangeUnit, '变化速率' + speedChangeUnit],
    //             selectedMode: 'single'
    //         },
    //         xAxis: {
    //             data: time
    //         },
    //         yAxis: {
    //             name: `单位: ${singleChangeUnit}`
    //         },
    //         series: [
    //             {
    //                 name: '累计变化量' + totalChangeUnit,
    //                 type: 'line',
    //                 data: totalChange
    //             },
    //             {
    //                 name: '单次变化量' + singleChangeUnit,
    //                 type: 'line',
    //                 data: singleChange
    //             },
    //             {
    //                 name: '变化速率' + speedChangeUnit,
    //                 type: 'line',
    //                 data: speedChange
    //             }
    //         ]
    //     })
    //     setTimeout(() => { chart.resize && chart.resize() }, 16);
    // }
}

export default DataControl;