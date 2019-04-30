import { observable, computed, autorun, toJS, action } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';
import $ from  'jquery';

class dataControl {
    /* 用户选择数据 */
    @observable monitorTypeName = '';
    @observable monitorTypeNameCH = '';
    @observable pointName = [];
    @observable timeType = 'month';
    @observable pointdataType = 'totalChange';
    @observable selectPointName = [];
    /* 接口数据 */
    @observable controlTypeData = [];
    @observable targetData = [];
    @observable controlEchartData = [];
    
    /* 接口状态 */
    @observable getControlTypeDataLoading = false;
    @observable getTargetDataLoading = false;
    @observable getControlEchartDataLoading = false;
    @observable dataEnlargeVisible = false;

    //websocket建立
    
    @action ConnectWithWS(){
        const ws = new WebSocket("ws://10.88.89.73:8180/dataMonitor");
        ws.onopen = function (e){
            console.log("连接上ws服务器了");
        }
        ws.onmessage = function(event){
            console.log("接收服务器发送过来的消息:");
            var data = event.data;
            console.log(data);
        }
        ws.onclose = function (e){
            console.log("ws连接关闭！！！");
        }
        ws.onerror = function(err){
            console.log(err);
        }
    }

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
                console.log(data.monitorType);
                console.log(pageData.sector.sectorId);               
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
    
    //获取指标下测点数据
    
    @action getControlPointName() {
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.controlTypeData.monitorType
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.pointNameData = data;
                console.log(data);
                console.log(pageData.sector.sectorId); 
                 
            } else {
                this.pointNameData = [];
                console.log('/point/queryMonitorPointName code: ', code, msg);
                console.log(this.controlTypeData.monitorType);
                console.log(pageData.sector.sectorId); 
            }
        })
    }

    //获取指标Echart图表
    @action getControlEchartData(){
        axios.get('',{
            params:{

            }
        }).then(res =>{
            const { code, msg , data } = res.data;
            if(code === 0 ){
                this.controlEchartData = data;
            }else{
                this.controlEchartData = [];
                
            }
            this.getControlEchartDataLoading = false;
        }).catch(err => {
            this.getControlEchartDataLoading = false;
        })
    }
}

const datacontrol = new dataControl();

export default datacontrol;