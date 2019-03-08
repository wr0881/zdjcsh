import React, { Component } from 'react';
import iconRinghtImg from 'common/image/向右箭头2.png';
import iconNew from 'common/image/icon_主页_文档.png';

class ProjectNew extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="projecttype">
                <div className="projecttype-title-wrapper">
                    <div className="projecttype-title">
                        <div className='projecttype-title-logo'><img src={iconNew} alt="" /></div>
                        <div className="projecttype-title-text">最新发布</div>
                    </div>
                    <div className="projectalarm-title-type">
                        <div className="projectalarm-more">查看详情</div>
                        <div className="projectalarm-more-icon"><img src={iconRinghtImg} alt="" /></div>
                    </div>
                </div>
                <div className="projecttype-content-wrapper">
                    <div className="projectnew-content">
                        <ProjectNewItem title='我司中标长沙市轨道交通6号线一项目' time='10-31' />
                        <ProjectNewItem title='联合发起成立湘检联 尹小波任执行理事长' time='10-30' />
                        <ProjectNewItem title='“中国奇迹”背后的中大检员' time='10-26' />
                        <ProjectNewItem title='争论之中鉴真章！中大实验室系统研发记' time='10-21' />
                    </div>
                </div>
            </div>
        );
    }
}

function ProjectNewItem(props) {
    return (
        <div className="projectnewitem">
            <div className="projectnewitem-dot"></div>
            <div className="projectnewitem-title">{props.title}</div>
            <div className="projectnewitem-time">{props.time}</div>
        </div>
    );
}

export default ProjectNew;