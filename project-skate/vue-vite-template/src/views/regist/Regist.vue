<template>
	<h1 class="center" style="margin-bottom: 40px;">注册</h1>
	<van-form @submit="onSubmit">
		<van-cell-group inset>
			<van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[
			  { required: true, message: '请填写用户名' },
			  
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
		import { ref } from 'vue';
		import {checkUsername} from '@/api/user.js'
		
		
		const username = ref('');
		const password = ref('');
		const re_password = ref('');
		
		    import {createUser} from '@/api/user.js'
			import {showFailToast,showSuccessToast} from 'vant'
			import 'vant/es/toast/style';
			import { useRouter } from "vue-router";
			const router = useRouter();
			
			
		    const onSubmit = (values) => {
		      console.log('submit', values);
		      createUser(values)
			  .then(res => {
				console.log('submit',res)
				if(res.code != 0){
					// ${res.message} 
					showFailToast({
						message:res.message,
						position: 'top',
					});
					console.log(`注册失败`);
					
				}else{
					showSuccessToast({
						message:"注册成功",
						position: 'top',
					});
					router.push({
						name:"login",
						query: {date:new Date().getTime()}
					})
					console.log("创建用户成功")
					
				}
			  })		  
			  .catch(err => {
				  showFailToast({
				  	message:"服务端错误！",
				  	position: 'top',
				  });
				  console.log(err, `服务端错误！`)
			  })
		    };
		
		
		// val => re_password
		const checkRePassword = (val) => {
			// 返回true验证成功，false表示验证失败
			console.log("检查两次密码是否一致")
			if(password.value != re_password.value){
				return false
			}
			return true
		}
		
		const checkUserRepete = (val) => {
		console.log('检查用户名是否有重复')
		// 返回true验证成功，false表示验证失败
		// 返回字符串表示验证失败，从新定制message
		console.log('请求检查用法接口')
		  let params = {
		    username: val
		  }
		  var result = checkUsername(params)
		  .then(res => {
			  // 请求成功会执行这部分代码
			  console.log('data:', res.code, res.code != 0)
			  if(res.code != 0){
				    return `输入有误，${res.message}`;
			  }
			  return true
		  })		  
		  .catch(err => {
			  // 捕获前面函数的错误
			  console.log('err:', err)
			  return `服务端错误！`;
		  })
		  console.log('result', result)
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
