var User = require('../lib/mongo').User;

module.exports = {
    //注册一个用户
    create: function create(user){
       return User.create(user).exec();
    },
    //通过用户名获取用户信息(使用了addCreatedAt自定义插件--通过_id生成时间戳)
    getUserByName: function getUserByName(name){
        return User 
            .findOne({ name: name })
            .addCreatedAt()
            .exec();
    }
}