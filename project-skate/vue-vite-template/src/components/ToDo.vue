<template>
	<main id="todolist">
		<h1>
			事项清单
			<span>把事情完成，每次一个项目。</span>
		</h1>

		<form name="newform" @submit.prevent="addItem">
			<!-- <label for="newitem">添加到待办事项列表</label> -->
			<input type="text" name="newitem" id="newitem" v-model="newitem">
			<button type="submit">添加项目</button>
		</form>

		<ul v-if="todo.length">
			<li stagger="5000" v-for="item, index in sortedByStatus" :key="index" :class="item.done?'done':''">
				<span class="label">{{item.label}}</span>
				<div class="actions">
					<button type="button" :aria-label="item.done?'Undone':'Done'" :title="item.done?'Undone':'Done'" class="btn-picto" @click="markAsDoneOrUndone(item)">
						<i aria-hidden="true"
							class="material-icons">{{item.done?'check_box':'check_box_outline_blank'}}</i></button>
					<button class="btn-picto" type="button" aria-label="Delete" title="Delete" @click="deleteItem(index)">
						<i aria-hidden="true" class="material-icons">删除</i>
					</button>
				</div>
			</li>
		</ul>

		<p class="emptylist" v-else> 你的待办事项列表是空的。 </p>


	</main>
</template>

<script setup>
	import {ref, reactive, computed} from 'vue'
	// 定义newitem => 存储新添加的数据
	var newitem = ref("")
	// 定义todo => 存放项目列表
	var todo = reactive([
			{label: '明天要考试', done:false},
			{label: '早起锻炼', done:true},
			{label: '记得吃饭', done:true},
		])
		
	// var todo = reactive([])
	
	// 添加一个新项目
	function addItem(){
		todo.push({
			label: newitem.value,
			done: false
		})
		newitem.value = ""
	}
	
	// 根据index删除一个数据
	function deleteItem(index){
		todo.splice(index,1)
	}
	
	// 修改完成状态
	function markAsDoneOrUndone(item){
		item.done = !item.done
	}
	
	var sortedByStatus = computed(function(){
		// 将todo进行排序，done的状态
		// 取出所有未完成的项目
		var undoneList = todo.filter(function(item){return !item.done})
		// 取出所有完成了的项目
		var doneList = todo.filter(function(item){return item.done})
		// 合并并返回
		var result = [...undoneList, ...doneList]
		return result
	})
	
</script>

<style>
	/* vietnamese */
	@font-face {
		font-family: 'Quicksand';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58m-wi40.woff2) format('woff2');
		unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
	}

	/* latin-ext */
	@font-face {
		font-family: 'Quicksand';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58i-wi40.woff2) format('woff2');
		unicode-range: U+0100-02AF, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}

	/* latin */
	@font-face {
		font-family: 'Quicksand';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wg.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}


	/* fallback */
	@font-face {
		font-family: 'Material Icons';
		font-style: normal;
		font-weight: 400;
		src: url(https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
	}

	.material-icons {
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 24px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-moz-font-feature-settings: 'liga';
		-moz-osx-font-smoothing: grayscale;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html,
	body {
		background: #f7f1f1;
		font-size: 1.1rem;
		font-family: 'Quicksand', sans-serif;
		height: 100%;
	}

	@keyframes strikeitem {
		to {
			width: calc(100% + 1rem);
		}
	}

	#todolist {
		margin: 4rem auto;
		padding: 2rem 3rem 3rem;
		max-width: 500px;
		background: #FF6666;
		color: #FFF;
		box-shadow: -5px -5px 0px 0px rgba(100, 100, 100, .1);
	}

	#todolist h1 {
		/*text-align:center;*/
		font-weight: normal;
		font-size: 2.6rem;
		letter-spacing: 0.05em;
		border-bottom: 1px solid rgba(255, 255, 255, .3);
	}

	#todolist h1 span {
		display: block;
		font-size: 0.8rem;
		margin-bottom: 0.7rem;
		margin-left: 3px;
		margin-top: 0.2rem;
	}

	#todolist .emptylist {
		margin-top: 2.6rem;
		text-align: center;
		letter-spacing: .05em;
		font-style: italic;
		opacity: 0.8;

	}

	#todolist ul {
		margin-top: 2.6rem;
		list-style: none;
	}

	#todolist li {
		display: flex;
		margin: 0 -3rem 4px;
		padding: 1.1rem 3rem;
		justify-content: space-between;
		align-items: center;
		background: rgba(255, 255, 255, 0.1);
	}

	#todolist .actions {
		flex-shrink: 0;
		padding-left: 0.7em;
	}

	#todolist .label {
		position: relative;
		transition: opacity .2s linear;
	}

	#todolist .done .label {
		opacity: .6;
	}

	#todolist .done .label:before {
		content: '';
		position: absolute;
		top: 50%;
		left: -.5rem;
		display: block;
		width: 0%;
		height: 1px;
		background: #FFF;
		animation: strikeitem .3s ease-out 0s forwards;
	}

	#todolist .btn-picto {
		border: none;
		background: none;
		-webkit-appearance: none;
		cursor: pointer;
		color: #FFF;
	}


	/* FORM */
	form {
		margin-top: 3rem;
		display: flex;
		flex-wrap: wrap;
	}

	form label {
		min-width: 100%;
		margin-bottom: .5rem;
		font-size: 1.3rem;
	}

	form input {
		flex-grow: 1;
		border: none;
		background: #a02a2a;
		padding: 0 1.5em;
		font-size: initial;
	}

	form button {
		padding: 0 1.3rem;
		border: none;
		background: #FF6666;
		color: white;
		text-transform: uppercase;
		font-weight: bold;
		border: 1px solid rgba(255, 255, 255, .3);
		margin-left: 5px;
		cursor: pointer;
		transition: background .2s ease-out;
	}

	form button:hover {
		background: #FF5E5E;
	}

	form input,
	form button {
		font-family: 'Quicksand', sans-serif;
		height: 3rem;
	}
</style>
