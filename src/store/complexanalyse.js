import { observable, computed, autorun, toJS, action } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';

class Analyse {
    /* 用户选择数据 */
    @observable monitorTypeName = '';
    @observable pointName = '';
    @observable timeType = 'week';
    @observable pointdataType = 'totalChange';
    @observable upperEdge = null;
    @observable lowerEdge = null;
    /* 接口数据 */
    @observable monitorTypeData = [];
    @observable pointData = [];
    @observable chartData = [];
    @observable chartData_boxplot = [];
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
                    this.pointName = data[0];
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
        let beginTime = getTime(this.timeType)[0], endTime = getTime(this.timeType)[1];
        const params = {
            sectorId: pageData.sector.sectorId,
            monitorType: this.monitorTypeName,
            pointNames: this.pointName,
            beginTime: beginTime,
            endTime: endTime,
            dateType: 1
        };
        axios.all([axios.get('/sector/queryComparisonData', { params: { ...params, pointNames: encodeURI(`["${this.pointName}"]`) } }), axios.get('/sector/queryBoxWhisker', { params })])
            .then(axios.spread((one, two) => {
                // 两个请求现在都执行完成
                const { code: code1, msg: msg1, data: data1 } = one.data;
                const { code: code2, msg: msg2, data: data2 } = two.data;
                if (code1 === 0 || code1 === 2) {
                    this.chartData = data1.comparisonVO;
                } else {
                    this.chartData = [];
                    console.log('/sector/queryComparisonData code: ', code1, msg1);
                }

                if (code2 === 0 || code2 === 2) {
                    this.chartData_boxplot = data2.boxWhiskerDatas;
                } else {
                    this.chartData_boxplot = [];
                    console.log('/sector/queryBoxWhisker code: ', code2, msg2);
                }
                this.getEchartDataLoading = false;
            })).catch(err => {
                console.log('/sector/queryComparisonData code: ', err);
                this.getEchartDataLoading = false;
            });
    }
}

const analyse = new Analyse();

autorun(_ => {
    if (analyse.monitorTypeName) {
        analyse.getPointData();
    }
})

export default analyse;