import service from './request'; // 导入封装的 Axios 实例

// 模拟登录接口
export const login = (data:any) => service.post('/api/login', data);

// 模拟注册接口
export const register = (data:any) => service.post('/api/register', data);

// 模拟忘记密码接口
export const forgetPassword = (data:any) => service.post('/api/forget-password', data);