// 用户相关的后端api

import serviceAxios from '@/utils/serviceAxios.js'

// 定义导出函数
// 检查用户名是否已经被占用 => get /check/:username
export const checkUsername = (params) => {
  return serviceAxios({
    url: "/check/username",
    method: "get",
    params,
  });
};

// 注册用户
export const createUser = (data) => {
	return serviceAxios({
		// 请求地址
		url: "/user",
		// 请求方式
		method: "post",
		// post的参数
		data
	})
}

// 用户登录
export const login = (data) => {
	return serviceAxios({
		// 请求地址
		url: "/login",
		// 请求方式
		method: "post",
		// post的参数
		data: data
	})
}

//登录是否过期
export const tokenVerify = (username) =>{
 	return serviceAxios({
 		url: "/token_verify",
 		method: "get"
 	})
 }
 


// 获取用户信息： /user/:username
export const getUserInfo = (username) =>{
	return serviceAxios({
		url: "/user/"+username,
		method: "get"
	})
}

export const uploadAvator = (username, data) => {
	return serviceAxios({
		url: "/user/" + username + "/avator",
		method: "post",
		data: data
	})
}

export const logout = (params) => {
	return serviceAxios({
		url:"/logout",
		method: "get",
		params: params
	})
}

export const posts = (params) => {
	return serviceAxios({
		url: "/userposts",
		method: "get",
	})
}

// 用户上传动态
export const uploadPost = (data) => {
	return serviceAxios({
		// 请求地址
		url: "/userposts",
		// 请求方式
		method: "post",
		// post的参数
		data
	})
}

// 用户点赞
export const userLike = (id) =>{
	return serviceAxios({
		url: "/userlike/"+id,
		method: "get"
	})
}

// 用户上传图片
export const uploadImage = (data) => {
	return serviceAxios({
		url: "/upload",
		method: "post",
		data
	})
}