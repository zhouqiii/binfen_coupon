import axios from "axios";

// 引入Loading组件和添加dom的方法
import Loading from "@/components/Loading";
import createDom from "@/utils/createDom"
// 引入判空的方法
import { notNull } from "@/utils/commonFn"
// 引入 从url截取参数 的方法
import commonFn from "@/utils/commonFn"

export const req = axios.create({
    // 正式环境： https://mlife.jf365.boc.cn/AppPrj
    // 测试环境： https://alex188.cn/AppPrj
    baseURL: process.env.NODE_ENV === "development" ? "https://mlife.jf365.boc.cn/AppPrj" : "/AppPrj",
    timeout: 15000,
    params:{
        imei:commonFn.getParamsFromUrl("imei") || "123",
        // 正式环境需要将dns注掉
        // dns:commonFn.getParamsFromUrl("dns") || "dsmsboc001",//124 后台本地 dsmsboc001
        gtype: "9",
        attest: "-339418059",
    },
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'dns': 'dsmsboc001',
    },
})
req.defaults.withCredentials = true;
export const request = ({ url = "", data = {}, params = {}, method = "post" } = {}) => {
    return req({
        url,
        data,
        params,
        method
    })
}
// ld为存放loading组件的变量，下边要用到组件里的方法，以及创建dom时添加到组件上的方法
let ld;

//请求拦截器
req.interceptors.request.use(config => {

    // 发送请求之前添加loading效果
    if(!ld && config.headers.loading){
        ld = createDom(Loading)
    }
    
    return config
}, err => {
    console.log(err)
})

//响应拦截器
req.interceptors.response.use(res => {
    // console.log(res)
    if(ld){
        ld.hide();
        ld = null;
    }
    if (res.status === 200) {
        if (notNull(res.data)) {

        }
        return res.data
    }
    return res
}, err => {
    ld.hide();
    console.log(err)
})

export default req