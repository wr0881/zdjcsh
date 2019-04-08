import { observable, computed, autorun, toJS, action } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';

class Analyse {
    /* 用户选择数据 */
    @observable monitorTypeName = '';
    @observable pointName = [];
    @observable timeType = 'month';
    @observable pointdataType = 'totalChange';
    /* 接口数据 */
    @observable monitorTypeData = [];
    @observable pointData = [];
    @observable chartData = [];
    /* 接口状态 */
    @observable getMonitorTypeDataLoading = false;
    @observable getPointDataLoading = false;
    @observable getEchartDataLoading = false;

    //监测指标
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
                //赋第一个值
                if (data.length) {
                    this.monitorTypeName = data[0].monitorType;
                }
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
    //测点
    @action getPointData() {
        this.getPointDataLoading = true;
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorTypeName
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.pointData = data;
                //赋第一个值,加载第一个测点数据
                if (data.length) {
                    this.pointName = [data[0]];
                    this.getEchartData();
                }
            } else {
                this.pointData = [];
                console.log('/point/queryMonitorPointName code: ', code, msg);
            }
            this.getPointDataLoading = false;
        }).catch(err => {
            console.log('/point/queryMonitorPointName code: ', err);
            this.getPointDataLoading = false;
        })
    }
    //echart数据
    @action getEchartData() {
        this.getEchartDataLoading = true;
        let beginTime = '', endTime = '';
        beginTime = getTime(this.timeType)[0];
        endTime = getTime(this.timeType)[1];
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorTypeName,
                pointNames: JSON.stringify(this.pointName),
                beginTime: beginTime,
                endTime: endTime,
                dateType: 1
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.chartData = data.comparisonVO;
                console.log(data)
            } else {
                this.chartData = [];
                console.log('/sector/queryComparisonData code: ', code, msg);
            }
            this.getEchartDataLoading = false;
        }).catch(err => {
            console.log('/sector/queryComparisonData code: ', err);
            this.getEchartDataLoading = false;
        })
    }
}

const analyse = new Analyse();

autorun(_ => {
    if (analyse.monitorTypeName) {
        analyse.getPointData();
    }
})

export default analyse;