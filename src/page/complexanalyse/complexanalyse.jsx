import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Checkbox, Radio, Button, InputNumber } from 'antd';
import Chart from './chart';
import Status from 'component/Status/status';
import analyse from 'store/complexanalyse';
import './complexanalyse.scss';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

@observer
class ComplexAnalyse extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="complexanalyse">
                <div className="complexanalyse-chart-wrapper">
                    <div className="complexanalyse-datatype">
                        <RadioGroup
                            key={Math.random()}
                            size='small'
                            defaultValue={analyse.timeType}
                            onChange={e => {
                                analyse.timeType = e.target.value;
                                analyse.getEchartData();
                            }}
                        >
                            <RadioButton value="全部" disabled>全部</RadioButton>
                            <RadioButton value="week">一周</RadioButton>
                            <RadioButton value="month">一月</RadioButton>
                            <RadioButton value="year" disabled>一年</RadioButton>
                        </RadioGroup>
                        <RadioGroup
                            key={Math.random()}
                            size='small'
                            defaultValue={analyse.pointdataType}
                            onChange={e => {
                                analyse.pointdataType = e.target.value;
                            }}
                        >
                            <RadioButton value="totalChange">累计变化量</RadioButton>
                            <RadioButton value="singleChange">单次变化量</RadioButton>
                            <RadioButton value="speedChange">变化速率</RadioButton>
                        </RadioGroup>
                        <div style={{ float: 'right' }}>
                            <span>上边缘: </span>
                            <InputNumber size='small' defaultValue={analyse.upperEdge} onChange={v => { analyse.upperEdge = v; }} />
                            <span>下边缘: </span>
                            <InputNumber size='small' defaultValue={analyse.lowerEdge} onChange={v => { analyse.lowerEdge = v; }} />
                        </div>
                    </div>

                    {analyse.getEchartDataLoading ?
                        <div className="complexanalyse-chart">
                            <Status loading text='加载中...' />
                        </div>
                        :
                        <div className="complexanalyse-chart">
                            {analyse.chartData.length ?
                                <div className='complexanalyse-chartitem-wrapper'>
                                    <div className='complexanalyse-chartitem'>
                                        <div className='complexanalyse-chartitem-title'>
                                            <div></div>
                                            <span>原数据</span>
                                        </div>
                                        <div className='complexanalyse-chartitem-chart'><Chart charttype='line' /></div>
                                    </div>
                                    <div className='complexanalyse-chartitem'>
                                        <div className='complexanalyse-chartitem-title'>
                                            <div></div>
                                            <span>离散分析图</span>
                                        </div>
                                        <div className='complexanalyse-chartitem-chart'><Chart charttype='scatter' /></div>
                                    </div>
                                    {analyse.chartData_boxplot.length ?
                                        <div className='complexanalyse-chartitem'>
                                            <div className='complexanalyse-chartitem-title'>
                                                <div></div>
                                                <span>箱型分析</span>
                                            </div>
                                            <div className='complexanalyse-chartitem-chart'><Chart charttype='boxplot' /></div>
                                        </div>
                                        :
                                        <div className='complexanalyse-chartitem'>
                                            <div className='complexanalyse-chartitem-title'>
                                                <div></div>
                                                <span>箱型分析</span>
                                            </div>
                                            <div className='complexanalyse-chartitem-chart'><Status text='暂无分析' /></div>
                                        </div>
                                    }
                                    <div className='complexanalyse-chartitem'>
                                        <div className='complexanalyse-chartitem-title'>
                                            <div></div>
                                            <span>趋势分析图</span>
                                        </div>
                                        <div className='complexanalyse-chartitem-chart'><Chart charttype='line' /></div>
                                    </div>
                                </div>
                                : <Status text='暂无数据' />
                            }
                        </div>
                    }

                </div>
                <div className="complexanalyse-operate-wrapper">
                    <div>选择指标</div>
                    <div className="complexanalyse-operate-monitortype">
                        <RadioGroup
                            key={Math.random()}
                            onChange={e => { analyse.monitorTypeName = e.target.value }}
                            value={analyse.monitorTypeName}
                        >
                            {analyse.monitorTypeData.map(v => {
                                return <Radio key={v.monitorType} value={v.monitorType}>{v.monitorTypeName}</Radio>;
                            })}
                        </RadioGroup>
                    </div>
                    <div>选择测点</div>
                    <div className="complexanalyse-operate-point">
                        <RadioGroup
                            key={Math.random()}
                            defaultValue={analyse.pointName}
                            onChange={v => { analyse.pointName = v.target.value; }}
                        >
                            {analyse.pointData.map(v => {
                                return <Radio key={v} value={v}>{v}</Radio>;
                            })}
                        </RadioGroup>
                    </div>
                    <div className="complexanalyse-operate-btn">
                        <Button
                            style={{ width: '100px', height: '35px' }}
                            onClick={() => {

                            }}
                        >重置</Button>
                        <Button
                            style={{ marginLeft: '30px', width: '100px', height: '35px' }}
                            type='primary'
                            loading={analyse.getEchartDataLoading}
                            onClick={() => {
                                analyse.getEchartDataLoading = true;
                                analyse.getEchartData();
                            }}
                        >对比</Button>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getMonitorTypeData();
    }
    getMonitorTypeData() {
        analyse.getMonitorTypeData();
    }
}

export default ComplexAnalyse;