import API from '../api';
import app from '../../package.json'; // 获取版本号，每次发版需要在package.json中手动修改版本号

const install = (Vue, vm) => {
    // 此为自定义配置参数，具体参数见上方说明
    Vue.prototype.$u.http.setConfig({
        baseUrl: API.BASEURL, // 请求的本域名
        method: 'POST',
        // 设置为json，返回后会对数据进行一次JSON.parse()
        dataType: 'json',
        showLoading: true, // 是否显示请求中的loading
        loadingText: '请求中...', // 请求loading中的文字提示
        loadingTime: 300, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        originalData: false, // 是否在拦截器中返回服务端的原始数据
        loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
        // 配置请求头信息
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    });

    // 请求拦截，配置Token等参数
    Vue.prototype.$u.http.interceptor.request = (config) => {
        if (config.data && config.data.sign === 'sign') {  // 获取验证码接口需要单独添加头信息
            config.header['device'] = '' + DeviceId;
            config.header['timestamp'] = '' + timeStamp;
            config.header['signature'] = '' + signature;
        }
        const userInfo = uni.getStorageSync('userInfo');
        const userAddress = uni.getStorageSync('addressInfo');
        if (userInfo) {
            const { mobile, token, openid } = userInfo;
            config.header.token = token;
            config.header.mobile = mobile;
            config.header.version = app.version;
            config.header.openid = openid;
        }
        // 如需要传递用户经纬度，参数应加上needLocation
        if (userAddress && config.data.needLocation) {
            config.data.lat = userAddress.lat;
            config.data.lng = userAddress.lng;
        }
        console.log(config.data)
        config.header.source = 3;
        return config;
    }

    // 响应拦截，判断状态码是否通过
    Vue.prototype.$u.http.interceptor.response = (res) => {

        if ((res.msg === '缺少openid参数' || res.msg === '用户不存在') && !res.status) {
            vm.$alert({
                title: '需要登录',
                content: '为了给您提供更好的服务，请点击确定按钮登录您的账户',
            }).then(res => {
                if (res) {
                    vm.$u.route('/pages/login/index');
                } else {
                    vm.$routerBack();
                }
            })
        } else if (!res.status && res.msg !== '店铺不存在') {
            // 延迟显示，防止hideLoading把toast也关闭，
            setTimeout(() => {
                vm.$u.toast(res.msg, 3000);
            }, 400);
        }
        return res;
    }
}

export default {
    install
}
