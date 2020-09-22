import App from './../main';
import TMap from './../sdk/qqmap-wx-jssdk';

class MapLocation {
    tMap = null;

    constructor() {
        if (!this.tMap) {
            this.tMap = new TMap({
                key: '6VVBZ-7XRKD-OAH43-HYM7A-5Q37F-N2BGI', // 腾讯地图开放平台的APPKEY
            });
        }
    }

    getLocation() {
        return new Promise((resolve, reject) => {
            uni.getLocation({
                type: 'gcj02',
                altitude: true,
                isHighAccuracy: true,
                success:  (res)=> {
                    console.log('当前位置的经度longitude：' + res.longitude);
                    console.log('当前位置的纬度latitude：' + res.latitude);
                    resolve(res);
                },
                fail: async  (err)=> {
                    const result = await this.getSettings().catch(()=>{
                        reject(false)
                    });
                    if (result) {
                        resolve(await this.getLocation());
                    }
                },
            });
        });
    }

    // 通过经纬度获取城市信息
    async getCityInfo(longitude, latitude) {
        return new Promise((resolve, reject) => {
            this.tMap.reverseGeocoder({
                location: latitude + "," + longitude,
                success: function ({result}) {
                    const { address_component: address } = result;
                    const { province, city, district} = address;
                    resolve({
                        addressComponent: {
                            province,
                            city,
                            district,
                            detail: result.formatted_addresses.recommend,
                        },
                        longitude,
                        latitude
                    });
                },
                fail: function (info) {
                    reject(info);
                },
            })
        });
    }

    // 地址逆编码 转坐标 腾讯地图
    geocoder(address) {
        return new Promise((resolve, reject) => {
            this.tMap.geocoder({
                address,
                success({result}) {
                    console.log(result);
                    resolve(result.location);
                },
                fail(err) {
                    reject(err);
                }
            });
        })
    }

    getSettings() {
        return new Promise((resolve, reject) => {
            uni.getSetting({
                success: ({authSetting})=> {
                    if (!authSetting['scope.userLocation']) {
                        uni.authorize({
                            scope: 'scope.userLocation',
                            success() {
                                resolve(true);
                            },
                            fail: async (err) =>{
                                const ret = await App.$alert({
                                    title: '提示',
                                    content: '检测到您未授权使用位置信息，请确认授权，否则定位功能将无法使用'
                                });
                                if(ret) {
                                    const result = await this.openSetting().catch(()=>{
                                        reject(false);
                                    });
                                    resolve(result);
                                } else {
                                    App.$u.toast('您已取消位置授权');
                                    reject(false);
                                }
                            }
                        });
                    }else{
                        resolve(true);
                    }
                },
            });
        });
    }

    openSetting() {
        return new Promise((resolve, reject) => {
            // opensetting只能通过用户手势触发，无法通过代码主动调用，故在模态框中通过button点击调用
            uni.openSetting({
                success({authSetting}) {
                    if (authSetting['scope.userLocation']) {
                        resolve(true);
                        App.$u.toast('授权成功');
                    } else {
                        reject(false);
                    }
                },
                fail: function (err) {
                    reject(err);
                }
            });
        });
    }

    // 打开地图上选址
    chooseLocation(longitude,latitude) {
        return new Promise((resolve, reject) => {
            uni.chooseLocation({
                latitude,
                longitude,
                success(res) {
                    resolve(res);
                },
                fail(err) {
                    reject(err);
                }
            });
        })
    }
}

export default new MapLocation;
