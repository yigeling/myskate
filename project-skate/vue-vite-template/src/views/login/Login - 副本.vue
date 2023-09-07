<template>
	<van-nav-bar
	  left-text="暂不登录,去首页看看"
	  left-arrow
	  @click-left="onClickLeft"
	/>
	<h1 class="center" style="margin-bottom: 40px;">登录</h1>
	<van-form @submit="onSubmit">
	  <van-cell-group inset>
	    <van-field
	      v-model="username"
	      name="username"
	      label="用户名"
	      placeholder="用户名"
	      :rules="[{ required: true, message: '请填写用户名' }]"
	    />
	    <van-field
	      v-model="password"
	      type="password"
	      name="password"
	      label="密码"
	      placeholder="密码"
	      :rules="[{ required: true, message: '请填写密码' }]"
	    />
	  </van-cell-group>
	  <div style="margin: 16px; margin-top: 40px;">
	    <van-button round block type="primary" native-type="submit">
	      提交
	    </van-button>
		<!-- {{usernameUpper}}----{{userStore.username}} -->
	  </div>
	</van-form>
	<div class="right side-margin" style="margin-top: 35px;">
		<p>还没有账号，去<router-link to="/regist">注册</router-link></p>
	</div>
	<div class="skate_img" style="margin-top: 45px; text-align: center;">
		<img src="../../../public/img/skate.jpg" style="width: 200px;height: 100px" />
	</div>
</template>

<script setup>
	import {ref} from 'vue'
	import {
		showFailToast,
		showSuccessToast
	} from 'vant'
	import router from "@/router"
	import 'vant/es/toast/style';
	import {useUsersStore} from '@/store/user.js'
	const userStore = useUsersStore();
	console.log("store",userStore)
	
	const onClickLeft = () => {
		router.push('/')
	}
	var username = ref("")
	var password = ref("")
	
	// var usernameUpper = ref(localStorage.getItem('username'));
	// function testLocalStorage(values){
	// 	console.log("保存username",username.value)
	// 	// 保存username 到 localStorage
	// 	localStorage.setItem("username", username.value)
	// 	usernameUpper.value = localStorage.getItem('username')
		
	// 	// 将数据存储到pinia->setUsername
	// 	// userStore.setUsername(username.value)
	// }
	
	// import {login} from "@/store/user.js"
	function onSubmit(values){
		console.log("表单提交", values)
		// 1. user.js => 定义调用登录接口的函数
		// 2. 调用上述函数
		// 如果要处理存储的数据，在函数中处理了
		// 如何存储的数据？
		
		// 调用登录接口
		userStore.login(values)
		// login执行成功
		.then((res)=>{
			console.log("接口调用成功",res)
			if(res.code == 0){
				console.log("用户登录成功")
				// console.log("保存用户数据")
				// userStore.setUsername(res.data.username)
				// userStore.setToken(res.data.token)
				console.log("跳转到用户中心页面")
				showSuccessToast({
					"message": "登录成功",
					"position": "top"
				})
				router.push({
					"name": "usercenter"
				})
			}else{
				console.log("then出错了")
				showFailToast({
					"message": res.message,
					"position": "top"
				})
			}
		})
		// 执行失败
		.catch(err=>{
			console.log("出错了~",err)
			showFailToast({
				"message": err,
				"position": "top"
			})
		})
	}
</script>

<style>
</style>