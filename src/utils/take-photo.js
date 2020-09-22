import App from './../main';

class TakePhoto {
    async takePhoto(isUpload = true) {
        let path;
        const {tapIndex} = await App.$actionSheet(['相机拍照', '相册选择']);
        if (tapIndex === 1) { // 从相册
            path = await this.pickImage('album');
        } else {
            path = await this.pickImage('camera');
        }
        if(isUpload) {
            return  await this.uploadPhoto(path);
        }
        return path;
    }

    async uploadPhoto(filePath) {
        uni.showLoading({
            title: '上传中'
        });
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: App.$api.uploadImage, // 上传文件地址
                filePath: filePath,
                name: 'upfile',
                formData: {
                    source: 'slzd_store_license_img'
                },
                success(res) {
                    resolve(JSON.parse(res.data));
                },
                fail(err){
                    App.$u.toast(err.errMsg);
                    reject(err);
                },
                complete() {
                    uni.hideLoading();
                }
            })
        });
    }

    pickImage(sourceType) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count: 1, //默认9
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: [sourceType], //从相册选择
                success(result) {
                    resolve(result.tempFilePaths[0]);
                },
                fail(err) {
                    reject(err);
                }
            });
        })
    }

    // 若使用base64上传，则需要用此方法转换
    fileToBase64(filePath) {
        return new Promise((resolve, reject) => {
            wx.getFileSystemManager().readFile({
                filePath, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success(res) {
                    resolve('data:image/jpeg;base64,' + res.data);
                },
                fail(res) {
                    reject(res.errMsg)
                }
            })
        });
    }
}

export default new TakePhoto;
