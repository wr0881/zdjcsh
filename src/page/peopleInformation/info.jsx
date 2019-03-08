import React, { Component } from 'react';
import { Table, message, Radio } from 'antd';
import axios from 'axios';
import pagedata from 'store/page.js';
import './info.scss';

const columns = [
    {
        title: '单位名称',
        dataIndex: 'memberCompany'
    },
    {
        title: '联系人',
        dataIndex: 'memberName'
    },
    {
        title: '电话',
        dataIndex: 'memberPhone'
    },
    {
        title: '邮箱',
        dataIndex: 'memberEmail'
    },
    {
        title: '职位',
        dataIndex: 'sectorRole'
    },
];

class PeopleInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitInfo: null,
            unit: '建设单位'
        }
    }
    render() {
        const { unitInfo, unit } = this.state;
        const members = unitInfo && unitInfo[unit] && unitInfo[unit].members.map(v => { return { ...v, key: Math.random() } });
        return (
            <div className="peopleInformation">
                <div className="peopleInformation-table-wrapper">
                    <Radio.Group
                        defaultValue={unit}
                        buttonStyle="solid"
                        onChange={e => { this.setState({ unit: e.target.value }) }}
                    >
                        <Radio.Button value="建设单位">建设单位</Radio.Button>
                        <Radio.Button value="施工单位">施工单位</Radio.Button>
                        <Radio.Button value="监测单位">监测单位</Radio.Button>
                        <Radio.Button value="监理单位">监理单位</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="peopleInformation-table-wrapper">
                    <Table columns={columns} dataSource={members} pagination={false} />
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getPeopleInformation();
    }
    getPeopleInformation() {
        axios.get('/sector/querySectorMember', {
            params: {
                sectorId: pagedata.sector.sectorId
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                this.setState({ unitInfo: data });
                if (code === 2) {
                    message.error(msg);
                }
            } else {
                console.log('/sector/querySectorMember: ', code, msg);
            };
        })
    }
}

export default PeopleInformation;