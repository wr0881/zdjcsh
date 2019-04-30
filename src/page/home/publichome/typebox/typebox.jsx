import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Iconmore from 'common/image/publichome/icon_更多.png';
import './typebox.scss';

@withRouter
class TypeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        style: {
            width: "180px",
            height: "157px"
        }
    }
    render() {
        const { style, data } = this.props;
        return (
            <div
                className="typebox"
                style={{
                    ...style,
                    backgroundImage: `url(${require(`common/image/publichome/${data.itemName}.png`)})`
                }}
                onClick={_ => {
                    if (data.url.indexOf('http://') < 0) {
                        this.props.history.push(data.url);
                    } else {
                        window.open(data.url);
                    }
                }}
            >
                <div className="typebox-mask"></div>
                <div className="typebox-iconimg" style={{ backgroundImage: `url(${require(`common/image/publichome/icon_${data.itemName}.png`)})` }}></div>
                <div className="typebox-title">
                    <span>{data.itemName}</span>
                    <div className="typebox-icon" style={{ backgroundImage: `url(${Iconmore})` }}></div>
                </div>
            </div>
        );
    }
}

export default TypeBox;