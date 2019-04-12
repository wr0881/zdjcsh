import React, { Component } from 'react';
//import { toJS } from 'mobx';
import { autorun, toJS } from 'mobx';
import { observer } from 'mobx-react';
import echarts from 'echarts';
//import PointMap from './pointMap';
import monitorpage from 'store/monitorpage.js';
import { getUnit } from 'common/js/util.js';
import './control.scss';
import { Checkbox, Radio } from 'antd';
import datacontrol from 'store/datacontrol.js';
import $ from  'jquery';
import DataControlChart from './dataControlChart';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            pointTypeData: [],
            pointNameData: [],
            checked: false
        }
    }
    render() { 
        // const monitorTypeName = datacontrol.controlTypeData.monitorTypeName; 
        // console.log(monitorTypeName);       
        return (
            <div className='datacontrol-wrapper'>
                <ul style={{margin:'0',padding:'0'}}>
                {datacontrol.controlTypeData && datacontrol.controlTypeData.map(v=>{
                    return (
                    <li key={v.monitorType} value={v.monitorTypeName} style={{listStyle:'none'}}>
                        <div style={{ width:'100%', height:'380px', marginTop:'20px', backgroundColor:'#fff', border:'1px dashed green', borderRadius:'10px'}}>
                            <span>{v.monitorTypeName}</span>
                            <DataControlChart />
                        </div>
                    </li>)
                })}
                </ul>
                                         
            </div>
        );
    }
    componentWillUnmount() {
        datacontrol.monitorTypeName = [];
    }
    componentDidMount() {
        datacontrol.getControlTypeData();
    }
}

export default DataControl;