<template>
	<van-nav-bar
	  left-text=""
	  left-arrow
	  @click-left="onClickLeft"
	/>
	<h1>搜索页面</h1>
</template>

<script setup>
	const onClickLeft = () => history.back();
</script>

<style>
</style>