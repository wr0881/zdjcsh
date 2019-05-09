import { observable,action,toJS } from 'mobx';
import axios from 'axios';
import pageData from 'store/page.js';
import { getTime } from 'common/js/util.js';
import echarts from 'echarts';

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
                // if(data.length){
                //     this.pointName = data[0];
                //     console.log("第一个默认选中！");
                //     console.log(this.pointName);
                //     //this.getPointEchartData();                   
                // }             
            } else {
                this.pointNameData = [];
                //console.log('/point/queryMonitorPointName code: ', code, msg);
            }
        })
        
    }
    //获取测点数据信息
    // @action getPointEchartData() {
    //     let beginTime = '', endTime = '';
    //     beginTime = getTime(this.timeType)[0];
    //     endTime = getTime(this.timeType)[1];
    //     console.log(this.pointName);
    //     axios.get('/sector/querySensorData', {
    //         params: {
    //             sectorId: pageData.sector.sectorId,
    //             monitorType: this.monitorType,
    //             monitorPointNumber: this.pointName,
    //             beginTime: beginTime,
    //             endTime: endTime,
    //         }
    //     }).then(res => {
    //         const { code,data } = res.data;
    //         if (code === 0) {
    //             this.pointEchartData = data;
    //             this.timeselectLoading = false;  
    //             console.log(data);
    //             // this.pointTableData = data.commonDataVOs.map(v => {
    //             //     return { ...v, key: Math.random() };
    //             // });
    //             // console.log(this.pointTableData); 
    //         } else {
    //             this.pointTableData = [];
    //             this.isShowPointChart = false;
    //             this.timeselectLoading = false;
    //         }
    //     })
    //     //this.displayChart();
    // }
    //获取指标Echart图表
    @action getControlEchartData(){
        let beginTime = '', endTime = '';
        beginTime = getTime(this.timeType)[0];
        endTime = getTime(this.timeType)[1];
        console.log(this.monitorType);
        console.log(JSON.stringify(this.pointNameData));
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorType,
                pointNames: JSON.stringify(this.pointNameData),
                beginTime: beginTime,
                endTime: endTime,
                dateType: 1
            }
        }).then(res => {
            const { code, data } = res.data;
            if (code === 0 || code === 2) {
                this.datacontrolChartData = data.comparisonVO;
                this.getControlEchartDataLoading = false;
                console.log(data);
                console.log(data.comparisonVO);
            } else {
                this.datacontrolChartData = [];
                this.getControlEchartDataLoading = false;
                //console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
    }
    //获取modal图表数据
    @action getModalEchartData(){
        let beginTime = '', endTime = '';
        beginTime = getTime(this.timeType)[0];
        endTime = getTime(this.timeType)[1];
        console.log(this.monitorType);
        axios.get('/sector/queryComparisonData', {
            params: {
                sectorId: pageData.sector.sectorId,
                monitorType: this.monitorType,
                pointNames: JSON.stringify(this.pointName),
                beginTime: beginTime,
                endTime: endTime,
                dateType: 1
            }
        }).then(res => {
            const { code, data } = res.data;
            if (code === 0 || code === 2) {
                this.dataModalChartData = data.comparisonVO;
                this.getControlEchartDataLoading = false;
                console.log(data);
                console.log(data.comparisonVO);
            } else {
                this.dataModalChartData = [];
                this.getControlEchartDataLoading = false;
                //console.log('/sector/queryComparisonData code: ', code, msg);
            }
        })
    }
    // //图表初始化
    // @action initChart(){
    //     const chart = echarts.init(this.refs.chart);
    //     const option = {
    //         color: ['#32D184', '#E4B669', '#1890FF'],
    //         tooltip: {
    //             trigger: 'axis',
    //             backgroundColor: 'rgba(0,0,0,0.82)',
    //             textStyle: {
    //                 fontSize: 13
    //             },
    //             axisPointer: {
    //                 type: 'cross',
    //                 label: {
    //                     color: '#fff',
    //                     backgroundColor: '#5D3AB3'
    //                 }
    //             }
    //         },
    //         grid: {
    //             top: '30',
    //             bottom: '10',
    //             left: '0',
    //             right: '30',
    //             containLabel: true
    //         },
    //         legend: {
    //             data: [],
    //             //selectedMode: 'single'
    //         },
    //         toolbox: {
    //             show: true,
    //             feature: {
    //                 // dataZoom: {
    //                 //     yAxisIndex: 'none'
    //                 // },
    //                 dataView: { readOnly: false },
    //                 // magicType: { type: ['line', 'bar'] },
    //                 //restore: {},
    //                 saveAsImage: {}
    //             }
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             axisLine: {
    //                 symbol: ['none', 'arrow'],
    //                 onZero: false,
    //                 lineStyle: {
    //                     color: '#BFBFBF'
    //                 }
    //             },
    //             axisLabel: {
    //                 color: '#545454'
    //             },
    //             data: []
    //         },
    //         yAxis: {
    //             type: 'value',
    //             splitLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     type: 'dashed',
    //                     color: '#E9E9E9'
    //                 }
    //             },
    //             axisLabel: {
    //                 showMaxLabel: false,
    //                 color: '#545454'
    //             },
    //             axisLine: {
    //                 symbol: ['none', 'arrow'],
    //                 lineStyle: {
    //                     color: '#BFBFBF'
    //                 }
    //             }
    //         },
    //         series: [

    //         ]
    //     };

    //     chart.setOption(option);

    //     this.chart = chart;

    //     window.addEventListener('resize', _ => {
    //         chart.resize();
    //     });
    // }
    //图表生成
    @action setEchartLine(data) {
        const chart = this.chart;
        // const monitorTypeName = datacontrol.pointName.monitorType;

        // const totalChangeUnit = getUnit(monitorTypeName).unitA;
        // const singleChangeUnit = getUnit(monitorTypeName).unitB;
        // const speedChangeUnit = getUnit(monitorTypeName).unitC;
        let time = [], singleChange = [], totalChange = [], speedChange = [];
        data.commonDataVOs && data.commonDataVOs.forEach(v => {
            time.push(v.createDate);
            singleChange.push(v.singleChange);
            totalChange.push(v.totalChange);
            speedChange.push(v.speedChange);
        });
        chart && chart.setOption({
            legend: {
                data: ['累计变化量', '单次变化量', '变化速率'],
                //selectedMode: 'single'
            },
            xAxis: {
                data: time
            },
            yAxis: {
                
            },
            series: [
                {
                    name: '累计变化量',
                    type: 'line',
                    data: totalChange
                },
                {
                    name: '单次变化量',
                    type: 'line',
                    data: singleChange
                },
                {
                    name: '变化速率',
                    type: 'line',
                    data: speedChange
                }
            ]
        })
        //setTimeout(() => { chart.resize && chart.resize() }, 16);
    }
}

const datacontrol = new dataControl();

// autorun(() => {
//     datacontrol.getControlPointName();
// })

export default datacontrol;