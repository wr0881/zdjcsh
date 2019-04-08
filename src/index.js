import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import 'antd/dist/antd.less';
import 'common/css/index.scss';
import * as serviceWorker from './serviceWorker';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("root")
    );
}
render(App);

if (module.hot) {
    module.hot.accept(App, () => {
        render(App)
    });
}

// ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
