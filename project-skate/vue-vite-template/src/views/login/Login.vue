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
  import { ref } from 'vue';
  const username = ref("")
  const password = ref("")
  
    
	import {useUsersStore} from '@/store/user'
	const userStore = useUsersStore();

	import {showFailToast,showSuccessToast} from 'vant'
	import 'vant/es/toast/style';
	import router from '@/router'

	const onClickLeft = () => {
		router.push('/')
	}
  
  	const onSubmit = (values) => {
  		console.log('submit', values);
  		userStore.login(values)
  			.then(res => {
  				console.log('submit', res)
  				if (res.code != 0) {
  					showFailToast({
  						message: res.message,
  						position: 'top',
  					});
  					console.log(`用户登录失败`);
  
  				} else {
  					showSuccessToast({
  						message: "用户登录成功",
  						position: 'top',
  					});
					if(router.currentRoute.value.query.redirect){
						console.log(router.currentRoute.value.query.redirect)
						router.push(router.currentRoute.value.query.redirect)
					}else{
						router.push({
							name: 'home',
							query: {
								date: new Date().getTime()
							} 
						})
						console.log("登录成功")
					}
  					
  				}
  			})
  			.catch(err => {
  				showFailToast({
  					message: "服务端错误！",
  					position: 'top',
  				});
  				console.log(err, `服务端错误！`)
  			})
  	};
</script>

<style>
</style>