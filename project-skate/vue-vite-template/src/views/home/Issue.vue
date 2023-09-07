<template>
	<van-nav-bar left-text="" left-arrow @click-left="onClickLeft" />
	<van-form @submit="onSubmit">
		<van-cell-group inset class="insert">
			<van-field v-model="message" rows="2" autosize type="textarea" maxlength="100" placeholder="说点什么吧..."
				show-word-limit />
		</van-cell-group>
		<!-- 		<van-field name="uploader" >
			<template #input>
				<van-uploader v-model="imgvalue" />
			</template>
		</van-field> -->
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	import {
		uploadPost, tokenVerify
	} from "@/api/user.js"
	import {
		useUsersStore
	} from '@/store/user'
	import router from "@/router";
	import {showFailToast,showSuccessToast} from 'vant';
	import 'vant/es/toast/style';
	import { Toast } from 'vant';
	
	import * as qiniu from 'qiniu-js'
	
	const userStore = useUsersStore();
	const onClickLeft = () => history.back();
	const message = ref('');
	const username = ref('');
	
	onMounted(() => {
		tokenVerify()
		.then(res =>{
			if (res.code != 0){
				router.push({
					name:"login",
				})
			}
		})
	})
	
	const onSubmit = (values) => {
		const data = {
			username: userStore.username,
			data: message.value,
			id: userStore.user_id
		}
		console.log(data)
		uploadPost(data)
		.then(res=>{
			if(res.code != 0){
					console.log("发布失败")
					showFailToast({
						message:"发布失败",
						position: 'top',
					});
				}else{
					console.log("发布成功")
					showSuccessToast({
						message:"发布成功",
						position: 'top',
					});
					router.push({
						name:"home",
						query: {date:new Date().getTime()},
					})
				}
			})
			.catch(err=>{
				console.log(err)
			})
			
		}
</script>

<style>
	.insert {
		margin-top: 10px;
		color: #000;
	}
</style>
