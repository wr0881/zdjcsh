import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'common/js/config.js';
import Root from 'page/index.jsx';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <LocaleProvider locale={zhCN}>
                    <Root />
                </LocaleProvider>
            </BrowserRouter>
        );
    }
}

export default App;
