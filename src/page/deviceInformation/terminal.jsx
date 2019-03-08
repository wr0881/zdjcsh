import React, { Component } from 'react';
import { Table } from 'antd';

class Terminal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const columns = [
            {
                title: '传感器编号',
                dataIndex: 'sensorNumber'
            },
            {
                title: '传感器名称',
                dataIndex: 'sensorName'
            },
            {
                title: '传感器型号',
                dataIndex: 'sensorModel'
            },
            {
                title: '传感器量程',
                dataIndex: 'sensorRange'
            },
            {
                title: '传感器精度',
                dataIndex: 'sensorAccuracy'
            },
            {
                title: '传感器状态',
                dataIndex: 'sensorStatus'
            }
        ];
        return (
            <div className="terminal">
                <Table
                    key={Math.random()}
                    columns={columns}
                    dataSource={this.props.dataSource}
                    // pagination={this.state.pagination}
                    // onChange={this.handleTableChange.bind(this)}
                />
            </div>
        );
    }
    componentDidMount(){
        console.log(this.props.dataSource);
    }
}

export default Terminal;