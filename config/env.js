//根据不同的环境更改不同的baseUrl
let baseUrl = '';

if (process.env.NODE_ENV == 'development') {   // 开发
    baseUrl = 'http://wjs9234usa.miczero.cn/';

} else if (process.env.NODE_ENV == 'production') {   // 生产
    baseUrl = 'http://wjs9234usa.miczero.cn/';
}

export {
    baseUrl, //导出baseUrl
}