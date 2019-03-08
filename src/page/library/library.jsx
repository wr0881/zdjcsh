import React, { Component } from 'react';
import { Table, Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import { Post } from 'common/js/util';
import pageData from 'store/page';
import './library.scss';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '文档名称',
                dataIndex: 'name'
            },
            {
                title: '文档类型',
                dataIndex: 'type'
            },
            {
                title: '负责人',
                dataIndex: 'chargeman'
            },
            {
                title: '操作',
                render: function (record) {
                    console.log(record)
                    return <a href={`${window.Psq_ImgUrl}${record.path}`}>下载</a>
                }
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
                                    const { libraryName, libraryType } = values;
                                    this.getLibrary(libraryName, libraryType);
                                }
                            });
                        }}>
                        <Form.Item
                            label="文档名称"
                        >
                            {getFieldDecorator('libraryName', { initialValue: '' })(<Input placeholder='全部' />)}
                        </Form.Item>
                        <Form.Item
                            label="文档类型"
                        >
                            {getFieldDecorator('libraryType', { initialValue: '' })(
                                <Select style={{ width: '174px' }}>
                                    <Select.Option value="">全部</Select.Option>
                                    <Select.Option value="0">pdf</Select.Option>
                                    <Select.Option value="1">txt</Select.Option>
                                    <Select.Option value="2">doc</Select.Option>
                                    <Select.Option value="3">docx</Select.Option>
                                    <Select.Option value="4">xls</Select.Option>
                                    <Select.Option value="5">xlsx</Select.Option>
                                    <Select.Option value="6">ppt</Select.Option>
                                    <Select.Option value="7">pptx</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="library-content">
                    <Table columns={columns} dataSource={this.state.dataSource} pagination={false} />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getLibrary();
    }
    getLibrary(name = '', type = '') {
        axios.post('/document/getDocuments', Post({
            sectorId: pageData.sector.sectorId,
            name,
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