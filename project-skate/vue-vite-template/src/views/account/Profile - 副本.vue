<template>
	<div class="body">
		<van-cell-group class="space">
			<van-cell is-link title="我的头像">
				<template #value>
					<van-uploader :after-read="afterRead" :max-size="500 * 1024" @oversize="onOversize">
						<van-image round width="35" height="35" :src="userStore.avator" />
					</van-uploader>
				</template>
			</van-cell>
			<van-cell title="用户名" :value="userStore.username" :to="{name:'changename'}"/>
			<van-cell title="用户ID" :value="userStore.user_id" />
			<van-cell title="个性签名" :value="userStore.intro" />
		</van-cell-group>

		<van-cell-group class="space">
			<van-cell title="账号安全" is-link />
			<van-cell title="隐私" is-link />
			<van-cell title="个人信息收集清单" is-link />
			<van-cell title="地址管理" is-link />
			<van-cell title="更换银行卡" is-link />
		</van-cell-group>

		<van-cell-group class="space">
			<van-cell title="注销" is-link />
			<van-cell title="版本更新" value="1.0.9.1" />
		</van-cell-group>
		<van-button class="bottom-button" @click="onLogout">安全退出</van-button>
	</div>
</template>

<script setup>
	import {
		useUsersStore
	} from '@/store/user'
	import {uploadAvator} from "@/api/user.js"
	const userStore = useUsersStore();

	const afterRead = (file) => {
		// 此时可以自行将文件上传至服务器
		// 可简单看一下file对象
		console.log("文件对象", file);
		console.log("上传到服务器后，返回头像地址并修改userStore.avator")
		// 定义调用上传接口的函数
		// 上传
		uploadAvator(userStore.username, {"data":file.content})
		.then(res=>{
			console.log(res)
			if(res.code == 0){
				// Toast
				console.log("上传成功")
				userStore.avator = res.data.avator
			}else{
				console.log("上传失败",res.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})
		
	};

	import {
		showToast
	} from 'vant';
	const onOversize = (file) => {
		console.log(file);
		showToast('文件大小不能超过 500kb');
	};
	
	import {onMounted} from 'vue'
	import router from "@/router"
	const $emit = defineEmits(['change'])
	onMounted(()=>{
		//参数1 -》触发父组件的change事件
		//参数1 -》 传递给父组件函数的参数
		$emit("change", router.currentRoute.value.meta.title)
	})
	
	function onLogout(){
		userStore.logout()
		.then((res)=>{
			console.log("退出成功",res)
			router.push({
				name:"login"
			})
		})
		.catch((err)=>{
			console.log("退出失败",err)
		})
	}
</script>

<style>
	.bottom-button {
		color: darkorange;
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
	}
	
	.body {
		background-color: whitesmoke;
		height: 650px;
		margin-top: 48px;
	}

	.space {
		margin-bottom: 5px;
	}
</style>
