import { observable } from 'mobx';
import axios from 'axios';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';

class Monitor {
    @observable selectPoint = {};
    @observable pointDetailData = {};
    @observable dataContrastVisible = false;

    /* DataConstrast */
    /* 用户选择数据 */
    @observable monitorTypeName = '';
    @observable selectPointName = [];
    @observable timeType = 'week';
    @observable pointdataType = '';
    /* 接口数据 */
    @observable monitorTypeData = [];
    @observable pointNameData = [];
    @observable contrastChartData = [];
    @observable contrastChartData1 = [];

    getMonitorTypeData() {
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
    getPointName() {
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
    getEchartData() {
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorTypeName,
                pointNames: JSON.stringify(this.selectPointName),
                beginTime: getTime(this.timeType)[0],
                endTime: getTime(this.timeType)[1],
                dateType: 1
            }            
        }).then(res => {
            const { code, msg, data } = res.data;
            console.log(data);
            console.log(pageData.sector.sectorId);
            console.log(this.monitorTypeName);
            console.log(JSON.stringify(this.selectPointName));
            console.log(getTime(this.timeType)[0]);
            console.log(getTime(this.timeType)[1]);
            if (code === 0 || code === 2) {
                this.contrastChartData = data.comparisonVO;
                // this.setState({ echartData: data.comparisonVO }, this.setEchartData.bind(this, pointdataType));
                this.contrastChartData1 = data.map;
            } else {
                this.contrastChartData = [];
                this.contrastChartData1 = [];
                console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
        
    }
}

const monitor = new Monitor();

export default monitor;