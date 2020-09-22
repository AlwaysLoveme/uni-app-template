<script>
export default {
  onLaunch: function () {
    this.checkUpdate();
    uni.getSystemInfo({
      success(e) {
        const barHeight = e.platform === 'ios' ? 44 : 48;
        Vue.prototype.$barHeight = barHeight;
        Vue.prototype.$statusBarHeight = e.statusBarHeight; // 状态栏高度
        Vue.prototype.$navBarHeight = barHeight + e.statusBarHeight; // 当使用自定义导航栏时，内容区域需要撑下此高度
        // IOS safe-area
        Vue.prototype.$safeArea = {
          top: e.safeArea.top,
          left: e.safeArea.left,
          height: e.screenHeight,
          bottom: e.screenHeight - e.safeArea.bottom,
        }
      }
    })
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

<style lang="scss">
@import "~uview-ui/index";
@import "./style/common";
/*每个页面公共css */
page {
  min-height: 100%;
  display: flex;
  font-size: 28rpx;
}
.u-page {
  width: 100%;
  min-height: 100vh;
}

input,
textarea,
button {
  font-size: 28rpx;
  outline: 0;
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
