<template>
	<van-form @submit="onSubmit">
	  <van-cell-group inset>
	    <van-field
	      v-model="username"
	      name="用户名"
	      label="用户名"
	      placeholder="用户名"
	      :rules="[{ required: true, message: '请填写用户名' }]"
	    />
	    <van-field
	      v-model="password"
	      type="password"
	      name="密码"
	      label="密码"
	      placeholder="密码"
	      :rules="[{ required: true, message: '请填写密码' }]"
	    />
	  </van-cell-group>
	  <div style="margin: 16px;">
	    <van-button round block type="primary" native-type="submit">
	      提交
	    </van-button>
	  </div>
	</van-form>
</template>

<!-- setup -> template才能使用script中的变量 -->
<script setup>
	import {ref} from 'vue'
	import 'vant/es/toast/style';
	import {
		showSuccessToast,
		showFailToast
	} from 'vant';
	
	var username = ref("")
	var password = ref("")
	
	function onSubmit(){
		console.log('提交表单')
		if(username.value == "root" && password.value == "root"){
			console.log("ok")
			showSuccessToast("成功了")
		}else{
			console.log("fail")
			showFailToast("失败了")
		}
	}
</script>

<style>
</style>