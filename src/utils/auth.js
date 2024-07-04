export function getToken() {
    // 获取token的逻辑
    return localStorage.getItem('token');
}

export function setToken(token) {
    // 设置token的逻辑
    localStorage.setItem('token', token);
}

export function removeToken() {
    // 移除token的逻辑
    localStorage.removeItem('token');
}

// 判断token是否有效的逻辑
export function isTokenValid() {
    // 判断token是否有效的逻辑
    const token = getToken();
    if (token) {
        // 验证token是否有效
        // 发送请求来检验Token
        
        return true;
    }
    return false;
}