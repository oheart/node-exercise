module.exports = {
    port:3000,
    session:{
        secret:'nuanblog',
        key: 'nuanblog',
        maxAage: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/nuanblog',
    redis: 'redis://localhost:6379/0'
}

/**
 *  注：
 *      1. port:程序启动要监听的端口号
 *      2. session:express-session的配置信息
 *      3. mongodb: mongodb的地址，以mongodb://协议开头，nuanblog为db名
 *      4. redis: redis的地址，以redis://协议开头，0为db0  (也可以省略，默认是db0)
 */
