import React, { Component } from 'react';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Checkbox, Radio } from 'antd';
import DataContrastChart_NM from './dataContrastChart/dataContrastChart_NM';
import DataContrastChart_SLYL from './dataContrastChart/dataContrastChart_SLYL';
import DataContrastChart_GTGC from './dataContrastChart/dataContrastChart_GTGC';
import DataContrastChart_KSW from './dataContrastChart/dataContrastChart_KSW';
import DataContrastChart_YL from './dataContrastChart/dataContrastChart_YL';
import DataContrastChart_SPWY from './dataContrastChart/dataContrastChart_SPWY';
import DataContrastChart_GPS from './dataContrastChart/dataContrastChart_GPS';
import DataContrastChart_NBWY from './dataContrastChart/dataContrastChart_NBWY';
import monitorpage from 'store/monitorpage.js';

const CheckboxGroup = Checkbox.Group;
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
        console.log(monitorTypeName)
        return (
            <div className="dataAnalyse-wrapper">
                {monitorTypeName === 28 ?
                    <DataContrastChart_SPWY /> :
                    monitorTypeName === 'SLYL' ?
                        <DataContrastChart_SLYL /> :
                        monitorTypeName === 'GTGC' ?
                            <DataContrastChart_GTGC /> :
                            monitorTypeName === 'KSW' ?
                                <DataContrastChart_KSW /> :
                                monitorTypeName === 'YL' ?
                                    <DataContrastChart_YL /> :
                                    monitorTypeName === 52 ?
                                        <DataContrastChart_GPS /> :
                                        monitorTypeName === 66 ?
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
                        <span className="dataAnalyse-operate-btn1">重置</span>
                        <span className="dataAnalyse-operate-btn2"
                            onClick={() => { monitorpage.getEchartData() }}
                        >对比</span>
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
}

export default DataContrast;