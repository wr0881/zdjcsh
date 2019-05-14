import { observable,action,toJS } from 'mobx';
import axios from 'axios';
import pageData from 'store/page.js';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';

class dataControl {
    /* 用户选择数据 */
    @observable monitorType = '';
    @observable monitorTypeName = '';
    @observable pointNameData = [];
    @observable pointName = '';
    @observable timeType = 'day';
    @observable pointdataType = 'totalChange';
    @observable selectPointName = [];
    /* 接口数据 */
    @observable controlTypeData = [];
    @observable targetData = [];
    @observable pointEchartData = {};
    @observable datacontrolChartData = [];
    @observable dataModalChartData = [];
    @observable pointTableData = [];
    @observable realtimeValue = '';
    /* 接口状态 */
    @observable getControlTypeDataLoading = false;
    @observable isShowPointChart = false;
    @observable getTargetDataLoading = false;
    @observable getControlEchartDataLoading = false;
    @observable dataEnlargeVisible = false;

    //区间数据监控指标
    @action getControlTypeData() {
        this.getControlTypeDataLoading = true;
        axios.get('/common/queryMonitorTypeName', {
            params: {
                sectorId: pageData.sector.sectorId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.controlTypeData = data;              
            } else {
                this.controlTypeData = [];
                console.log('/common/queryMonitorTypeName code: ', code, msg);
            }
            this.getControlTypeDataLoading = false;
        }).catch(err => {
            console.log('/common/queryMonitorTypeName code: ', err);
            this.getControlTypeDataLoading = false;
        })
    }
    
    //获取指标下测点   
    @action getControlPointName() {
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
    
        // /**
        //  * 建立成功的回调函数
        //  */
        // socket.onopen = () => {
        //     console.log('websocket连接成功！')

        // }
    
        // /**
        //  * 服务器有消息返回的回调函数
        //  */
        // socket.onmessage = e => {
        //     console.log('服务器返回的消息', e.data)
        // }
    
        // /**
        //  * websocket链接关闭的回调函数
        //  */
        // socket.onclose = () => {
        //     console.log('websocket连接关闭！')
        // }
    
        const stompClient = Stomp.over(socket)
        
        stompClient.connect({}, frame => {
            // 向后台发送数据
            // stompClient.send(`/pushdata/dtudata`,data => {
            //     console.log();
            // })
            console.log('Connected:' + frame)
            // 接受后台返回的消息
            stompClient.subscribe(`/pushdata/dtudata`, data => {
                console.log(data);
                const getData1 = JSON.parse(data.body);
                console.log(getData1.data);  
                //this.realtimeValue = getData1.data[0];             
            })
        })
        
    }
}

const datacontrol = new dataControl();

// autorun(() => {
//     datacontrol.getControlPointName();
// })

export default datacontrol;