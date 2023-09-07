// createRouter => 创建路由
import { createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
// routes.js文件定义所有的路由
import { routes } from './routes'

const router = createRouter({
	// url展示方式
	history: createWebHistory(),
	// 路由配置信息
	routes
})

// 导出router,让外部使用
export default router