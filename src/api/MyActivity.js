import request from '@/utils/request'
/**获取特惠快讯标题列表*/
export function sendRequestTag(params) {
    return request({
        url:'/News.do?',
        method:'post',
        params:params
    })
}
  /**获取特惠快讯列表*/
export function sendRequestThkx(params) {
    return request({
        headers:{loading:false},
        url:'/News.do?',
        method:'post',
        params:params
    })
}