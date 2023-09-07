import {
	defineConfig,
	loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {
	VantResolver
} from 'unplugin-vue-components/resolvers'

import {
	createStyleImportPlugin
} from 'vite-plugin-style-import'
import {
	resolve
} from 'path'


// https://vitejs.dev/config/
export default ({
	command,
	mode
}) => defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [VantResolver()],
		}),
		// add here 
		createStyleImportPlugin({
			resolves: [{
				libraryName: '@nutui/nutui',
				libraryNameChangeCase: 'pascalCase',
				resolveStyle: (name) => {
					return `@nutui/nutui/dist/packages/${name.toLowerCase()}/index.scss`
				},
			}]
		}),
	],
	// add here 
	css: {
		preprocessorOptions: {
			scss: {
				// 配置 nutui 全局 scss 变量
				additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`
			}
		}
	},
	// 配置别名
	resolve: {
		alias: [
			// @ => vue-vite-template/src
			{
				find: '@',
				replacement: resolve(__dirname, 'src')
			},
			// _c => vue-vite-template/src/components
			{
				find: '_c',
				replacement: resolve(__dirname, 'src/components')
			},
			{
				find: '_v',
				replacement: resolve(__dirname, 'src/views')
			},
		]
	},
	server: {
		// host: true,
		// hmr: true,
		proxy: {
			'/api': {
				// 根据不同运行环境加载不同的配置文件
				target: loadEnv(mode, process.cwd()).VITE_API_TARGET_URL,
				// 根据配置文件加载
				// target: serverConfig.server.dev,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	// server: {
	// 		proxy: {
	// 			'/txMap': {
	// 				target: "https://apis.map.qq.com",
	// 				changeOrigin: true,
	// 				rewrite: (path) => path.replace(/^\/txMap/, '')
	// 			}
	// 		}
	// 	},
})
