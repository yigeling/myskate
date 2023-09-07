// 不管是开发环境还是测试环境或线上环境统一的配置信息

const serverConfig = {
  baseURL: "/api", // 请求基础地址,可根据环境自定义
  // useTokenAuthorization: true, // 是否开启 token 认证
};
export default serverConfig;