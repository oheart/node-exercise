### 项目目录文件夹说明（遵循了MVC开发模式：模型（model） -- 视图（view） -- 控制器（controller／route））   

    1. models：存放操作数据库的文件  
    2. public：存放静态文件，如样式、图片等  
    3. routes：存放路由文件  
    4. views：存放模版文件  
    5. index.js：程序主文件  
    6. package.json：存储项目名、描述、作者、依赖等等信息  

### 安装依赖模块  

命令：       
    npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session  marked moment    
对应模块的用处：    
    1. express： web框架    
    2. express-session：session中间件    
    3. connect-mongo: 将session存储于mongodb,结合express-session使用    
    4. connect-flash：页面通知提示等中间件，基于session实现    
    5. ejs: 模版    
    6. express-formidable：接收表单及文件等上传中间件    
    7. config-lite：读取配置文件  
    8. marked：markdown解析  
    9. moment：时间格式化  
    10. mongolass: mongodb驱动  
    11. objectid-to-timestamp: 根据ObjectId生成时间戳  
    12. sha1: sha1加密，用于密码加密  
    13. winston:日志 
 
###  app.locals和res.locals区别

app.locals上通常挂载常量信息（如博客名、描述、作者信息），res.locals上通常挂载变量信息，即每次请求可能的值都不一样（如请求作者信息，res.locals.user = req.session.user）;
