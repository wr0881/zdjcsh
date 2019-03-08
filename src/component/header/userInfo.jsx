import React, { Component } from 'react';
import { Modal } from 'antd';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    render() {
        const { visible } = this.state;
        return (
            <Modal
                key='userinfo'
                title={<div className='user-info-title'>我的资料</div>}
                visible={visible}
                footer={null}
                width='341px'
                // onOk={this.handleOk}
                onCancel={_ => { this.setState({ visible: false }) }}
            >
                <div className='user-info-item'>
                    <span>用户名: </span>
                    <span>kx</span>
                </div>
                <div className='user-info-item'>
                    <span>姓名: </span>
                    <span>匡欣</span>
                </div>
                <div className='user-info-item'>
                    <span>电话: </span>
                    <span>17436547655</span>
                </div>
                <div className='user-info-item'>
                    <span>邮箱: </span>
                    <span>gaochengwp@outlook.com</span>
                </div>
                <div className='user-info-item'>
                    <span>公司: </span>
                    <span>湖南柒蚁教育科技有限公司</span>
                </div>
            </Modal>
        );
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        this.setState({ visible });
    }
}

export default UserInfo;