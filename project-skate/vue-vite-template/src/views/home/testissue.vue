<template>
	<h1>1</h1>
	<van-uploader :after-read="afterRead" multiple :max-count="9" />
	<h1>2</h1>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import * as qiniu from 'qiniu-js'
	import {
		uploadImage
	} from '@/api/user.js'
	// const fileList = ref([]);

	const afterRead = (file) => {
		var formdata = new FormData();
		formdata.append("file", file.file);
		uploadImage(formdata)
	}
</script>

<style>
</style>
