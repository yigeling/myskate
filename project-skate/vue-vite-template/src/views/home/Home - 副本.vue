<template>
	<van-tabs v-model:active="active" sticky>
		<!-- 搜索界面 -->
		<van-tab>
			<van-notice-bar left-icon="volume-o" text="正在开发中,敬请期待!" />
			<template #title>
				<van-icon name="search" />
			</template>
		</van-tab>
		<!-- 关注页面 -->
		<van-tab title="关注">关注的人的动态</van-tab>
		<!-- 发现页面 -->
		<van-tab title="发现">
			<van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
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

				<!-- 动态部分 -->

				<div v-for="n in sortedUserPosts" style="margin-top: 5px;">
					<van-row>
						<van-col span="4">
							<van-image round width="3rem" height="3rem" :src=n.head />
						</van-col>
						<van-col span="4">{{n.username}}</van-col>
						<van-col span="4" offset="12">
							<van-icon name="plus" @click="Follow" color="#1989fa" />关注
						</van-col>
					</van-row>
					<van-row style="margin-top: -20px;">
						<van-col span="10" offset="4">{{n.add_time}}</van-col>
					</van-row>
					<!-- <p>{{n.content}}</p> -->
					<van-text-ellipsis :content=n.content expand-text="展开" collapse-text="收起" />


					<div>
						<template v-if="n.photo && n.photo.split(',').length > 1">
							<van-grid :border="false" :column-num="3" :clickable="true">
								<van-grid-item v-for="(image, index) in n.photo.split(',')" :key="index">
									<van-image :src="image" v-lazy="image" @click="photo" />
								</van-grid-item>
							</van-grid>
						</template>
						
						<template v-else-if="n.photo && n.photo.split(',').length === 1">
							<van-grid :border="false" :column-num="3" :clickable="true">
								<van-grid-item  >
									<van-image :src="n.photo" v-lazy="n.photo" @click="photo" />
								</van-grid-item>
							</van-grid>
						</template>
						
						<template v-else>
							<van-grid :border="false" :column-num="3" :clickable="true">

							</van-grid>
						</template>
					</div>

					<van-row style="margin-top: 2px;">
						<van-col span="4" offset="14">
							<van-icon name="share-o" size="20px" @click="Share" /> 分享
						</van-col>
						<van-col span="3" offset="1">
							<van-icon name="good-job-o" size="20px" @click="Tags" />{{n.user_like}}
						</van-col>
						<van-col span="1">
							<van-icon name="comment-o" size="20px" @click="Comment" />
						</van-col>
					</van-row>
					<van-divider />
				</div>
				<van-back-top />
			</van-pull-refresh>
		</van-tab>

		<van-tab title="活动">活动</van-tab>

		<van-tab to="issue">
			<template #title>
				<van-icon name="add-o" to="issue"/>
			</template>
			发布动态页面
		</van-tab>


	</van-tabs>
</template>

<script setup>
	// import HomeHeader from "./components/HomeHeader.vue"
	import {
		useUsersStore
	} from '@/store/user'
	const userStore = useUsersStore();
	import {
		ref
	} from 'vue';
	// 导航组件默认情况下抵用的第一个标签  --》 发现页
	const active = ref(2)
	import {
		onMounted
	} from 'vue'
	import {
		posts, tokenVerify
	} from "@/api/user.js"

	import {
		showImagePreview,
		showToast
	} from 'vant';
	import {
		ImagePreview
	} from "vant"
	import {
		Lazyload
	} from 'vant';

	import {
		computed
	} from 'vue';
	import router from "@/router";
	//声明父组件支持的自定义事件
	const $emit = defineEmits(["change"])

	const show = ref(false);
	const overlayImage = ref('');
	//触发父组件的自定义事件

	const count = ref(0);
	const isLoading = ref(false);

	const onRefresh = () => {
		setTimeout(() => {
			showToast('刷新成功');
			isLoading.value = false;
			count.value++;
		}, 1000);
		posts()
			.then(res => {
				console.log('posts', res)
				if (res.code != 0) {
					console.log(`获取数据失败，` + res.message);
				} else {
					userposts.value = res.data
					console.log("获取数据成功")
				}
			})
			.catch(err => {
				console.log(err, `服务端错误！`)
			})
	};
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
	const photos = ref([])

	const sortedUserPosts = computed(() => {
		return userposts.value.slice().sort((a, b) => {
			return new Date(b.add_time) - new Date(a.add_time);
		});
	});

	const userposts = ref([])

	onMounted(() => {
		console.log("执行获取动态接口");
		posts()
			.then(res => {
				console.log('posts', res)
				if (res.code != 0) {
					console.log(`获取数据失败，` + res.message);
				} else {
					userposts.value = res.data
					console.log('data', res.data)
					console.log("获取数据成功")
				}
			})
			.catch(err => {
				console.log(err, `服务端错误！`)
			})
	})

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

<style lang="scss" scoped>
	.nut-swiper-item {
		line-height: 150px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.img {
		align-items: center;
		justify-content: center;
	}

	// *{touch-action: none;}
</style>
