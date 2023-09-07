<template>
	<p style="text-align: center; font-size: 20px;"><b>教学</b></p>
	<div class="select" stick>
		<van-tabs v-model:active="active">
			<van-tab title="滑板">
				<van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="skate"
					height="600px" />
			</van-tab>
			<van-tab title="鱼板">
				<van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex"
					:items="fishSkateboard" height="600px" />
			</van-tab>
			<van-tab title="长板">
				<van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex"
					:items="longboard" height="600px" />
			</van-tab>
		</van-tabs>
		<!-- <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items" /> -->
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const active = ref('滑板')
	const activeId = ref(0);
	const activeIndex = ref(0);
	const skate = [{
			text: '入门',
			children: [{
					text: '滑板选购',
					id: 1
				}, {
					text: '滑板组装',
					id: 2
				}, {
					text: '滑板维护',
					id: 3,
				},
				{
					text: '滑板常识',
					id: 4,
				}, {
					text: '入门',
					id: 5,
				}, {
					text: '滑行',
					id: 6,
				}, {
					text: '转弯',
					id: 7,
				}, {
					text: '荡板',
					id: 8
				},
				{
					text: '刹车',
					id: 9,
				}, {
					text: '收板',
					id: 10,
				},
			],
		},
		{
			text: '平地',
			children: [{
					text: 'Ollie',
					id: 11
				}, {
					text: 'Shove-it',
					id: 12
				},
				{
					text: 'pop shove-it',
					id: 13
				},
				{
					text: 'F/S Shove-it',
					id: 14
				},
				{
					text: 'Fakie Shove-it',
					id: 15
				},
				{
					text: 'Fakie Ollie',
					id: 16
				},
				{
					text: 'SW Ollie',
					id: 17
				},
				{
					text: '倒滑180',
					id: 18
				},
				{
					text: 'F/S 180(外转180)',
					id: 19
				},
				{
					text: 'B/S 180(内转180)',
					id: 20
				},
				{
					text: 'Kickflip',
					id: 21
				},
				{
					text: 'Heelflip',
					id: 22
				},
				{
					text: 'Varial Kickflip',
					id: 23
				},
				{
					text: '360 Kickflip',
					id: 24
				},
				{
					text: 'Fakie Kickflip',
					id: 25
				}
			],
		},
		{
			text: '台子/杆子',
			children: [{
				text: 'B/S 50-50',
				id: 26
			},
			{
				text: 'Boardslide',
				id: 27
			},
			{
				text: 'F/S Bluntslide',
				id: 28
			},
			{
				text: 'F/S 50-50',
				id: 29
			},
			{
				text: 'Noseblunt Slide',
				id: 30
			}
			]
		},
		{
			text: 'U池',
		},
		{
			text: '平衡',
		},
		{
			text: '经典'
		},
		{
			text: '自由式'
		},
		{

		}
	];
	const fishSkateboard = [{
		text: '小鱼板入门',
		children:[
			{
				text: '选购',
				id: 31
			},
			{
				text: '组装',
				id: 32
			},
			{
				text: '入门',
				id: 33
			},
			{
				text: '滑行',
				id: 35
			},
			{
				text: '转弯',
				id: 36
			},
			{
				text: '刹车',
				id: 37
			}
		]
	},
	{
		text: '小鱼板初级',
		children: [
			{
				text: 'Ollie',
				id: 38
			},
			{
				text: 'Manual',
				id: 39
			},
			{
				text: 'Boneless 180',
				id: 40
			},
			{
				text: 'No-Comply',
				id: 41
			}
		]
	},
	{
		text: '小鱼板进阶',
	},
	{
		text: '大鱼板入门',
	},
	{
		text: '大鱼板初级'
	},
	{
		text: '大鱼板进阶'
	}];
	
	const longboard = [{
		text: '入门',
		children: [
			{
				text: '长板选购',
				id: 50
			},
			{
				text: '长板组装/保养',
				id: 51
			},
			{
				text: '入门教程',
				id: 52
			},
			{
				text: '滑行'
			},
			{
				text: '刹车'
			},
			{
				text: 'Carving'
			}
		]
	},
	{
		text: '舞步'
	},
	{
		text: '平花'
	},
	{
		text: '进阶'
	},
	{
		text: '速降'
	}
	]
	
	
</script>

<style>
	.select {
		height: 800px;
	}
</style>
