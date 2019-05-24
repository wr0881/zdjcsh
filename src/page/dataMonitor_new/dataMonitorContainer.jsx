import React, { Component } from 'react';
import { Modal, Badge, Icon } from 'antd';
import { observer } from 'mobx-react';
import PointMap from './pointMap';
import PointDetail_NM from './pointDetail/pointDetail_NM';
import PointDetail_SLYL from './pointDetail/pointDetail_SLYL';
import PointDetail_GTGC from './pointDetail/pointDetail_GTGC';
import PointDetail_KSW from './pointDetail/pointDetail_KSW';
import PointDetail_YL from './pointDetail/pointDetail_YL';
import PointDetail_SPWY from './pointDetail/pointDetail_SPWY';
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
        const monitorType = monitorpage.selectPoint.monitorType;
        return (
            <div className='dataMonitor-wrapper'>
                <div className='pointmap-explain'>
                    <Badge color="green" text="正常" />
                    <Badge color="yellow" text="一级告警" />
                    <Badge color="orange" text="二级告警" />
                    <Badge color="red" text="三级告警" />
                    <Badge color="gray" text="监测完毕" />
                    <span style={{ color: '#faad14' }}>
                        <Icon type="exclamation-circle" />
                        <span style={{ marginLeft: '8px', color: 'rgba(0, 0, 0, 0.65)' }}>点击下图圆点查看测点数据信息!</span>
                    </span>
                </div>
                <PointMap />
                {monitorTypeName === '' ?
                    <PointDetail_SLYL /> :
                    monitorTypeName === '' ?
                        <PointDetail_GTGC /> :
                        monitorTypeName === '' ?
                            <PointDetail_KSW /> :
                            monitorTypeName === '降雨量' ?
                                <PointDetail_YL /> :
                                // monitorTypeName === '水平位移' ?
                                //     <PointDetail_SPWY /> :
                                // monitorTypeName === '深部位移' ?
                                //     <PointDetail_SBWY /> :
                                monitorType === 52 ?
                                    <PointDetail_GPS /> :
                                    monitorType === 66 || monitorType === 26 || monitorType === 80 ?
                                        <PointDetail_NBWY /> :
                                        <PointDetail_NM />
                }
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

        // this.socket = setInterval(_=>{monitorpage.getMapEchartData()},1000);
    }
    // componentWillUnmount(){
    //     clearInterval(this.socket);
    // }
}

export default DataMonitorContainer;