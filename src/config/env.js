// 请求地址 (本地, 部署请使用 nginx 转发)
let basePath = "http://localhost:8998/api";
// 转发代理地址
let proxyPath = '/api';
// 文件上传地址统一配置
let uploadPath = proxyPath + '/api/open/file/upload?resType=2&filePath=';

// 启动输出
console.debug("当前 请求服务器地址: " + basePath);
console.log("当前 转发代理地址: " + proxyPath);
console.log("当前 文件上传地址: " + uploadPath);

module.exports = {
    basePath,
    proxyPath,
    uploadPath,
};
