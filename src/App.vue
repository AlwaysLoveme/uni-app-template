<script>
import {
  mapState,
  mapMutations
} from 'vuex'

export default {
  onLaunch: function () {
    this.checkUpdate();
  },
  onShow: function () {
  },
  onHide: function () {
  },
  methods: {
    checkUpdate() {
      const updateManage = uni.getUpdateManager();
      updateManage.onUpdateReady(function () {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启小程序以应用这些更新？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManage.applyUpdate();
            }
          }
        });
      });
      updateManage.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
        uni.showToast({title: res.hasUpdate ? '有新版本啦，后台下载中' : '您的版本是最新的'})
      });
      updateManage.onUpdateFailed(function (res) {
        // 新的版本下载失败
        uni.showModal({
          title: '更新失败',
          showCancel: false,
          content: '请确保网络通畅，或者尝试关闭微信重新启动',
        });
      });
    }
  }
}
</script>

<style>

/*每个页面公共css */
page {
  min-height: 100%;
  display: flex;
  font-size: 14px;
}

input,
textarea,
button {
  font-size: 14px;
}

/* #ifdef MP-BAIDU */
page {
  width: 100%;
  height: 100%;
  display: block;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
  min-height: 100vh;
}

/* #endif */


</style>
