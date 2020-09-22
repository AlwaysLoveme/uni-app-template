const env_url = "";  // 测试环境
const prod_url = ""; // 生产环境
const BASEURL = process.env.NODE_ENV === 'development' ? env_url : prod_url;
const API = {
    BASEURL, // base-url

    uploadImage: 'https://img.shunluzhidi.com', // 上传图片
};
export default API;
