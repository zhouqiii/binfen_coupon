import service from '@/utils/request'
/** 优惠券列表 **/
export function couponsNew(params){
    return service({
        url: '/couponsNew.do',
        params:params
    })
}

/** 待支付 **/
const coupons = function(params){
    return service({
        url: '/coupons.do',
        params:params
    })
}
export default coupons