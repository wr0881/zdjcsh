import React, { Component } from 'react';
import emptyUrl from 'common/image/empty.png';
import './status.scss';

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {text} = this.props;
        return ( 
            <div className="status">
                <div className="status-img">
                    <img src={emptyUrl} alt=""/>
                </div>
                <div className="status-text">
                    {text}
                </div>
            </div>
         );
    }
}
 
export default Status;