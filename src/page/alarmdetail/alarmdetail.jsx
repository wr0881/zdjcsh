import React, { Component } from 'react';
import axios from 'axios';
import { Table, Form, Modal, message, Input, Select, Button } from 'antd';
import { Post } from 'common/js/util.js';
import pagedata from 'store/page.js';
import './alarmdetail.scss';

class DeviveInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //search operate
            monitorPointNumber: '',
            alarmStatus: '',
            alarmType: '',
            alarmLevel: '',
            //table
            initcurrent: 1,
            initpageSize: 10,
            alarmDetalData: [],
            pagination: {
                current: 1,
                pageSize: 10,
                size: 'midden',
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true
            }
        }
    }
    render() {
        const columns = [
            // {
            //     title: '所属项目',
            //     dataIndex: 'projectName'
            // },
            {
                title: '所属区间',
                dataIndex: 'sectorName'
            },
            {
                title: '所在测点',
                dataIndex: 'monitorPointNumber'
            },
            {
                title: '采集终端编号',
                dataIndex: 'terminalNumber'
            },
            {
                title: '传感器编号',
                dataIndex: 'sensorNumber'
            },
            {
                title: '告警类型',
                dataIndex: 'alarmType'

            },
            {
                title: '告警等级',
                dataIndex: 'alarmLevel'

            },
            {
                title: '告警内容',
                dataIndex: 'alarmContext'

            },
            {
                title: '告警时间',
                dataIndex: 'createTime'

            },
            {
                title: '告警状态',
                dataIndex: 'alarmStatus'

            },
            {
                title: '操作',
                render: (text, record, index) => {
                    return text.alarmStatus === '已确认' ?
                        <div className='alarmdetail-table-confirmed'>已确认</div>
                        :
                        <div className='alarmdetail-table-unconfirmed' onClick={this.confirmAlarm.bind(this, text.alarmId)}>未确认</div>
                }
            },
        ]
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="alarmdetail">
                <div className="alarmdetail-seach">
                    <Form
                        layout="inline"
                        onSubmit={e => {
                            e.preventDefault();
                            const { current, pageSize } = this.state.pagination;
                            this.props.form.validateFieldsAndScroll((err, values) => {
                                if (!err) {
                                    this.setState({ ...values }, this.getAlarmDetail.bind(this, current, pageSize));
                                }
                            });
                        }}>
                        <Form.Item
                            label="测点名称"
                        >
                            {getFieldDecorator('monitorPointNumber', { initialValue: '' })(<Input placeholder='全部' />)}
                        </Form.Item>
                        <Form.Item
                            label="告警状态"
                        >
                            {getFieldDecorator('alarmStatus', { initialValue: '' })(
                                <Select style={{ width: '174px' }}>
                                    <Select.Option value="">全部</Select.Option>
                                    <Select.Option value="未确认">未确认</Select.Option>
                                    <Select.Option value="已确认">已确认</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="告警类型"
                        >
                            {getFieldDecorator('alarmType', { initialValue: '' })(
                                <Select style={{ width: '174px' }}>
                                    <Select.Option value="">全部</Select.Option>
                                    <Select.Option value="设备类告警">设备类告警</Select.Option>
                                    <Select.Option value="数据类告警">数据类告警</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="告警等级"
                        >
                            {getFieldDecorator('alarmLevel', { initialValue: '' })(
                                <Select style={{ width: '174px' }}>
                                    <Select.Option value="">全部</Select.Option>
                                    <Select.Option value="一">等级一</Select.Option>
                                    <Select.Option value="二">等级二</Select.Option>
                                    <Select.Option value="三">等级三</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="alarmdetail-content">
                    <Table
                        columns={columns}
                        dataSource={this.state.alarmDetalData}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange.bind(this)}
                        onRow={record => {
                            return {
                                onClick: e => { this.alarmMessage(record) }
                            };
                        }}
                    />
                </div>
            </div>
        );
    }
    componentDidMount() {
        const { initcurrent, initpageSize } = this.state;
        this.getAlarmDetail(initcurrent, initpageSize);
    }
    handleTableChange(pagination) {
        const { current, pageSize } = pagination;
        this.setState({ pagination });
        this.getAlarmDetail(current, pageSize);
    }
    getAlarmDetail(current, pageSize) {
        const { monitorPointNumber, alarmType, alarmStatus, alarmLevel } = this.state;
        const params = {
            sectorId: pagedata.sector.sectorId,
            monitorPointNumber,
            alarmType,
            alarmStatus,
            alarmLevel,
            current: current,
            pageSize: pageSize
        };
        axios.post('/alarm/querySearchAlarmInfo', Post(params)).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                const formatData = data.AlarmInfo.map(v => {
                    return { ...v, key: Math.random() };
                });
                this.setState({ alarmDetalData: formatData });
                this.setState({ pagination: { ...this.state.pagination, total: data.total } });
            } else {
                this.setState({ alarmDetalData: [] });
                console.log('/alarm/querySearchAlarmInfo code:', code, msg);
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
        }, _ => { this.getAlarmDetail(initcurrent, initpageSize) });
    }
    confirmAlarm(alarmId) {
        axios.get('/alarm/confirmAlarmInfo', {
            params: {
                alarmId
            }
        }).then(res => {
            const { code, msg } = res.data;
            const { current, pageSize } = this.state.pagination;
            if (code === 0) {
                this.getAlarmDetail(current, pageSize);
            } else {
                message.error('告警确认失败');
                console.log('/alarm/queryDeviceInfo code: ', code, msg);
            }
        })
    }
    alarmMessage(v) {
        // {
        //     alarmContext: "jk;"
        //     alarmId: 7
        //     alarmLevel: "等级一"
        //     alarmStatus: "已确认"
        //     alarmType: "设备类告警"
        //     createTime: "2018-12-06 16:00:03"
        //     key: 0.8447834068288782
        //     monitorPointNumber: "CD20181129001"
        //     projectName: "首个项目"
        //     sectorName: "首个项目-区间1"
        //     sensorNumber: "CGQ20181129001"
        //     terminalNumber: "20181129001"
        // }
        Modal.info({
            title: '告警通知',
            content: (
                <div>
                    <div>【中大检测】尊敬的客户：</div>
                    <div style={{ textIndent: '2em' }}>{`您的项目于${v.createTime}监测到水平位移数据超过阈值，`}</div>
                    <div style={{ textIndent: '2em' }}>{`项目名称：${v.projectName}，`}</div>
                    <div style={{ textIndent: '2em' }}>{`采集终端：${v.terminalNumber}，`}</div>
                    <div style={{ textIndent: '2em' }}>{`传感器编号： ${v.sensorNumber}，`}</div>
                    <div style={{ textIndent: '2em' }}>{`告警等级：${v.alarmLevel}。`}</div>
                    <div style={{ textIndent: '2em' }}>详情请登陆中大检测在线监测平台查看。谢谢 ！</div>
                </div>
            )
        });
    }
}

export default Form.create()(DeviveInformation);