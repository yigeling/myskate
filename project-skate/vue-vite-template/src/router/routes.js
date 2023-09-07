// 以后，所有的路由信息都添加到routes这个Array中
export const routes = [
	// 一级路由
	{
		path: "/todo",
		name: "todo",
		component: ()=>import("_c/Todo.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: ()=>import("@/views/login/Login.vue"),
	},
	{
		path: "/regist",
		name: "regist",
		component: ()=>import("_v/regist/Regist.vue"),
	},
	{
		path: "/404",
		name: "url404",
		component: ()=>import("_v/404.vue"),
	},
	{
		path: "/403",
		name: "url403",
		component: ()=>import("_v/403.vue"),
	},
	{
		path: "/:pathMatch(.*)",
		redirect: "/404"
	},
	{
		path: "/search",
		name: "search",
		component: ()=>import("_v/home/components/Search.vue")
	},
	{
		path: "/issue",
		name: "issue",
		component: ()=>import("_v/home/Issue.vue")
	},
	{
		path: "/map",
		name: "map",
		component: ()=>import("_v/map/Map.vue")
	},
	{
		path: "/teach",
		name: "teach",
		component: ()=>import("_v/teach/Teach.vue")
	},
	{
		path: "/test",
		component: ()=>import("_v/home/testissue.vue")
	},
	{
		// 公共路径前缀
		path: "/",
		name: "dashboard",
		// 组件：公共要显示的组件内容 +在组件中记得加上<router-view />
		component: () =>import("_c/tabbar/TabBar.vue"), 
		children:[
			{
				path: '/',
				// 跳转到/home
				redirect: '/home'
			},
			{
				path: "home",
				name: "home",
				component: ()=>import("@/views/home/Home.vue"),
			},
			{
				path: "map",
				name: "map",
				component: ()=>import("_v/map/map.vue"),
			},
			// {
			// path: 'ip',
			// name: 'ip',
			// component: () => import('_v/map/test.vue')
			// },
			{
				path: "teach",
				name: "teach",
				component: ()=>import("_v/teach/Teach.vue")
			},
			{
				path: "usercenter",
				name: "usercenter",
				meta: {
									loginRequired: true
				},
				component: ()=>import("@/views/account/UserCenter.vue")
			},
			{
				path: "shop",
				name: "shop",
				component: ()=>import("_v/shop/Shop.vue")
			}
		]
	},
	{
		path: "/uc/",
		name: "uc",
		component: () => import("_c/header/UcHeader.vue"),
		children:[
			{
				path: '', 
				name: 'uc_home',
				redirect: '/uc/profile'
			},
			{
				path: "profile",
				name: "profile",
				meta: {
					title: "个人资料"
				},
				component: () =>import("_v/account/Profile.vue")
			},
			{
				path: "changename",
				name: "changename",
				meta: {
					title: "修改昵称"
				},
				component: () =>import("_v/account/changeusername.vue")
			}
		]
	},

]