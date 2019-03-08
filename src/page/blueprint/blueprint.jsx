import React, { Component } from 'react';
import axios from 'axios';
import { Tabs } from 'antd';
import Viewer from 'viewerjs';
import pagedata from 'store/page.js';
import './blueprint.scss';
import 'viewerjs/dist/viewer.css';

class BluePrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: []
        }
    }
    render() {
        const { imageData } = this.state;
        return (
            <div className="blueprint">
                <Tabs defaultActiveKey="1">
                    {imageData.map(v => {
                        return (
                            <Tabs.TabPane tab={v.imageType} key={v.imageType}>
                                <div className="blueprint-img-wrapper"
                                    onMouseEnter={e => {
                                        this.viewerInit && this.viewerInit.destroy();
                                        this.viewerInit = new Viewer(e.currentTarget);
                                    }}
                                >
                                    {v.images.map(v1 => {
                                        return (
                                            <div className='blueprint-img' key={v1.imageUrl}>
                                                <img src={`${window.Psq_ImgUrl}${v1.imageUrl}`} alt=""
                                                    onLoad={e => {
                                                        const target = e.target;
                                                        if (target.height > 280) {
                                                            target.style.width = 280 * 480 / target.height + 'px';
                                                            target.style.height = '280px';
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </Tabs.TabPane>
                        )
                    })}
                </Tabs>
            </div>
        );
    }
    componentDidMount() {
        this.getImageData();
    }
    getImageData() {
        axios.get('/sector/queryImageNamesAndorid', {
            params: {
                sectorId: pagedata.sector.sectorId,
                imageType: 3
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0) {
                this.setState({ imageData: data });
            } else {
                this.setState({ imageData: [] });
                console.log('/sector/queryImageType code: ', code, msg);
            }
        })
    }
}

export default BluePrint;