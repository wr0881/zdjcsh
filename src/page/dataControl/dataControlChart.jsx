import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Checkbox,Radio } from 'antd';
import { autorun } from 'mobx';
import monitorpage from 'store/monitorpage.js';
import './control.scss';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

@observer
class DataControlChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const datacontrol = monitorpage.controlTypeData;
        return(
          <div className="control-modal-content">
            <div className="left-control-modal">
              <div className="dataAnalyse-operate-title">选择指标:</div>
              <div className="dataAnalyse-operate-content">
                  <RadioGroup
                      key={Math.random()}
                      onChange={e => { monitorpage.monitorTypeName = e.target.value }}
                      value={monitorpage.monitorTypeName}
                  >
                      {monitorpage.monitorTypeData.map(v => {
                          return <Radio key={v.monitorType} value={v.monitorType}>{v.monitorTypeName}</Radio>;
                      })}
                  </RadioGroup>
              </div>
              <div className="dataAnalyse-operate-title">选择测点:</div>
              <div className="dataAnalyse-operate-select">
                  <CheckboxGroup
                      key={Math.random()}
                      defaultValue={monitorpage.selectPointName}
                      onChange={v => { monitorpage.selectPointName = v }}
                  >
                      {monitorpage.pointNameData.map(v => {
                          return <Checkbox key={v} value={v}>{v}</Checkbox>;
                      })}
                  </CheckboxGroup>
              </div>
            </div>
            <div className="right-control-modal"></div>
          </div>
        );
    }
    componentDidMount() {
      monitorpage.getMonitorTypeData();

      autorun(() => {
        if (monitorpage.monitorTypeName) {
            monitorpage.getPointName();
        }
    })
  }
  componentWillUnmount() {
      monitorpage.monitorTypeName = null;
      monitorpage.selectPointName = null;
      monitorpage.pointNameData = [];
      monitorpage.contrastChartData = [];
  }
}

export default DataControlChart;