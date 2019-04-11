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
    /* 接口数据 */
    @observable controlTypeData = [];
    @observable targetData = [];
    /* 接口状态 */
    @observable getControlTypeDataLoading = false;
    @observable getTargetDataLoading = false;

    //数据监控指标
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
                console.log(data);
                console.log('111111');
                $(".dataControl-content").hide();
                console.log('222222');
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
    
    @action getTargetData(){
        this.getTargetDataLoading = true;
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorTypeName
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.targetData = data;
                console.log('指标下测点:',data);
            } else {
                this.targetData = [];
                console.log('/point/queryMonitorPointName code: ', code, msg);
            }
            this.getTargetDataLoading = false;
        }).catch(err => {
            console.log('/point/queryMonitorPointName code: ', err);
            this.getTargetDataLoading = false;
        })
    }
}

const datacontrol = new dataControl();

autorun(_ => {
    if (datacontrol.monitorTypeName) {
        datacontrol.getTargetData();
    }
})

export default datacontrol;