import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class DataNone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        //console.log(monitorType);
        return(
            <div></div>
        );
    }
    componentDidMount() {                               
        //this.mywebsocket();
             
    }
}

export default DataNone;