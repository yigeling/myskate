<template>
	<van-nav-bar :title="title" left-arrow fixed @click-left="onClickLeft"/>
	<div class="top-frame bottom-frame">
		<router-view @change="changeTitle"></router-view>
		<!-- <div class="bottom">已经到结尾了...</div> -->
	</div>
</template>

<script setup>
	import {ref} from 'vue'
	import router from "@/router"
	const title = ref("")
	
	const onClickLeft = () => history.back();
	
	function changeTitle(data){
		console.log(data)
		title.value = data
	}
	
</script>

<style>
</style>