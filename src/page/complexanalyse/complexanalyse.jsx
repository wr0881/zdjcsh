import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Checkbox, Radio, Button } from 'antd';
import Chart from './chart';
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
                    </div>

                    {analyse.chartData.length ?
                        <div className="complexanalyse-chart">
                            <div className='complexanalyse-chartitem-wrapper'>
                                <Chart charttype='line' />
                                <Chart charttype='scatter' />
                                <Chart charttype='scatter' />
                                <Chart charttype='line' />
                            </div>
                        </div>
                        : '没数据'
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
                        <CheckboxGroup
                            key={Math.random()}
                            defaultValue={analyse.pointName}
                            onChange={v => { analyse.pointName = v }}
                        >
                            {analyse.pointData.map(v => {
                                return <Checkbox key={v} value={v}>{v}</Checkbox>;
                            })}
                        </CheckboxGroup>
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