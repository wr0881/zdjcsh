import { observable,action } from 'mobx';
import axios from 'axios';
import pageData from 'store/page.js';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

class dataMonitor {
    /* 用户选择数据 */
    @observable monitorType = '';
    @observable monitorTypeName = '';
    @observable pointNameData = [];
    @observable pointName = '';
    @observable timeType = 'day';
    @observable pointdataType = 'totalChange';
    @observable selectPointName = [];
    /* 接口数据 */
    @observable monitorTypeData = [];
    @observable targetData = [];
    @observable pointEchartData = {};
    @observable websocketData = {};
    @observable wssensorNumber = '';
    @observable wsmeasuredData = [];
    @observable datamonitorChartData = [];
    @observable dataModalChartData = [];
    @observable pointTableData = [];
    @observable realtimeValue = '';
    @observable totalValue = '';
    @observable singleValue = '';
    @observable speedValue = '';
    /* 接口状态 */
    @observable getMonitorTypeDataLoading = false;
    @observable isShowPointChart = false;
    @observable getTargetDataLoading = false;
    @observable getMonitorEchartDataLoading = false;
    @observable dataEnlargeVisible = false;

    //区间数据监控指标
    @action getMonitorTypeData() {
        this.getMonitorTypeDataLoading = true;
        axios.get('/common/queryMonitorTypeName', {
            params: {
                sectorId: pageData.sector.sectorId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.monitorTypeData = data;              
            } else {
                this.monitorTypeData = [];
                console.log('/common/queryMonitorTypeName code: ', code, msg);
            }
            this.getMonitorTypeDataLoading = false;
        }).catch(err => {
            console.log('/common/queryMonitorTypeName code: ', err);
            this.getMonitorTypeDataLoading = false;
        })
    }
    
    //获取指标下测点   
    @action getMonitorPointName() {
        console.log("指标类型:",this.monitorTypeName,this.monitorType);
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorType
            }
        }).then(res => {
            const { code, data } = res.data;
            if (code === 0) {
                this.pointNameData = data;
                console.log(data);
                //第一项默认被选中
                // if(data.length){
                //     this.pointName = data[0];
                // }
                console.log(this.pointName);
                            
            } else {
                this.pointNameData = [];
                //console.log('/point/queryMonitorPointName code: ', code, msg);
            }
        })
        
    }
    @action establishConnection = () => {
        this.mywebsocket();
    }    
    @action mywebsocket = () => {
        const socket = new SockJs(`http://123.207.88.210:8180/webSocket`)
    
        /**
         * 建立成功的回调函数
         */
        socket.onopen = () => {
            console.log('websocket连接成功！')

        }
    
        /**
         * 服务器有消息返回的回调函数
         */
        socket.onmessage = e => {
            console.log('服务器返回的消息', e.data);
            
        }
    
        /**
         * websocket链接关闭的回调函数
         */
        socket.onclose = () => {
            console.log('websocket连接关闭！')
        }

        socket.onerror = e =>{
            console.log('websocket发生错误:' + e.code)
        }
    
        const stompClient = Stomp.over(socket);
        
        stompClient.connect({}, frame => {
            // 向后台发送数据
            // stompClient.send(`/pushdata/dtudata`,data => {
            //     console.log('向后台发送的数据:',data);
            // })
            console.log('Connected:' + frame);
            // 接受后台返回的消息
            stompClient.subscribe(`/pushdata/dtudata`, data => {
                //console.log(data);
                this.websocketData = data;
                const getData1 = JSON.parse(this.websocketData.body);
                console.log(getData1.data); 
                console.log(getData1.sensorNumber); 
                this.wssensorNumber = getData1.sensorNumber;
                this.wsmeasuredData = getData1.data[0];  
                console.log(getData1.data[0]);        
            })
        })
        
    }
}

const datamonitor = new dataMonitor();

export default datamonitor;