##启动程序(开发过程中)
1. node index
2. supervisor (解决每次修改代码保存后都需要手动重启程序，才能查看变动的效果)
- 全局安装 supervisor -->  npm i -g supervisor 
- 运行 supervisor index 启动博客，访问以下地址查看效果：  
    - http://localhost:3000/posts  
    - http://localhost:3000/signout  
    - http://localhost:3000/signup  
##  app.locals 和 res.locals
- 优先级： res.render传入的对象 > res.locals对象 > app.locals对象
- 使用上的区别：
    - app.locals上通常挂载常量信息（比如博客名、描述、作者这种不会变的信息）
    - res.locals上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）
## 各部分模型设计（数据字典）
1. 用户模型设计 --> User
    - 用户的名称        --> name {type: 'string'}
    - 密码（加密后的）   --> password {type: 'string'}
    - 头像             --> avatar {type: 'string'}
    - 性别             --> gender {type: 'string', enum: ['m', 'f', 'x']}
    - 个人简介          --> bio {type:'string'}
2. 文章模型设计 --> Post
    - 作者id            -->   author:{ type: Mongolass.Types.ObjectId}
    - 标题              -->   title:{ type:'string' }
    - 正文              -->   content: { type: 'string'}
    - 点击量            -->   pv: { type:'number' }
3. 留言模型设计
    - 作者              -->   author: { type: Mongolass.Types.ObjectId }
    - 留言内容           -->   content: { type:'string'}
    - 关联的文章id       -->   postId: { type: Mongolass.Types.ObjectId }
## mongolass
[npm mongolass](https://www.npmjs.com/package/mongolass)
[从零开始写一个 Node.js 的 MongoDB 驱动库](https://zhuanlan.zhihu.com/p/24308524)
## 个别功能
1. 分页
2. 留言，二级评论留言
