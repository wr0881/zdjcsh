import React, { Component } from 'react';
import axios from 'axios';
import { Tree } from 'antd';
import Video from 'component/Video/Video';
import './videomonitor.scss';
const { TreeNode } = Tree;

class VideoMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedKeys: [],
            srcs: []
        }
    }
    render() {
        const { checkedKeys, srcs } = this.state;
        return (
            <div className='videomonitor'>
                <div className="videomonitor-operate">
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        onCheck={(checkedKeys) => {
                            const value = checkedKeys.filter(v => v.indexOf('://') > 0);
                            this.setState({ checkedKeys: value });
                        }}
                    >
                        <TreeNode title="监测中" key="0">
                            {srcs.map(v => {
                                return <TreeNode title={v.videoName} key={v.liveVideoUrl + v.monitorPointNumber} />
                            })}
                            {console.log(srcs)}
                        </TreeNode>
                        <TreeNode title="监测完1" key="1">
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:1935/live/out" />
                            <TreeNode title="自家测试" key="rtmp://202.69.69.180:443/webcast/bshdlive-pc" />
                            <TreeNode title="自家测试" key="rtmp://202.69.69.180:443/webcast/bshdlive-pc" />
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:8899/live/test10" />
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:8899/live/test11" />
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:8899/live/test12" />
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:8899/live/test13" />
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:8899/live/test14" />
                            <TreeNode title="自家测试" key="rtmp://10.88.89.170:8899/live/test16" />
                        </TreeNode>
                        <TreeNode title="监测完2" key="2">
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
    componentDidMount() {
        axios.get('/video/queryVideoBySectorId', { params: { sectorId: 19 } }).then(res => {
            const { code, msg, data } = res.data;
            this.setState({ srcs: data });
        })
    }
}

export default VideoMonitor;