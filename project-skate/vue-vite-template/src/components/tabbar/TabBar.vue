<template>
	<router-view></router-view>
	<van-tabbar v-model="active">
	  <van-tabbar-item icon="wap-home-o" :to="{name:'home'}">首页</van-tabbar-item>
	  <van-tabbar-item icon="location-o" to="/map">滑板地图</van-tabbar-item>
	  <van-tabbar-item icon="video-o" to="/teach">教学</van-tabbar-item>
	  <van-tabbar-item icon="goods-collect-o" to="/shop">商店</van-tabbar-item>
	  <van-tabbar-item icon="user-o" :to="{name:'usercenter'}">个人中心</van-tabbar-item>
	</van-tabbar>
</template>

<!-- setup-vue3 -->
<script setup>
	import { ref } from 'vue';
	var active = ref(0)
</script>

<!-- <script>
	import { ref } from 'vue';
	
	export default {
	  setup() {
	    const active = ref(0);
	    return { active };
	  },
	};
</script> -->

<style>
</style>