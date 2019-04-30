import React, { Component } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
import './control.scss';
import { Modal } from 'antd';
import datacontrol from 'store/datacontrol.js';
import enlarge from 'common/image/enlarge.png';
import enlarge2 from 'common/image/enlarge2.png';
import DataControlChart from './dataControlChart';
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
        console.log("断点1111111111");
        datacontrol.getControlPointName();
    }
    componentWillUnmount() {
        this.destroyAutorun && this.destroyAutorun();
    }
}

export default DataControl;