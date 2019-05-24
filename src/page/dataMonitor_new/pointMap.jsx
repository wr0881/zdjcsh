import React, { Component } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import { message } from 'antd';
import Hot from 'component/Hot/hot';
import pagedata from 'store/page.js';
import monitorpage from 'store/monitorpage.js';
//banner图
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

@observer
class PointMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="point-map-wrapper">
                <div className="swiper-container">
                    <div className="swiper-wrapper" style={{ width: '800px', height: '300px' }}>
                        {monitorpage.blueprintData.map(v => {
                            return (
                                <div key={Math.random()} className="swiper-slide">
                                    <Hot
                                        key={Math.random()}
                                        style={{ width: '100%', height: '100%' }}
                                        imgUrl={`${window.Psq_ImgUrl}${v.imageUrl}`}
                                        onClick={v => {
                                            if (v.monitorPointNumber !== monitorpage.selectPoint.monitorPointNumber) {
                                                monitorpage.selectPoint = v;
                                            }
                                        }}
                                        imgInfo={v}
                                        dataSource={v.monitorPoints}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    {/* <div className="swiper-pagination"></div> */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.initBanner();
        this.getBlueprintData();
    }
    initBanner() {
        new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            observer: true,
        });
    }
    getBlueprintData() {
        axios.get('/sector/queryImagesMonitorPoint', {
            params: {
                sectorId: pagedata.sector.sectorId,
                imageType: 3
            }
        }).then(res => {
            const { code, msg, data } = res.data;
            if (code === 0 || code === 2) {
                monitorpage.blueprintData=data;
            } else {
                monitorpage.blueprintData=[];
                message.info(msg);
                console.log('/sector/queryImagesMonitorPoint code: ', code, msg);
            }
        })
    }
}

export default PointMap;