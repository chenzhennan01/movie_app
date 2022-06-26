/**
 * 对接后端影厅信息的接口
 */

 import axiosInstance from "../axiosInstance.js";
 const hallInfo = {
     /**
      * 获取所有影厅信息的方法
      */
     getAllList(){
         return axiosInstance.get("/hall-info/getAllList");
     },
     /**
      * 分页获取影厅信息的方法
      */
     getListByPage({pageIndex,hall_name}){
         return axiosInstance.get(`/hall-info/getListByPage`,{
             params:{
                 pageIndex,
                 hall_name
             }
         })
     }
 }
 
 
 export default hallInfo;