<template>
	<view class="content">

	</view>
</template>

<script>

	export default {
		data() {
			return {

			}
		},
		methods: {

			getUserInfo({
				detail
			}) {
				console.log('三方登录只演示登录api能力，暂未关联云端数据');
				if (detail.userInfo) {
					this.loginLocal(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
		},
		onReady() {
		}
	}
</script>

<style>
</style>
