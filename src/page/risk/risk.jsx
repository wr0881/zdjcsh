import React, { Component } from 'react';
import { Table, Modal, Form, Input, Select, Button, Row, Col } from 'antd';
import axios from 'axios';
import { Post } from 'common/js/util';
import pageData from 'store/page';
import './risk.scss';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '作业活动/场所',
                dataIndex: 'jobActivity'
            },
            {
                title: '危险源',
                dataIndex: 'dangerousSource'
            },
            {
                title: '导致风险',
                dataIndex: 'riskResult'
            },
            {
                title: '作业条件危险性评价',
                dataIndex: 'raowcL'
            },
        ];
        return (
            <div className="library">
                <div className="library-seach">
                    <Form
                        layout="inline"
                        onSubmit={e => {
                            e.preventDefault();
                            this.props.form.validateFieldsAndScroll((err, values) => {
                                if (!err) {
                                    const { jobActivity, libraryType } = values;
                                    this.getLibrary(jobActivity, libraryType);
                                }
                            });
                        }}>
                        <Form.Item
                            label="作业活动/场所"
                        >
                            {getFieldDecorator('jobActivity', { initialValue: '' })(<Input placeholder='全部' />)}
                        </Form.Item>
                        <Form.Item
                            label="危险类型"
                        >
                            {getFieldDecorator('libraryType', { initialValue: '' })(
                                <Select style={{ width: '174px' }}>
                                    <Select.Option value="">暂无</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={_ => { this.setState({ visible: true }) }}>上传</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="library-content">
                    <Table columns={columns} dataSource={this.state.dataSource} pagination={false} />
                </div>
                <Modal
                    visible={this.state.visible}
                    title="危险源上传"
                    okText="上传"
                    onCancel={_ => { this.setState({ visible: false }) }}
                    onOk={_ => {
                        this.props.form.validateFieldsAndScroll((err, values) => {
                            if (!err) {
                                console.log(values);
                            }
                        });
                    }}
                >
                    <Form>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    label="作业活动"
                                >
                                    {getFieldDecorator('jobActivity', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="危险源"
                                >
                                    {getFieldDecorator('dangerousSource', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="导致风险"
                                >
                                    {getFieldDecorator('riskResult', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="时态"
                                >
                                    {getFieldDecorator('tense', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="状态"
                                >
                                    {getFieldDecorator('status', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="控制措施"
                                >
                                    {getFieldDecorator('control!Measures', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="重要危险源"
                                >
                                    {getFieldDecorator('significantRisk', { initialValue: '1' })(
                                        <Select>
                                            <Select.Option value="1">是</Select.Option>
                                            <Select.Option value="0">否</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="作业条件危险性评价(L)"
                                >
                                    {getFieldDecorator('raowcL', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="作业条件危险性评价(E)"
                                >
                                    {getFieldDecorator('raowcE', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="作业条件危险性评价(C)"
                                >
                                    {getFieldDecorator('raowcC', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                                <Form.Item
                                    label="作业条件危险性评价(D)"
                                >
                                    {getFieldDecorator('raowcD', { initialValue: '' })(<Input placeholder='请输入值' />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        );
    }
    componentDidMount() {
        this.getLibrary();
    }
    getLibrary(jobActivity = '', type = '') {
        axios.post('/hazards/getHazards', Post({
            sectorId: pageData.sector.sectorId,
            jobActivity,
            type
        })).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                const dataSource = data.map(v => {
                    return { ...v, key: Math.random() }
                });
                this.setState({ dataSource });
            }
        });
    }
}

export default Form.create()(Library);