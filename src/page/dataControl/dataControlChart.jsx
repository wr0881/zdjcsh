import React, { Component } from 'react';
let echarts = require('echarts');

let colors = ['#f27573', '#69757a', '#ffd553', '#51b8ae', '#ff8d69', '#a48b82', '#dde779', '#7d89cd', '#cacaca', '#51d1e1', '#f06695', '#fff179', '#8ca8f9', '#c9b185', '#9e5c81'];

class DataControlChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { id, xAxis, yAxis } = this.props;
    let myChart = echarts.init(document.getElementById(id));
    myChart.setOption({
      color: this.props.color ? this.props.color : colors,
      title: {
        left: "center",
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        show: this.props.legendShow ? true : false,
        textStyle: {
          color: this.props.legendTextStyle ? this.props.legendTextStyle : '#000',
          fontSize: 12
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: this.props.noPercent ? '' : '{b0}<br />{a0}: {c0}%<br />{a1}: {c1}%'
      },
      grid: {
        left: '20%',
        right: '20%',
        bottom: '3%',
        top:'30%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
        "axisLabel": {
          interval: this.props.intervalNum ? this.props.intervalNum : 0,
          rotate: 7
        },
        axisLine: {
          lineStyle: {
            color: this.props.lineColor ? this.props.lineColor : '#000',
          }
        },
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        boundaryGap: [0, 0.1],
        axisLabel: {
          formatter: this.props.noPercent ? '{value}' : '{value} %',
        },
        axisLine: {
          lineStyle: {
            color: this.props.lineColor ? this.props.lineColor : '#000',
          }
        },
        precision: 0,
        // min: 1,
        max: this.props.maxSize && this.props.maxSize <= 10 ? 10 : null,
      },
      series: yAxis
    })
  }

  render() {
    return (
      <div id={this.props.id} className="charts">

      </div>
    );
  }

}

export default DataControlChart;