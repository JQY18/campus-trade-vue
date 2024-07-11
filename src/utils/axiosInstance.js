// 在axiosInstance.js文件中
import axios from 'axios';
import router from '../router';

const instance = axios.create({
    // 设置基础URL，这将被添加到每个请求的URL前
    baseURL: 'http://localhost:8080',
    // 设置超时时间
    timeout: 1000,

});

// 请求拦截器
instance.interceptors.request.use(config => {
    // 获取localStorage中的JWT
    const token = localStorage.getItem('token');
    if (token) {
        // 如果存在JWT，就添加到请求头中
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 成功响应处理
        return response;
    },
    error => {
        // 错误响应处理
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 未授权
                    localStorage.removeItem('token');
                    return router.push({
                        name: 'login'
                    });
                case 404:
                    // 资源未找到
                    return router.push({
                        name: 'error404'
                    });
                case 500:
                    // 内部服务器错误
                    return router.push({
                        name: 'error500'
                    });
                default:
                    // 其他错误状态码
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default instance;