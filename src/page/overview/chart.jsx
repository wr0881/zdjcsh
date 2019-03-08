import React, { Component } from 'react';
import echarts from 'echarts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    render() {
        return (
            <div ref='overviewChart' className='overview-chart'>chart</div>
        );
    }
    componentDidMount() {
        this.initChart();
    }
    initChart() {
        const chart = echarts.init(this.refs.overviewChart);
        const seriesLabel = {
            normal: {
                show: true,
                textBorderColor: '#333',
                textBorderWidth: 2
            }
        }

        const option = {
            color: ['#FE9E84', '#FF9A3A', '#EB4E4A'],
            grid: {
                top: '30',
                bottom: '0',
                left: '0',
                right: '0',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['一级告警', '二级告警', '三级告警']
            },
            // grid: {
            //     left: 100
            // },
            xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#8E92A3'
                },
                data: this.getFormatData().point,
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#E9E9E9'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: '一级告警',
                    type: 'bar',
                    data: this.getFormatData().level1,
                    label: seriesLabel
                },
                {
                    name: '二级告警',
                    type: 'bar',
                    label: seriesLabel,
                    data: this.getFormatData().level2,
                },
                {
                    name: '三级告警',
                    type: 'bar',
                    label: seriesLabel,
                    data: this.getFormatData().level3,
                }
            ]
        };

        chart.setOption(option);

        window.addEventListener('resize', _ => {
            chart.resize();
        });
    }
    getFormatData() {
        const { data } = this.props;
        let point = [], level1 = [], level2 = [], level3 = [];
        data.forEach(v => {
            point.push(v.monitorTypeName);
            level1.push(v.level1);
            level2.push(v.level2);
            level3.push(v.level3);
        });
        return { point, level1, level2, level3 };
    }
}

export default Chart;