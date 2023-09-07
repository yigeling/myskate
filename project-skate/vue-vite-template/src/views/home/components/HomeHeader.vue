<template>
	
		<van-tab title="发现">
			<nut-swiper :init-page="page" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
				<nut-swiper-item>
					<img src="../../../public/img/home4.jpg" alt="" />
				</nut-swiper-item>
				<nut-swiper-item>
					<img src="../../../public/img/home2.jpg" alt="" />
				</nut-swiper-item>
				<nut-swiper-item>
					<img src="../../../public/img/home3.jpg" alt="" />
				</nut-swiper-item>
				<nut-swiper-item>
					<img src="../../../public/img/home1.jpg" alt="" />
				</nut-swiper-item>
			</nut-swiper>
		</van-tab>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const value = ref('');
	
	function Follow() {
		console.log("关注了这个博主")
	}
	
	function Share() {
		console.log("分享这条动态")
	}
	
	function Tags() {
		console.log("点赞了这条动态")
	}
	
	function Comment() {
		console.log("评论了动态")
	}
	
	function photo() {
		console.log("点击了图片")
		showImagePreview(photos)
	}
</script>

<style>
</style>
