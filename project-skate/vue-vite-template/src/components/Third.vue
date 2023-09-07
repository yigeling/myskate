<template>
	<button @click="changeA"> {{a}}-button1</button>
	<button @click="changeB"> {{b}}-button2</button>
</template>

<script setup>
	// ref => 所有类型的数据
	// reactive => Object ,Array类型
	import {ref, reactive, computed} from 'vue'
	var a = 1;
	var b = ref(1)
	
	function changeA(){
		a = a+1
	}
	function changeB(){
		b.value = b.value+1
	}
</script>

<style>
</style>