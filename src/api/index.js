const ENVURL = "https://test1member.shunluzhidi.com/userapi",  // 测试环境
    PRODURL = "https://member.shunluzhidi.com/userapi"; // 生产环境
const BASEURL = process.env.NODE_ENV === 'development' ? ENVURL : PRODURL;
const API = {
    BASEURL, // base-url

    uploadImage: 'https://img.shunluzhidi.com', // 上传图片
    collection: '/Goods/collectGoodsList', // 收藏列表
    liveList: '/broadcast/getliveinfo', // 直播列表
    userIncome: '/Personal/getEarningsList', // 用户收益列表
    userIncomeTotal: '/Personal/getAccumulativeTotal', //未提现收益额度
    shareKey: '/share_links/getkey', // 分享链接Key
};
export default API;
