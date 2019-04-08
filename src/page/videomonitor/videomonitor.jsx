import React, { Component } from 'react';
import { Tree } from 'antd';
import Video from 'component/Video/Video';
import './videomonitor.scss';
const { TreeNode } = Tree;

class VideoMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedKeys: []
        }
    }
    render() {
        const { checkedKeys } = this.state;
        return (
            <div className='videomonitor'>
                <div className="videomonitor-operate">
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        onCheck={(checkedKeys) => {
                            const value = checkedKeys.filter(v => v.indexOf('://') > 0);
                            console.log(value)
                            this.setState({ checkedKeys: value });
                        }}
                    >
                        <TreeNode title="项目一" key="1">
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:1935/live/out" />
                            <TreeNode title="自家测试" key="rtmp://202.69.69.180:443/webcast/bshdlive-pc" />
                            <TreeNode title="自家测试" key="rtmp://202.69.69.180:443/webcast/bshdlive-pc" />
                        </TreeNode>
                        <TreeNode title="项目二" key="2">
                            <TreeNode title="不知名的某处" key="rtmp://rtmp.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b" />
                        </TreeNode>
                    </Tree>
                </div>
                <div className="videomonitor-video">
                    {checkedKeys.map(src => {
                        return <div key={src}><Video src={src} /></div>
                    })}
                </div>
            </div>
        );
    }
}

export default VideoMonitor;