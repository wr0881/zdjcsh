const line = {
    color: ['#32D184', '#E4B669', '#1890FF', '#EA4C48', '#5D3AB3', '#7AAFD5',],
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.82)',
        textStyle: {
            fontSize: 13
        },
        axisPointer: {
            type: 'cross',
            label: {
                color: '#fff',
                backgroundColor: '#5D3AB3'
            }
        }
    },
    dataZoom: [
        {
            type: 'slider',
            realtime: true,
            height: 15,
            start: 70,
            end: 100
        },
        {
            type: 'inside',
        }
    ],
    grid: {
        top: '50',
        bottom: '0',
        left: '30',
        right: '30',
        containLabel: true
    },
    legend: {
        data: []
    },
    xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#BFBFBF'
            }
        },
        axisLabel: {
            color: '#545454'
        }
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
            color: '#545454'
        },
        axisLine: {
            lineStyle: {
                color: '#BFBFBF'
            }
        }
    },
    series: []
};

const Scatter = {
    color: ['#32D184', '#E4B669', '#1890FF', '#EA4C48', '#5D3AB3', '#7AAFD5',],
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.82)',
        textStyle: {
            fontSize: 13
        },
        axisPointer: {
            type: 'cross',
            label: {
                color: '#fff',
                backgroundColor: '#5D3AB3'
            }
        }
    },
    dataZoom: [
        {
            type: 'slider',
            realtime: true,
            height: 15,
            start: 70,
            end: 100
        },
        {
            type: 'inside',
        }
    ],
    grid: {
        top: '50',
        bottom: '0',
        left: '30',
        right: '30',
        containLabel: true
    },
    legend: {
        data: []
    },
    xAxis: {
        type: 'time',
        boundaryGap: false,
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#BFBFBF'
            }
        },
        axisLabel: {
            color: '#545454'
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: '#E9E9E9'
            }
        },
        axisLabel: {
            color: '#545454'
        },
        axisLine: {
            lineStyle: {
                color: '#BFBFBF'
            }
        }
    },
    series: []
};

export { line, Scatter };