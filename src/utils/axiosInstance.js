/**
 * 用于配置axios的实例
 */
 import axios from "axios";

 const axiosInstance = axios.create({
     baseURL:"http://www.softeem.xin:9999",
     timeout:10000,
 });
 // 请注意这里并没有配置完成，后面还需要配置拦截和响应请求
 axiosInstance.interceptors.response.use(resp=>{
     console.log("我是拦截器")
     return Promise.resolve(resp.data)
 },error=>{
     //对响应错误做点什么
     //正常情况下这里要给用户提示，但是我们今天还没有用到，我们明天会用vant完成这个操作
     return Promise.reject(error)
 });
 
 export default axiosInstance;