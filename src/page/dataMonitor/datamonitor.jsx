import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './monitor.scss';
import datamonitor from 'store/datamonitor.js';
import DataMonitorMap from './datamonitormap';
import DataNone from './datanone';
import SockJs from 'sockjs-client';

@observer
class DataMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
            checked: false,
            monitorTypeName:[],
        };
    }
    
    render() { 
        let list = datamonitor.monitorTypeData && datamonitor.monitorTypeData.map((v,index)=>(
            <li className="datamonitor-ul-li" key={index} value={v.monitorType}>
                {(v.monitorType === 26 || v.monitorType === 66 )? 
                    <DataNone />:
                    <DataMonitorMap key={v.monitorTypeName} typeValue={v.monitorType} value={v.monitorTypeName} />                        
                }
                {/* <DataMonitorMap key={v.monitorTypeName} typeValue={v.monitorType} value={v.monitorTypeName} />                 */}
            </li>
        ))
        return (
            <div className='datamonitor-wrapper'>
                {/* <div className='datamonitor-top'></div> */}
                <ul className="datamonitor-ul" style={{width:'100%'}}>
                {list}
                </ul>                                                      
            </div>            
        );
    }
    componentDidMount() {
        //datamonitor.ConnectWithWS();
        datamonitor.getMonitorTypeData();       
    }
    componentWillUnmount() {
    }
}

export default DataMonitor;