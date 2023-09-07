import {
	defineStore
} from 'pinia'


// 定义数据

// 第一个参数是应用程序中 store 的唯一 id
export const useTestStore = defineStore('tests', {
	// 其它配置项
	//  Login.vue => store.username
	// 定义要存储的数据
	state: () => {
		return {
			username: "defaultName",
			token: "this is a token",
		}
	},
	// 获取数据 => 类似计算属性 （获取数据时，有一些其他的操作时）
	// 最新操作 recent
	getters: {
		// 箭头函数
		getUsername1: (state) => {
			return state.username.toUpperCase() + "1"
		},
		// 普通函数
		getUsername2: function() {
			return this.username.toLowerCase() + "2"
		},
	},
	actions: {
		setUsername: function(username) {
			this.username = username
		}
	},
	// 使用该插件，开启数据缓存
	persist: {
		//这里存储默认使用的是session
		enabled: true,
		strategies: [{
			//key：数据存储在浏览器中的key
			key: 'my_test',
			//更改默认存储，我更改为localStorage
			storage: localStorage,
		}]
	}
})
