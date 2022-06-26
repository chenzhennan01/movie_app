import axiosInstance from "../axiosInstance.js";

const planInfo = {
    getListByMid(id){
       return axiosInstance.get("/plan-info/getListByMid/" + id)
    },
    findById(id){
        return axiosInstance.get("/plan-info/findById/" + id)
    }
}

export default planInfo;