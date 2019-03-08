import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import page from 'store/page.js';
import iconRinghtImg from 'common/image/向右箭头.png';
import './typeitem.scss';

// const color = [
//     'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
//     'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
//     'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
//     'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
//     'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
//     'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
//     'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
//     'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
//     'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
//     'linear-gradient(to top, #00c6fb 0%, #005bea 100%)'
// ];

@withRouter
@observer
class TypeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
    static defaultProps = {
        isClick: true,
        data: {
            scId: 0,
            itemName: 'test',
            itemValue: '',
            projectTotalCount: 0,
            projectErrorCount: 0,
        }
    }
    render() {
        const { data } = this.props;
        return (
            <div className={classnames('typeitem')}
                // style={{ backgroundImage: color[Math.floor(Math.random() * 11)] }}
                onClick={this.projectTypeClick.bind(this)}
            >
                <div className="typeitem-logo">
                    <img
                        src={`http://123.207.88.210/${data.itemValue}`}
                        alt=""
                    />
                </div>
                <div className="typeitem-title">{data.itemName}</div>
                <div className="typeitem-icon"><img src={iconRinghtImg} alt="" /></div>
                <div className="typeitem-projectdec">
                    <div>总项目数 {data.projectTotalCount}</div>
                    <div>异常项目数 {data.projectErrorCount}</div>
                </div>
            </div>
        );
    }
    projectTypeClick() {
        const { isClick, data } = this.props;
        if (isClick && data.projectTotalCount) {
            page.projectType = { projectTypeId: data.scId, projectTypeName: data.itemName }
            this.props.history.push('/project/overview');
        }
    }
}

export default TypeItem;