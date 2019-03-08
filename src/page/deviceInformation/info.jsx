import React, { Component } from 'react';
import axios from 'axios';
import { Table, Modal ,message} from 'antd';
import Terminal from './terminal';
import pagedata from 'store/page.js';
import './info.scss';

class DeviveInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //search operate
            deviceName: '',
            deviceType: '',
            //table
            initcurrent: 1,
            initpageSize: 10,
            terminalData: [],
            pagination: {
                current: 1,
                pageSize: 10,
                size: 'midden',
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true
            },
            //modal
            isShow: false,
            selectTerminalNumber: '',
            sensorData: []
        }
    }
    render() {
        const columns = [
            {
                title: '终端编号',
                dataIndex: 'terminalNumber'
            },
            {
                title: '终端名称',
                dataIndex: 'terminalName'
            },
            {
                title: '终端型号',
                dataIndex: 'terminalModel'
            },
            {
                title: '终端状态',
                dataIndex: 'terminalStatus'
            },
            {
                title: '传感器',
                dataIndex: 'deviveStatus',
                render: (text, record, index) => {
                    return (
                        <div className='alarmdetail-table-unconfirmed'
                            onClick={_ => {
                                this.setState({ selectTerminalNumber: record.terminalNumber });
                                this.getTerminalData(record.terminalNumber);
                                // console.log(record);
                            }}
                        >详情</div>
                    )
                },
            },
        ];
        return (
            <div className="deviceInformation">
                <div className="deviceInformation-operate">
                    <div className="deviceInformation-search-name">
                        <span>设备名称</span>
                        <input type="text" onChange={e => {
                            this.setState({ deviceName: e.target.value });
                        }} />
                    </div>
                    <div className="deviceInformation-search-type">
                        <span>设备类型</span>
                        <input type="text" onChange={e => {
                            this.setState({ deviceType: e.target.value });
                        }} />
                    </div>
                    <div className="deviceInformation-search-btn" onClick={this.searchBtnClick.bind(this)}>搜索</div>
                </div>
                <div className="deviceInformation-content">
                    <Table
                        key={Math.random()}
                        columns={columns}
                        dataSource={this.state.terminalData}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange.bind(this)}
                    />
                </div>
                <Modal
                    key={Math.random()}
                    title={<div className='user-info-title'>传感器详情</div>}
                    visible={this.state.isShow}
                    footer={null}
                    width='1200px'
                    onCancel={_ => { this.setState({ isShow: false }) }}
                >
                    <Terminal dataSource={this.state.sensorData}/>
                </Modal>
            </div>
        );
    }
    componentDidMount() {
        const { initcurrent, initpageSize } = this.state;
        this.getDeviceInformation(initcurrent, initpageSize);
    }
    handleTableChange(pagination) {
        const { current, pageSize } = pagination;
        this.setState({ pagination });
        this.getDeviceInformation(current, pageSize);
    }
    getDeviceInformation(current, pageSize) {
        const { deviceName, deviceType } = this.state;
        const params = {
            sectorId: pagedata.sector.sectorId,
            terminalName: deviceName,
            terminalModel: deviceType,
            pageNum: current,
            pageSize: pageSize
        };
        axios.get('/device/queryDeviceInfo', {
            params
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                const formatData = data.terminals.map(v => {
                    return { ...v, key: Math.random() };
                });
                this.setState({ terminalData: formatData });
                this.setState({ pagination: { ...this.state.pagination, total: data.totalPage } });
            } else {
                this.setState({ terminalData: [] });
                console.log('/alarm/queryDeviceInfo code: ', code, msg);
            }
        })
    }
    searchBtnClick() {
        const { initcurrent, initpageSize } = this.state;
        this.setState({
            pagination: {
                current: 1,
                pageSize: 10,
                size: 'midden',
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true
            }
        }, _ => { this.getDeviceInformation(initcurrent, initpageSize) });
    }
    getTerminalData(number) {
        axios.get('/device/querySensorInfos', {
            params: {
                sectorId: pagedata.sector.sectorId,
                terminalNumber: number
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                console.log(data);
                const sensorData = data.map(v => {
                    return { ...v, key: Math.random() };
                })
                this.setState({ sensorData, isShow: true });
            } else {
                this.setState({ sensorData: [] });
                message.error('暂无传感器数据');
                console.log('/device/querySensorInfos code: ', code, msg);
            }
        })
    }
}

export default DeviveInformation;