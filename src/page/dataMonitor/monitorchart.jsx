import React, { Component } from 'react';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import { toJS } from 'mobx';
import {Checkbox,Button, Modal,Empty} from 'antd';
import './monitor.scss';
import axios from 'axios';
import pageData from 'store/page.js';
import { getTime,getUnit } from 'common/js/util.js';
import datamonitor from 'store/datamonitor.js';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

const CheckboxGroup = Checkbox.Group;

@observer
class MonitorChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointNameData:[],
            wsmeasuredData:[],
            dataPointVisible:false
        };
    }
    showModal = () =>{
        this.setState({
            dataPointVisible:true
        })
    }
    handleOk = e =>{
        this.setState({
            dataPointVisible:false
        })
    }
    handleCancel = e =>{
        this.setState({
            dataPointVisible:false
        })
    }
    render() {      
        return(
            <div className="monitorchart">
                <div className="dataMonitor-operate-title"style={{marginTop:'-26px',marginLeft:'90%',cursor:'pointer'}} onClick={this.showModal}>选择测点</div>
                <div className="datamonitor-chart" ref={this.props.typeValue} style={{padding:'5px',width:'100%',height:'320px',float:'left'}}>
                </div>
                <Modal
                    visible={this.state.dataPointVisible}
                    destroyOnClose={true}
                    keyboard={true}
                    footer={null}
                    width='700px'
                    height='540px'
                    bodyStyle={{ padding: '0px' }}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div style={{height:'540px'}}>                    
                        <div className="dataMonitor-operate-select" style={{float:'left',marginTop:'50px',marginLeft:'75px',marginRight:'75px',height:'400px',overflowY:'auto'}}>
                            <CheckboxGroup
                                key={Math.random()}
                                defaultValue={this.pointName}
                                onChange={v => { this.pointName = v }}
                            >
                                {this.state.pointNameData}
                            </CheckboxGroup>
                        </div>
                        <div className="dataMonitor-operate-button">
                            <Button
                                style={{ float:'left',marginLeft:'310px', marginTop:'40px',width: '80px', height: '24px' }}
                                type='primary'
                                onClick={() => {
                                    this.initChart();
                                    this.getMonitorEchartData();
                                    this.handleOk();
                                }}
                            >确认</Button>
                        </div>                    
                    </div>
                </Modal>
            </div>
        );
    }
    // handleResize = () =>{
    //     this.getMonitorEchartData();
    //     this.setEchartData();
    // }
    componentDidMount() {       
        this.getMonitorPointName();
        // this.mywebsocket();
        this.initChart();
        // this.timer = setInterval(() => this.handleResize(),600000);
    } 
    componentWillUnmount() {
        // this.timer && clearTimeout(this.timer);//清除定时器  
    }
    getMonitorPointName() {
        const monitorType = this.props.typeValue;
        // console.log("指标类型:",monitorType, monitorTypeName);
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: monitorType
            }
        }).then(res => {
            const { code, data } = res.data;
            if (code === 0) {
                this.pointNameData = data;
                if(data.length){
                    this.pointName = data.slice(0,5);
                    const pointNameData = data.map(v => {
                        return <Checkbox key={v} value={v}>{v}</Checkbox>;
                    });
                    this.setState({pointNameData});
                }                
                //console.log(data);
                this.getMonitorEchartData();              
            } else {
                this.pointNameData = [];
                //console.log('/point/queryMonitorPointName code: ', code, msg);
            }
        })
    }
    getMonitorEchartData(){
        const chart = this.chart;
        const timeType = 'day';
        const monitorType = this.props.typeValue;       
        let beginTime = '', endTime = '';
        beginTime = getTime(timeType)[0];
        endTime = getTime(timeType)[1];
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: monitorType,
                pointNames: JSON.stringify(this.pointName),
                beginTime: beginTime,
                endTime: endTime,
                dateType: 1
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.datamonitorChartData = data.comparisonVO;
                console.log(data.comparisonVO);
                this.mywebsocket();
                this.setEchartData();
            } else {
                this.datamonitorChartData = [];
                chart.hideLoading();
                chart.showLoading({color:'#fff',text:msg,textStyle:{fontSize:20}});
                //console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
    }
    mywebsocket(){
        const socket = new SockJs(`http://123.207.88.210:8180/webSocket`)               
        const stompClient = Stomp.over(socket);        
        stompClient.connect({}, frame => {
            console.log('Connected:' + frame);
            // 接受后台返回的消息
            stompClient.subscribe(`/pushdata/dtudata`, data => {
                //console.log(data);
                let wsmeasuredData = [];
                this.websocketData = data;
                const getwsbodyData = JSON.parse(this.websocketData.body);
                this.wssensorNumber = getwsbodyData.sensorNumber;  
                wsmeasuredData = [getwsbodyData.createDate,getwsbodyData.data[0]];
                this.setState(wsmeasuredData);
                this.wsmeasuredData = wsmeasuredData;
                console.log(this.wssensorNumber);
                console.log(this.wsmeasuredData);                
                for(let i=0,l=this.datamonitorChartData.length; i<l; i++){
                    console.log(this.datamonitorChartData[i].sensorNumber);
                    console.log(this.datamonitorChartData[i].measuredData);
                    console.log(this.wssensorNumber);
                    console.log(this.wsmeasuredData);
                    //接收的数据中sensorNumber和echart图表数据中的sensorNumber相等时，在echart图表的measuredData加上接收的数据wsmeasuredData
                    if(this.wssensorNumber === this.datamonitorChartData[i].sensorNumber){
                        console.log("test1111");
                        this.datamonitorChartData[i].measuredData.push(this.wsmeasuredData);
                        console.log(this.datamonitorChartData[i].measuredData); 
                        this.setEchartData();                       
                    }
                }
            })
        })
        // socket.onopen = () => {
        //     console.log('websocket连接成功！')
        // }
        // socket.onmessage = e => {
        //     console.log('服务器返回的消息', e.data);
        // }
        // socket.onclose = () => {
        //     console.log('websocket连接关闭！')
        // }
        // socket.onerror = e =>{
        //     console.log('websocket发生错误:' + e.code)
        // } 
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
                //type:'scorll',
                data:[],
                padding:[0,60],
            },
            toolbox: {
                feature: {
                    dataView: { 
                        show: true,
                        title: '数据视图',
                        textColor: 'rgba(0, 0, 0, 0.65)',
                        textareaBorderColor: '#DFDDEC',
                        buttonColor: '#5D3AB3',
                        readOnly: true,
                        lang:['数据视图','关闭','刷新'],
                        optionToContent: function (opt) {
                            let axisData = opt.series[0].data; //坐标数据
                            //console.log(axisData);
                            let series = opt.series; //折线图数据
                            console.log(opt.series);
                            let tdHeads = '<td  style="padding: 0 10px;background:#fafafa;height:30px">测试时间</td>'; //表头
                            let tdBodys = ''; //数据
                            series.forEach(function (item) {
                                //组装表头
                                tdHeads += `<td style="padding: 0 10px;background:#fafafa;height:30px">${item.name}</td>`;
                            });
                            let table = `<table border="1" style="width:100%;border-collapse:collapse;font-size:14px;text-align:center;border:1px solid #e8e8e8"><tbody><tr>${tdHeads} </tr>`;
                            console.log(axisData.length);
                            for (let i = 0, l = axisData.length; i < l; i++) {
                                for (let j = 0; j < series.length; j++) {
                                    //组装表数据
                                    tdBodys += `<td style="height:30px">${ series[j].data[i][1]}</td>`;
                                }
                                table += `<tr style="height:24px"><td style="padding: 0 10px;height:30px">${axisData[i][0]}</td>${tdBodys}</tr>`;
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
                type: 'time',
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
        chart.showLoading({color:'#5D3AB3',text:'图表正在加载！！！'});
        chart.clear();
        chart.setOption(option);
        this.chart = chart;
        window.addEventListener('resize', _ => {
            chart.resize();
        });
    }
    setEchartData(){
        const chart = this.chart;        
        let legend = [], dataAry = [],sensorNumber = [];
        // const wsmeasuredData = toJS(this.wsmeasuredData);
        // console.log(wsmeasuredData);
        const datamonitorChartData = toJS(this.datamonitorChartData);
        console.log(datamonitorChartData);        
        const monitorTypeName = this.props.typeValue;
        const totalChangeUnit = getUnit(monitorTypeName).unitA;
        const pointdataType = 'measuredData';
        datamonitorChartData.forEach(v => {
            legend.push(v.monitorPointNumber+'('+totalChangeUnit+')');
            dataAry.push({
                name: v.monitorPointNumber+'('+totalChangeUnit+')',
                key: v.sensorNumber,
                type: 'line',
                smooth: true,
                symbol: "none",
                data: v[pointdataType]
            });            
        });
        console.log(dataAry);
        chart.hideLoading();        
        chart.setOption({
            legend:{
                //type:'scorll',
                data:legend
            },
            xAxis:{
                data:[]
            },
            yAxis:{

            },
            series:dataAry
        });
        const time = new Date();
        console.log(this.props.value+"生成图表！！！",time);
    }
    
}

export default MonitorChart;