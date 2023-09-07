<template>
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
				<van-grid-item>
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
</template>

<script setup>
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

<style>
	
</style>
