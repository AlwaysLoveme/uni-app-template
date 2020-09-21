import App from './../main';

/*
* 小程序登录，获取用户信息，并存储至storage
* */
class AuthToken {
    session_key = null;
    open_id = null;

    // 获取微信Code
    wxLogin() {
        return new Promise((resolve, reject) => {
            uni.login({
                provider: 'weixin',
                success({code}) {
                    resolve(code);
                },
                fail(error) {
                    reject(error);
                }
            })
        });
    }


    async getSessionKey(code) {
        let {data, status} = await App.$u.post(App.$api.getShopOpenId, {code});
        return new Promise((resolve, reject) => {
            if (status) {
                this.session_key = data.session_key;
                this.open_id = data.openid;
                uni.setStorageSync('userInfo', data);
                resolve(data);
                // uni.getSetting({
                //     success: async (res)=> {
                //         if (res.authSetting['scope.userInfo']) {
                //             const result = await this.onAuthorizedUser();
                //             resolve(result);
                //         }
                //     },
                //     fail:(error)=> {
                //         reject(error);
                //     }
                // })
            }
        });
    }

    // 检测是否授权过获取微信用户信息，仅用来判断
    async wxAuthorize() {
        return new Promise((resolve, reject) => {
            uni.getUserInfo({
                success: async (res) => {
                    resolve(true);
                },
                fail: () => {
                    uni.authorize({
                        scope: 'scope.userInfo',
                        success: () => {
                            resolve(true);
                        },
                        fail: (error) => {
                            resolve(false);
                        }
                    });
                }
            });

        });
    }

    // 获取微信用户信息，
    onAuthorizedUser() {
        return new Promise((resolve, reject) => {
            uni.getUserInfo({
                success: async (res) => {
                    const {encryptedData, iv} = res;
                    console.log(res);
                    const params = {encryptedData, iv, sessionKey: this.session_key};
                    const {data, status, msg} = await App.$u.post(App.$api.getEncryptedData, params);
                    if (status) {
                        data.session_key = this.session_key;
                        uni.setStorageSync('userInfo', data);
                        resolve(data);
                    } else {
                        App.$u.toast(msg);
                    }
                },
                fail: function (error) {
                    reject(error);
                }
            })
        });
    }

    //使用手机号登录
    async getLoginStatus() {
        const code = await this.wxLogin();
        return await this.getSessionKey(code);
    }
}

export default new AuthToken;
