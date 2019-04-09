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
    @observable pointName = [];
    @observable timeType = 'month';
    @observable pointdataType = 'totalChange';
    /* 接口数据 */
    @observable controlTypeData = [];
    /* 接口状态 */
    @observable getControlTypeDataLoading = false;

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
                $('.ant-checkbox-input').click(function () {
                    if($(this).attr('checked','true')){
                        console.log('选中:',$(this).val());
                    }else{
                        
                    }
                                        
                });
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
        
    }
}

const datacontrol = new dataControl();

autorun(_ => {
    if (datacontrol.monitorTypeName) {
        datacontrol.getTargetData();
    }
})

export default datacontrol;