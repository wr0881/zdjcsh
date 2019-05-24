import React, { Component } from "react";
import { Popover } from 'antd';
import "./index.css";
class Dot extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { picX, picY, dotColor, monitorPointNumber, monitorTypeName, terminalNumber } = this.props.value;
        const { onClick } = this.props;
        //console.log('value', this.props.value);
        const content = (
            <div>
                <div>监测指标 : {monitorTypeName ? monitorTypeName : '无'}</div>
                <div>终端编号 : {terminalNumber ? terminalNumber : '无'}</div>
            </div>
        );
        return (
            <Popover content={content} title={monitorPointNumber} trigger="hover">
                <div
                    className="dot"
                    style={{
                        left: picX === undefined ? null : picX - 25 + "px",
                        top: picY === undefined ? null : picY - 25 + "px"
                    }}
                >
                    <div
                        onClick={onClick.bind(this, this.props.value)}
                        className="item1"
                        style={{
                            backgroundColor: dotColor === undefined ? 'red' : dotColor
                        }}
                    />
                    <div
                        className="item2"
                        style={{ backgroundColor: dotColor === undefined ? 'red' : dotColor }}
                    />
                </div>
            </Popover>
        );
    }
    componentDidMount() { }
}

export default Dot;
