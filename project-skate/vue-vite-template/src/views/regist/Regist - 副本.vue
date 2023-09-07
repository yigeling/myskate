<template>
	<h1 class="center" style="margin-bottom: 40px;">注册</h1>
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[
			  { required: true, message: '请填写用户名' },
			  { validator: checkUserRepete, message: '用户名已经被占用' }
			]" />
			<van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<van-field v-model="re_password" type="password" name="re_password" label="密码" placeholder="密码" :rules="[
			  { required: true, message: '请再次输入密码' },
			  { validator: checkRePassword, message: '两次密码不一致' }
			]" />
			<!-- validator => 自定义验证器 => 函数（true->合法，false->不合法，显示message的内容 ）  -->
		</van-cell-group>
		<div style="margin: 16px; margin-top: 60px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
	<div class="right side-margin" style="margin-top: 35px;">
		<p>已经有帐号了，去<router-link to="/login">登录</router-link></p>
	</div>
	<div class="skate_img">
		<img src="../../../public/img/skate.jpg" style="width: 200px;height: 100px" />
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const username = ref('');
	const password = ref('');
	const re_password = ref('');
	
	
	import {
		createUser
	} from '@/api/user.js'
	import {
		showFailToast,
		showSuccessToast
	} from 'vant'
	import 'vant/es/toast/style';
	import router from '@/router'
	const onSubmit = (values) => {
		console.log('submit', values);
		// 1. 在user.js => createUser => 请求后端API接口
		// 2. 调用createUser函数，根据返回结果决定跳转到/home或相应的错误提醒   
		createUser(values)
			.then(res => {
				if (res.code != 0) {
					console.log(res.message)
					showFailToast({
						message: res.message,
						position: 'top',
					});
				} else {
					console.log("注册成功")
					showSuccessToast({
						message: "创建用户成功",
						position: 'top',
					});
					router.push({
						name: "login"
					})
				}
			})
			.catch(err => {
				console.log("调用接口失败")
				showFailToast({
					message: "服务端错误！",
					position: 'top',
				});
			})

	};

	// 检查两次输入的密码是否一致
	function checkRePassword(val) {
		console.log("检查两次输入的密码是否一致", password.value, re_password.value)
		if (password.value == re_password.value) {
			// 数据合法=> 不需要提示信息
			return true
		} else {
			// 数据不合法 => 显示message的信息
			return false
			// 数据不合法 => 显示返回的字符串
			// return `检查两次输入的密码是否一致`
		}
	}

	import {
		checkUsername
	} from '@/api/user.js'
	// 检查用户名是否被占用
	function checkUserRepete(val) {
		console.log("检查用户名是否被占用", val)

		// 调用 API接口
		var result = checkUsername(val)
			// 执行成功
			.then((res) => {
				console.log(res)
				if (res.code == 0) {
					return true
				} else {
					return res.message
				}
			})
			// 执行失败
			.catch((err) => {
				console.log(err)
				return err
			})
		return result
	}
</script>

<style>
	.side-margin{
		margin: 0px 15px;
	}
	.right{
		text-align: right;
	}
	div.skate_img{
		margin: auto;
		text-align: center;
		margin-top: 100px;
	}
</style>
