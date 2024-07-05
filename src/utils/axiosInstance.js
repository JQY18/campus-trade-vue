// 在axiosInstance.js文件中
import axios from 'axios';

const instance = axios.create({
  // 设置基础URL，这将被添加到每个请求的URL前
  baseURL: 'http://localhost:8080',
  // 设置超时时间
  timeout: 1000,

});

export default instance;