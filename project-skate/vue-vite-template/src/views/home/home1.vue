<template>

	<van-tabs v-model:active="active" sticky>
		<van-tab to="/search">
			<template #title>
				<van-icon name="search" />
			</template>
			搜索页面
		</van-tab>
		<van-tab title="关注">关注的人的动态</van-tab>
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
			<!-- <div v-for="index in 10" :key="index"> -->
			<div style="margin-top: 5px;">
				<van-row>
					<van-col span="4">
						<van-image round width="3rem" height="3rem" :src="userStore.avator" />
					</van-col>
					<van-col span="4">{{userStore.username}}</van-col>
					<van-col span="4" offset="12">
						<van-icon name="plus" @click="Follow" color="#1989fa" />关注
					</van-col>
				</van-row>
				<van-row style="margin-top: -20px;">
					<van-col span="4" offset="4">发布时间</van-col>
				</van-row>
			</div>

		</van-tab>
		<p>欢迎收看我的动态</p>
		<!-- <div> -->
		<van-image fit="fill" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
		<!-- </div> -->
		<van-divider />
		<van-row>
			<van-col span="4">
				<van-icon name="share-o" size="20px" @click="Share" /> 分享
			</van-col>
			<van-col span="4" offset="1">
				<van-icon name="good-job-o" size="20px" @click="Tags" />
			</van-col>
			<van-col span="4">
				<van-icon name="comment-o" size="20px" @click="Comment" />
			</van-col>
		</van-row>



		<van-tab title="附近">附近的人的动态</van-tab>
		<van-tab to="/issue">
			<template #title>
				<van-icon name="add-o" to="/map" />
			</template>
			发布动态页面
		</van-tab>
	</van-tabs>
</template>

<script setup>
	import {
		useUsersStore
	} from '@/store/user'
	const userStore = useUsersStore();
	import {
		ref
	} from 'vue';
	var active = ref(0)
	import {
		onMounted
	} from 'vue'
	//声明父组件支持的自定义事件
	const $emit = defineEmits(["change"])

	//触发父组件的自定义时间
	onMounted(() => {
		$emit("change", 0)
	})
	import {
		reactive,
		toRefs
	} from 'vue';
	const page = 0
	const state = reactive({
		page2: 2,
	});

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
</script>

<style lang="scss" scoped>
	.nut-swiper-item {
		line-height: 150px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	// *{touch-action: none;}
</style>
