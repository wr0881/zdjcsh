import React, { Component } from 'react';
import { Modal } from 'antd';

class ChangePwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            msg: ''
        }
    }
    render() {
        const { visible } = this.state;
        return (
            <Modal
                key='changepwd'
                title={<div className='user-change-pwd'>修改密码</div>}
                visible={visible}
                footer={null}
                width='341px'
                bodyStyle={{ paddingTop: '0px' }}
                // onOk={this.handleOk}
                onCancel={_ => { this.setState({ visible: false }) }}
            >
                <div className="user-change-pwd-item">
                    <input type="password" placeholder='请输入旧的密码' onChange={e => { this.setState({ oldPwd: e.target.value }) }} />
                </div>
                <div className="user-change-pwd-item">
                    <input type="password" placeholder='请输入新的密码' onChange={e => { this.setState({ newPwd: e.target.value }) }} />
                </div>
                <div className="user-change-pwd-item">
                    <input type="password" placeholder='确认新的密码' onChange={e => { this.setState({ confirmPwd: e.target.value }) }} />
                </div>
                <div className="user-change-pwd-msg">{this.state.msg}</div>
                <div className="user-change-pwd-btn" onClick={this.changePwd.bind(this)}>确认修改</div>
            </Modal>
        );
    }
    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        this.setState({ visible });
    }
    changePwd() {
        const { oldPwd, newPwd, confirmPwd } = this.state;
        this.setState({ msg: '' });
        if (!(oldPwd && newPwd && confirmPwd)) {
            this.setState({ msg: '密码不能为空!' });
            return null;
        };
        if (newPwd !== confirmPwd) {
            this.setState({ msg: '两次密码不一致!' });
            return null;
        };
    }
}

export default ChangePwd;