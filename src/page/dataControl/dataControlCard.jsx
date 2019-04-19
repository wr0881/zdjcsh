import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Checkbox,Radio } from 'antd';
import echarts from 'echarts';
import { autorun } from 'mobx';
import monitorpage from 'store/monitorpage.js';
import './control.scss';
import datacontrol from 'store/datacontrol.js';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControlCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return(
            <div>
                 
            </div>
        );
    }
    componentDidMount() {
        datacontrol.getControlPointName();
        
    }
    componentWillUnmount() {
        monitorpage.monitorTypeName = null;
        monitorpage.selectPointName = null;
        monitorpage.pointNameData = [];
        monitorpage.contrastChartData = [];
    }
}

export default DataControlCard;