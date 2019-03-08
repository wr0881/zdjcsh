import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="footer">
                <div className="footer-dec">中大检测主要提供专业的道路、桥梁、隧道、铁路、岩土、地基、水利、材料、幕墙、结构与鉴定、食品、农产品、环保、职业卫生、电磁辐射等领域的检测、勘察及技术咨询服务</div>
                <div className="footer-number">版权所有：湖南中大建设工程检测技术有限公司&nbsp;&nbsp;&nbsp;湘ICP备18005958号-1</div>
            </div>
        );
    }
}

export default Footer;