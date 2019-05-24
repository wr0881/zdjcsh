import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Checkbox, Radio, Button } from 'antd';
import DataContrastChart_NM from './dataContrastChart/dataContrastChart_NM';
import DataContrastChart_SLYL from './dataContrastChart/dataContrastChart_SLYL';
import DataContrastChart_GTGC from './dataContrastChart/dataContrastChart_GTGC';
import DataContrastChart_KSW from './dataContrastChart/dataContrastChart_KSW';
import DataContrastChart_YL from './dataContrastChart/dataContrastChart_YL';
import DataContrastChart_SPWY from './dataContrastChart/dataContrastChart_SPWY';
import DataContrastChart_SBWY from './dataContrastChart/dataContrastChart_SBWY';
import DataContrastChart_GPS from './dataContrastChart/dataContrastChart_GPS';
import DataContrastChart_NBWY from './dataContrastChart/dataContrastChart_NBWY';
import monitorpage from 'store/monitorpage.js';

const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@observer
class DataContrast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
        }
    }
    render() {
        const monitorTypeName = toJS(monitorpage.monitorTypeName);
        return (
            <div className="dataAnalyse-wrapper">
                {
                    monitorTypeName === 55 ?
                        <DataContrastChart_SLYL /> :
                        monitorTypeName === 56 ?
                            <DataContrastChart_GTGC /> :
                            monitorTypeName === 57 ?
                                <DataContrastChart_KSW /> :
                                monitorTypeName === 59 ?
                                    <DataContrastChart_YL /> :
                                    monitorTypeName === 21 ?
                                        <DataContrastChart_SPWY /> :
                                        monitorTypeName == 52 ?
                                            <DataContrastChart_GPS /> :
                                            // monitorTypeName === 26 ?
                                            //     <DataContrastChart_SBWY /> :
                                            monitorTypeName === 66 || monitorTypeName === 26 || monitorTypeName === 80 ?
                                                <DataContrastChart_NBWY /> :
                                                <DataContrastChart_NM />
                }
                <div className="dataAnalyse-operate-wrapper">
                    <div className="dataAnalyse-operate-title">选择指标:</div>
                    <div className="dataAnalyse-operate-content">
                        <RadioGroup
                            key={Math.random()}
                            onChange={e => { monitorpage.monitorTypeName = e.target.value }}
                            value={monitorpage.monitorTypeName}
                        >
                            {monitorpage.monitorTypeData.map(v => {
                                return <Radio key={v.monitorType} value={v.monitorType}>{v.monitorTypeName}</Radio>;
                            })}
                        </RadioGroup>
                    </div>
                    <div className="dataAnalyse-operate-title">选择测点:</div>
                    <div className="dataAnalyse-operate-select">
                        <CheckboxGroup
                            key={Math.random()}
                            defaultValue={monitorpage.selectPointName}
                            onChange={v => { monitorpage.selectPointName = v }}
                        >
                            {monitorpage.pointNameData.map(v => {
                                return <Checkbox key={v} value={v}>{v}</Checkbox>;
                            })}
                        </CheckboxGroup>
                    </div>
                    <div className="dataAnalyse-operate-btn">
                        <Button
                            style={{ width: '100px', height: '35px' }}
                            onClick={() => {
                                monitorpage.monitorTypeName = null;
                                monitorpage.selectPointName = null;
                                monitorpage.pointNameData = [];
                                monitorpage.contrastChartData = [];
                            }}
                        >重置</Button>
                        <Button
                            style={{ marginLeft: '30px', width: '100px', height: '35px' }}
                            type='primary'
                            loading={monitorpage.getEchartDataLoading}
                            onClick={() => {
                                monitorpage.getEchartDataLoading = true;
                                monitorpage.getEchartData();
                            }}
                        >对比</Button>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        monitorpage.getMonitorTypeData();

        autorun(() => {
            if (monitorpage.monitorTypeName) {
                monitorpage.getPointName();
            }
        })
    }
    componentWillUnmount() {
        monitorpage.monitorTypeName = null;
        monitorpage.selectPointName = null;
        monitorpage.pointNameData = [];
    }
}

export default DataContrast;