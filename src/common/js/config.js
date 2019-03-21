import axios from 'axios';
import { message } from 'antd';
import user from 'store/user';

// axios.defaults.baseURL = 'http://10.88.89.41:8180';
// axios.defaults.baseURL = 'http://10.88.89.170:8180';
axios.defaults.baseURL = 'http://123.207.88.210:8180';
axios.defaults.timeout = 6000;

window.Psq_ImgUrl = 'http://123.207.88.210';

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    message.error('请求错误');
    return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
    const { code } = res.data;
    // 无权访问
    if (code === 100) {
        message.error('长时间未操作,请重新登录');
        user.isLogin = false;
        window.localStorage.setItem('token', null);
        window.location = '/';
    };
    //刷新token
    if (res.headers.authorization !== undefined) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.headers.authorization;
        window.localStorage.setItem('token', 'Bearer ' + res.headers.authorization);
    };
    return res;
}, function (err) {
    message.error('系统异常');
    return Promise.reject(err);
});
axios.defaults.timeout = 6000;

window.Psq_ImgUrl = 'http://123.207.88.210';

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    message.error('请求错误');
    return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
    const { code } = res.data;
    // 无权访问
    if (code === 100) {
        message.error('长时间未操作,请重新登录');
        user.isLogin = false;
        window.localStorage.setItem('token', null);
        window.location = '/';
    };
    //刷新token
    if (res.headers.authorization !== undefined) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.headers.authorization;
        window.localStorage.setItem('token', 'Bearer ' + res.headers.authorization);
    };
    return res;
}, function (err) {
    message.error('系统异常');
    return Promise.reject(err);
});