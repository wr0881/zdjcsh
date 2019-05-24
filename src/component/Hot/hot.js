import React, { Component } from "react";
import Dot from "./dot";

class Hot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleData: []
        };
    }
    render() {
        const { style, imgUrl, onClick } = this.props;
        const { handleData } = this.state;
        return (
            <div style={{ ...style }} className="hot-wrapper" ref='hot'>
                <div className="hot-content">
                    <img src={imgUrl} alt="热点图" ref='hotImg' />
                    {handleData &&
                        handleData.map((v, i) => {
                            return (
                                <Dot
                                    key={i}
                                    value={v}
                                    onClick={onClick}
                                />
                            );
                        })}
                </div>
            </div>
        );
    }
    componentDidMount() {
        setTimeout(() => {
            this.renderPointXY();
        }, 16);
        // window.onresize = () => {
        //     this.renderPointXY();
        // };
    }
    computedImgWH() {
        try {
            const { imgInfo } = this.props;
            const { imageWidth, imageHeight } = imgInfo;
            const { clientWidth, clientHeight } = this.refs.hot;
            let scaleWidth, scaleHeight;
            if (imageHeight / imageWidth < clientHeight / clientWidth) {
                scaleWidth = clientWidth;
                scaleHeight = (clientWidth * imageHeight) / imageWidth;
            } else {
                scaleHeight = clientHeight;
                scaleWidth = (clientHeight * imageWidth) / imageHeight;
            }
            this.refs.hotImg.style.width = scaleWidth + 'px';
            this.refs.hotImg.style.height = scaleHeight + 'px';
            return { scaleWidth, scaleHeight };
        } catch{

        }
    }
    renderPointXY() {
        try {
            const { dataSource, imgInfo } = this.props;
            const { scaleWidth, scaleHeight } = this.computedImgWH();
            const ary = dataSource.map((v, i) => {
                let dotColor;
                switch (v.status) {
                    case 0: dotColor = 'green'; break;
                    case 1: dotColor = 'yellow'; break;
                    case 2: dotColor = 'orange'; break;
                    case 3: dotColor = 'red'; break;
                    case -1: dotColor = 'gray'; break;
                    default: dotColor = 'green'; break;
                }
                return {
                    ...v,
                    dotColor,
                    picX: (parseInt(v.picX) * scaleWidth) / imgInfo.imageWidth,
                    picY: (parseInt(v.picY) * scaleHeight) / imgInfo.imageHeight,
                };
            });
            this.setState({ handleData: ary });
        } catch{

        }
    }
}

export default Hot;
