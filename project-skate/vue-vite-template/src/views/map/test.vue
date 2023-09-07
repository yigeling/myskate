<template>
	<h1>定位服务:{{city}}</h1>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue"
	import axios from "axios"
	import md5 from 'js-md5'
	// url前缀，用于识别腾讯地图服务接口
	var urlPrefix = "/txMap"
	// 请求的路径
	var url = "/ws/staticmap/v2/ip"
	// 开发者的key和sk
	var key = "X7KBZ-S2MRU-CMIVH-GAKLJ-5ZUZH-A7BLB"
	var sk = "TNQA35CWVFTaGaRgOubIe2ZQylIZxcl"
	// 将排序后参数按字母大小写排序后的结果(注意key是key+sk的结果) => 用于md5加密
	var hashStr = `${url}?key=${key}${sk}`
	// 生成请求的地址（hashStr被md5加密了）
	var fullUrl = `${urlPrefix}${url}?key=${key}&sig=${md5(hashStr)}`
	// 保存定义的城市
	var city = ref("")
	// 页面挂载好后，请求API
	onMounted(() => {
		// 调用接口获取数据
		axios.get(fullUrl)
			.then(res => {
				console.log(res)
				console.log(res.data.result.ad_info.city)
				city.value = res.data.result.ad_info.city
			})
	})
</script>

<style>
</style>
