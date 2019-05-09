import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './control.scss';
import datacontrol from 'store/datacontrol.js';
import DataControlMap from './dataControlMap';

@observer
class DataControl extends Component {
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
        let list = datacontrol.controlTypeData && datacontrol.controlTypeData.map((v,index)=>(
            <li className="datacontrol-ul-li" key={index} value={v.monitorType}>
                <div>
                    <DataControlMap typeValue={v.monitorType} value={v.monitorTypeName} />
                </div>                
            </li>
        ))
        return (
            <div className='datacontrol-wrapper'>
                <div className='datacontrol-top'></div>
                <ul className="datacontrol-ul">
                {list}
                </ul>                                                      
            </div>            
        );
    }
    componentDidMount() {
        //datacontrol.ConnectWithWS();
        datacontrol.getControlTypeData();       
    }
    componentWillUnmount() {
        this.destroyAutorun && this.destroyAutorun();
    }
}

export default DataControl;