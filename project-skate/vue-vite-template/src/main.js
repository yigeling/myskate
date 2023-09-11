// import => 从导入vue中导入createApp的函数
import { createApp } from 'vue'
// 导入了一个css文件
// 在main.js中导入的在东西，全局生效
import '@/assets/style.css'
import router from '@/router'
// @/router => @/router/index.js
import store from '@/store'

// 导入一个App.vue文件(根组件)
import App from './App.vue'
import { Cell, CellGroup } from '@nutui/nutui';
import {nutUiComponents} from './plugins/NutUI.js'

import { ImagePreview } from 'vant';

import { Lazyload } from 'vant';
// 基于App.vue(根组件)创建一个vue实例
const app = createApp(App)
// app.use(Cell);
// app.use(CellGroup);
nutUiComponents.forEach((item)=>{
	app.use(item)
})

app.use(router)
app.use(store)

app.use(ImagePreview);

// app.use(Toast);

// 把vue实例挂载到index.html => #app
app.mount('#app')

app.use(Lazyload, {
  lazyComponent: true,
});

router.beforeEach((to, from, next) => {
	// 检查待跳转的路由的meta中的loginReqired属性值 => true => 需要检查权限
	// 如果携带了token认为已经登录（）2
	// needLogin => 是否已经登录
	var needLogin = false
	// console.log('token:',localStorage.getItem("store_users"))
	// console.log('token:',JSON.parse(localStorage.getItem("store_users")).token)
	
	// 如果localStrage没有store_users属性或localstorage.store_users.token为空
	if(!localStorage.hasOwnProperty("my_user") || !JSON.parse(localStorage.getItem("my_user")).token){
		needLogin = true
	}
	
	
	if (to.matched.some(record => record.meta.loginRequired) && needLogin) {
		console.log("需要登录")
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		next({
			// path: '/login/',
			name: "login",
		query: {
				redirect: to.fullPath
			}
		})
	} else {
		console.log("已经登录或不需要登录")
		// 已经登录跳转到redirect页面
		if(to.path == "/login" && localStorage.hasOwnProperty("my_user") && JSON.parse(localStorage.getItem("my_user")).token){
			// console.log("跳转到",to.fullPath.query.redirect)
			console.log("跳转到",to.query.redirect)
			next(to.query.redirect)
		}else{
			// 确保一定要调用 next()
			next()
		}
		
	}
})
