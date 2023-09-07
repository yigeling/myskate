<template>
	  <div class="center content" style="margin-top: 48px;">
		  <p class="text">请输入新的用户名</p>
		  <van-cell-group class="space">
			<van-field v-model="username" placeholder="用户名"  />
		  </van-cell-group>
		  <van-button type="danger" style="margin-top: 15px;" @click="save">保存</van-button>
	  </div>
</template>

<script setup>
	import {onMounted, ref} from 'vue'
	import router from "@/router"
	import { useUsersStore } from "@/store/user";
	const store = useUsersStore();
	var username = ref(store.username)
	
	const $emit = defineEmits(['change'])
	
	onMounted(()=>{
		$emit("change", router.currentRoute.value.meta.title)
	})
	
	
	function save(){
		console.log("调用接口修改用户名")
		// 定义调用接口函数
		// 调用.then.catch
		store.setUsername(username.value)
	}
</script>

<style>
	.body{
		margin-top: 48px;
	}
	.text{
		/* text-align: left; */
		margin-top: 20px;
	}
</style>
