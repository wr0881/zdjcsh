import { observable, autorun, toJS, action } from 'mobx';
import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';

function sort(ary) {
    ary.sort(function (a, b) {
        return a[0] > b[0] ? 1 : -1;
    });
}

class Monitor {
    /* DataMonitor */
    /* 用户选择数据 */
    @observable selectPoint = {};
    @observable selsectTime = [moment(getTime('day')[0]), moment(getTime('day')[1])];
    /* 接口数据 */
    @observable pointDetailData = {};
    @observable mapEchartData = {};
    /* ui数据 */
    @observable timeselectLoading = false;
    @observable isShowMapChart = false;
    @observable dataContrastVisible = false;

    /* DataConstrast */
    /* 用户选择数据 */
    @observable monitorTypeName = '';
    @observable selectPointName = [];
    @observable timeType = 'week';
    @observable timeTypeSBWY = []; //深部位移选择的时间
    @observable pointdataType = '';
    /* 接口数据 */
    @observable monitorTypeData = [];
    @observable pointNameData = [];
    @observable contrastChartData = [];
    @observable contrastChartDataSBWY = []; //深部位移接口数据
    /* ui数据 */
    @observable getEchartDataLoading = false;

    //布点图测点详细信息
    @action getPointDetailData() {
        const selectPoint = this.selectPoint;
        axios.get('/sector/queryTerminalAndSensor', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: selectPoint.monitorType,
                monitorPointNumber: selectPoint.monitorPointNumber
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                if (data) {
                    this.pointDetailData = data;
                }
            } else {
                this.pointDetailData = {};
                console.log('/sector/queryTerminalAndSensor code: ', code, msg);
            }
        })
    }
    //布点图测点数据信息
    @action getMapEchartData() {
        const selectPoint = this.selectPoint;
        const selsectTime = this.selsectTime;
        axios.get('/sector/querySensorData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: selectPoint.monitorType,
                monitorPointNumber: selectPoint.monitorPointNumber,
                beginTime: selsectTime[0].format('YYYY-MM-DD HH:mm:ss'),
                endTime: selsectTime[1].format('YYYY-MM-DD HH:mm:ss'),
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                // this.setState({ isShowChart: true })
                // this.setEchartLine(data);
                this.mapEchartData = data;
                this.isShowMapChart = true;
                this.timeselectLoading = false;
            } else {
                this.isShowMapChart = false;
                this.timeselectLoading = false;
                message.info(msg);
            }
        })
    }

    //数据对比监测指标
    @action getMonitorTypeData() {
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
        })
    }
    //数据对比监测测点
    @action getPointName() {
        axios.get('/point/queryMonitorPointName', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorTypeName
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.pointNameData = data;
            } else {
                this.pointNameData = [];
                console.log('/point/queryMonitorPointName code: ', code, msg);
            }
        })
    }
    //数据对比echart图表数据
    @action getEchartData() {
        let beginTime = '', endTime = '';
        if (this.monitorTypeName === 26) {
            beginTime = this.timeTypeSBWY[0] ? this.timeTypeSBWY[0].format('YYYY-MM-DD HH:mm:ss') : getTime('day')[0];
            endTime = this.timeTypeSBWY[1] ? this.timeTypeSBWY[1].format('YYYY-MM-DD HH:mm:ss') : getTime('day')[1];
        } else {
            beginTime = getTime(this.timeType)[0];
            endTime = getTime(this.timeType)[1];
        }
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorTypeName,
                pointNames: JSON.stringify(this.selectPointName),
                beginTime: beginTime,
                endTime: endTime,
                dateType: 1
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                console.log(data);
                if (this.monitorTypeName === 26) {
                    this.contrastChartData = data.map;
                } else {
                    //排序
                    const sortData = data.comparisonVO;
                    sortData.forEach(element => {
                        sort(element.measuredData);
                        sort(element.totalChange);
                        sort(element.singleChange);
                        sort(element.speedChange);
                    });
                    this.contrastChartData = sortData;
                }
                this.getEchartDataLoading = false;
            } else {
                this.contrastChartData = [];
                this.getEchartDataLoading = false;
                console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
    }
}

const monitor = new Monitor();

autorun(() => {
    const selectPoint = toJS(monitor.selectPoint);
    if (JSON.stringify(selectPoint) !== '{}') {
        monitor.getPointDetailData();
        monitor.getMapEchartData();
    }
})

export default monitor;