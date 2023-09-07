<template>
	<h1>{{title.toUpperCase()}}</h1>
	<p>{{param}}</p>
	<!-- <p>{{var num2=1}}</p> -->
	<p>这是一个数字：{{num**2}}</p>
	<p>这是一个Obj：{{obj}}</p>
	<p>这是一个Obj2：{{obj2}}</p>
	{{html}}
	<span v-html="html"></span>
	<p>{{c1}}</p>
	<p>{{c1}}</p>
	<p>{{c1}}</p>
	<p>{{c1}}</p>
	<p>{{c2()}}</p>
	<p>{{c2()}}</p>
	<p>{{c2()}}</p>
	<p>{{c2()}}</p>
	<!-- 点击按钮，num自增 -->
	<van-button @click="onClick()">点击自增</van-button>
	
	<!-- a链接 -->
	<br/>
	<a href="url">百度-{{url}}</a>
	<br/>
	<a v-bind:href="url">百度-{{url}}</a>
	<br/>
	<a :href="url">百度-{{url}}</a>
	
	<!-- <button onclick="onClick()"></button> -->
	<van-button v-on:click="onClick()">点击自增</van-button>
	<van-button @click="onClick()">点击自增</van-button>
	<input type="text" @change="onClick()" />
	

	<input type="text" :value="title"/>
	<p>{{title}}</p>
	<input type="text" v-model="title"/>
	<p>{{title}}</p>
	

	
</template>

<!-- 加上一个setup属性 -->
<script setup>
	import {ref, reactive, computed} from 'vue'
	// 普通的变量
	var param = "这是一个段落内容"
	var title = ref("This is a title")
	
	// ref或reactive => 响应式数据
	// ref -> 使数据变成响应式数据
	var num = ref(5)
	var obj = ref({'name':"肖祥武"})
	// reactive -> 使对象类型的数据（Array, Object）变成响应式数据
	var obj2 = reactive({'name':"肖祥武"})
	
	
	var html = "<h1>这是我的html段落</h1>"
	
	
	
	var url = "http://www.baidu.com"
	
	
	
	
	// 计算属性 => 属性 => 变量  => {{ c1 }}  => 基于数据响应来计算 => 缓存
	var c1 = computed(function (){
		console.log("this is c1")
		return num.value+100
	})
	
	// 函数  => {{ c2() }}
	var c2 = function (){
		console.log("this is c2")
		return num.value+100
	}
	
	// function c2(){
	// 	console.log("this is c2")
	// 	return num.value+100
	// }
	
	
	
	
	function onClick(){
		console.log(num)
		// ref => 变量名.value
		console.log(num.value)
		num.value++
		obj.value.name = "方杰"
		// reactive
		obj2.name="尹家幸"
	}
</script>

<style>
</style>