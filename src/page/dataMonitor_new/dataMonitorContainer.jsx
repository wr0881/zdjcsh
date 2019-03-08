import React, { Component } from 'react';
import { Modal } from 'antd';
//import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PointMap from './pointMap';
import PointDetail_NM from './pointDetail/pointDetail_NM';
import PointDetail_SLYL from './pointDetail/pointDetail_SLYL';
import PointDetail_GTGC from './pointDetail/pointDetail_GTGC';
import PointDetail_KSW from './pointDetail/pointDetail_KSW';
import PointDetail_YL from './pointDetail/pointDetail_YL';
import PointDetail_SPWY from './pointDetail/pointDetail_SPWY';
import PointDetail_SBWY from './pointDetail/pointDetail_SBWY';
import PointDetail_GPS from './pointDetail/pointDetail_GPS';
import PointDetail_NBWY from './pointDetail/pointDetail_NBWY';
import DataContrast from './dataContrast';
import monitorpage from 'store/monitorpage.js';
import './monitor.scss';

@observer
class DataMonitorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const monitorTypeName = monitorpage.selectPoint.monitorTypeName;
        return (
            <div className='dataMonitor-wrapper'>
                <PointMap />
                {monitorTypeName === '渗流压力' ?
                    <PointDetail_SLYL /> :
                    monitorTypeName === '干滩高程' ?
                        <PointDetail_GTGC /> :
                        monitorTypeName === '库水位' ?
                            <PointDetail_KSW /> :
                            monitorTypeName === '雨量' ?
                                <PointDetail_YL /> :
                                monitorTypeName === '水平位移' ?
                                    <PointDetail_SPWY /> :
                                    monitorTypeName === '砼支撑轴力' ?
                                        <PointDetail_SBWY /> :
                                        monitorTypeName === 'GPS位移' ?
                                            <PointDetail_GPS /> :
                                            monitorTypeName === '内部位移' ?
                                                <PointDetail_NBWY /> :
                                                <PointDetail_NM />
                }
                {/* <PointDetail /> */}
                <Modal
                    key='dataAnalyse'
                    title={<div className='user-change-pwd'>数据对比</div>}
                    visible={monitorpage.dataContrastVisible}
                    destroyOnClose={true}
                    footer={null}
                    width='1200px'
                    bodyStyle={{ padding: '0px' }}
                    // onOk={this.handleOk}
                    onCancel={_ => { monitorpage.dataContrastVisible = false }}
                >
                    <DataContrast />
                </Modal>
            </div>
        );
    }
    componentWillMount() {
        monitorpage.selectPoint = {};
    }
}

export default DataMonitorContainer;