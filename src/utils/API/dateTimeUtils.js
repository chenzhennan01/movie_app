import dayjs from "dayjs"

//用来格式传来的日期
export const formatDateTime = (str,split = "YYYY-MM-DD") => {
    let d = dayjs(str); //将原来的日期字符串转换成dayjs对象
    if (d.isValid()) {  //如果是合法字符串
        return d.format(split);
    }
    else{
        return "";
    }
}