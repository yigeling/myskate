<template>
	<h1>第二个单文件组件</h1>
	<h3>条件渲染</h3>
	<p v-if="flag0">条件成立则显示v-if</p> 
	<p v-else>条件不成立则v-else</p>

	<h5 v-if="flag1 == 'A'">This is A</h5>
	<h5 v-else-if="flag1 == 'B'">This is B</h5>
	<h5 v-else>This is Other</h5>

	<template v-if="flag0">
		<h4>这是我的标题</h4>
		<p>这是段落1</p>
		<p>这是段落2</p>
	</template>

	<div v-if="flag0">
		<h4>这是我的标题</h4>
		<p>这是段落1</p>
		<p>这是段落2</p>
	</div>

	<p v-show="flag0 == true">这是一个v-show指令</p>
	<p v-show="flag0 != true">这是一个v-show指令</p>
	<p v-if="flag0 == true">这是一个v-if指令</p>
	<p v-if="flag0 != true">这是一个v-if指令</p>


	<h3>循环渲染</h3>
	<!-- start => 1..10 -->
	<span v-for="n in 10">{{n}}</span>

	<p v-for="item,index in arr1">{{index}}-{{item}}</p>
	<p v-for="value,key,index in obj1">{{key}}-{{value}}-{{index}}</p>
	
	<div class="box" v-for="item,index in students" :key="index">
		<!-- <p>姓名：{{item.name}}</p>
		<p>年龄：{{item.age}}</p> -->
		<p v-for="value,key in item" :key="key">{{key}}:{{value}}</p>
	</div>
	<!-- 	<div class="box">
		<p>姓名：cali</p>
		<p>年龄：18</p>
	</div>
	<div class="box">
		<p>姓名：cali</p>
		<p>年龄：18</p>
	</div>
	<div class="box">
		<p>姓名：cali</p>
		<p>年龄：18</p>
	</div> -->

</template>

<script setup>
	var flag0 = true;
	var flag1 = "A"

	var arr1 = ["Vue", "Vite", "JavaScript", "Vant"]
	var obj1 = {
		"name": "xx",
		"age": 18,
		"hobby": "学技术"
	}

	var students = [{
			"name": "李正翔",
			age: 18,
			score: 100
		},
		{
			"name": "粟檬",
			age: 18,
			English: 99
		},
		{
			"name": "尹家幸",
			age: 18
		},
		{
			"name": "陈颖婷",
			age: 18
		}
	]
	// xx:xx
</script>

<style>
	.box {
		background-color: aquamarine;
		width: 200px;
		height: 100px;
		margin: 5px;
		padding: 5px;
		display: inline-block;
	}
</style>
