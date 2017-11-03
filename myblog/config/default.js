module.exports = {
    port: 3000,
    session:{
        secret: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/myblog'
}

// 配置释义
//     1.port： 程序要监听等端口号
//     2.session：express-session的配置信息
//     3.mongodb: mongodb的地址，myblog为db名


