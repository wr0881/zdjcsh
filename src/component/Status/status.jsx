import React, { Component } from 'react';
import { Spin } from 'antd';
import emptyUrl from 'common/image/empty.png';
import './status.scss';

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { text, loading } = this.props;
        return (
            <div className="status">
                {loading ?
                    <Spin tip={text} />
                    :
                    <div>
                        <div className="status-img">
                            <img src={emptyUrl} alt="" />
                        </div>
                        <div className="status-text">
                            {text}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Status;