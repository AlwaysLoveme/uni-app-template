
const VuePlugin = {
    install(Vue, vm) {
        Vue.prototype.$actionSheet = (itemList) => {
            return new Promise((resolve, reject) => {
                uni.showActionSheet({
                    itemList,
                    success: function (res) {
                        resolve(res);
                    },
                    fail: function (res) {
                        reject(res);
                    }
                });
            });
        }

        // 模态框
        Vue.prototype.$alert = ({
                                    title,
                                    content,
                                    showCancel = true,
                                    cancelText = "取消",
                                    confirmText = "确定",
                                    cancelColor = "#000",
                                    confirmColor = "#FE4726"
                                }) => {
            return new Promise((resolve, reject) => {
                uni.showModal({
                    title,
                    content,
                    showCancel,
                    cancelText,
                    confirmText,
                    cancelColor,
                    confirmColor,
                    success: function (res) {
                        if (res.confirm) {
                            resolve(true);
                        } else if (res.cancel) {
                            resolve(false);
                        }
                    },
                    fail(error) {
                        reject(error);
                    }
                });
            });
        }

        // 返回页面，默认只返回一级
        Vue.prototype.$routerBack = (delta = 1) => {
            return uni.navigateBack({
                delta,
            });
        }

        // 如果是直辖市，则展示地址时，只展示一次 eg: 上海市上海市闵行区 -> 上海市闵行区
        Vue.prototype.$transformAddress = (province, city, dist) => {
            return (province === city ? province : province + city) + dist;
        }

        // 拨打电话
        Vue.prototype.$call = (phone) => {
            let phoneNumber = phone ? phone : '4008205838';
            phoneNumber = typeof phoneNumber === 'string' ? phoneNumber : phoneNumber.toString()
            return uni.makePhoneCall({
                phoneNumber,
            });
        }

        //预览图片
        Vue.prototype.$previewImage = (image) => {
            uni.previewImage({
                urls: image instanceof Array ? image : [image]
            });
        }

        // 对象字符串化
        Vue.prototype.$stringify = (obj) => {
            return JSON.stringify(obj);
        }
        // 字符串转对象
        Vue.prototype.$parse = (str) => {
            return JSON.parse(str);
        }

        //复制到粘贴板
        Vue.prototype.$setClipboardData = (content) => {
            content = typeof content === 'string' ? content : content.toString()
            return new Promise((resolve, reject) => {
                uni.setClipboardData({
                    data: content,
                    success: function () {
                        resolve()
                    },
                    fail:error=>{
                        reject(error)
                    }
                });
            })
        }

    }
}

export default VuePlugin;
