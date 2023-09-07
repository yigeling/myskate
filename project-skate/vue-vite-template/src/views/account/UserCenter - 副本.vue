<template>
	<div class="content">
		<van-row>
		  <van-col span="8">
			  <van-image
			    round
			    width="4rem"
			    height="4rem"
			    :src="userStore.avator"
			  />
		  </van-col>
		  <van-col span="16">
			  <div class="member-detail">
			  	<p class="nickname">{{userStore.username}}</p>
			  	<p class="info">{{userStore.intro}}</p>
			  </div>
		  </van-col>
		</van-row>

		<van-cell-group title="" style="margin-top: 20px;">
		  <van-cell title="个人资料" is-link to="/uc/profile"></van-cell>
		  <van-cell title="收货地址" is-link to="/uc/address"></van-cell>
		  <van-cell title="在线客服" is-link to="/demo"></van-cell>
		  <van-cell title="意见反馈" is-link to="/demo"></van-cell>
		  <van-cell title="关于我们" is-link to="/demo"></van-cell>
		</van-cell-group>
	</div>
</template>

<script setup>
	import {reactive,onMounted} from 'vue';
    // 取出之前保存的用户名 
    import {
      useUsersStore
    } from '@/store/user'
	import {getUserInfo} from "@/api/user.js"
	import router from "@/router"
    const onClickLeft = () => history.back();
    const onClickRight = () => {
		router.push('/login')
	}
	
    const userStore = useUsersStore();
	const badge_numbers = reactive({
		"wait_pay": 0,
		"wait_send": 4,
		"wait_receive":5
	})
	
	const $emit = defineEmits(["change"])
	// 页面的元素已经挂载好了，再执行调用api
	onMounted(()=>{
		$emit("change", 5)
		// 1. 定义调用API接口的函数  
		// 2. 调用上面定义好的函数
		getUserInfo(userStore.username)
		.then((res)=>{
			console.log(res)
			if(res.code == 0){
				console.log("利用Toast输出信息")
				userStore.setUsername(res.data.username)
				userStore.setAvator(res.data.avator)
				userStore.setIntro(res.data.intro)
			}else{
				console.log("利用Toast输出message信息",res.message)
			}
		})
		.catch((err)=>{
			console.log("利用Toast输出err信息",err)
		})
		
	})
	
	
</script>

<style>
	.content {
		background-color: #f7f8fa;
		height: 500px;
		padding: 15px 10px;
	}
	.member-detail{
		font-size: 14px;
	}
</style>