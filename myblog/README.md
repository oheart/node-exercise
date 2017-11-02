## 项目目录文件夹说明（遵循了MVC开发模式：模型（model） -- 视图（view） -- 控制器（controller／route））   

    1. models：存放操作数据库的文件  
    2. public：存放静态文件，如样式、图片等  
    3. routes：存放路由文件  
    4. views：存放模版文件  
    5. index.js：程序主文件  
    6. package.json：存储项目名、描述、作者、依赖等等信息  


## 安装依赖模块 


命令：         
npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session  marked moment      
对应模块的用处：      
-  express： web框架    
-  express-session：session中间件    
-  connect-mongo: 将session存储于mongodb,结合express-session使用    
-   connect-flash：页面通知提示等中间件，基于session实现    
-   ejs: 模版    
-   express-formidable：接收表单及文件等上传中间件    
-  config-lite：读取配置文件  
-  marked：markdown解析  
-   moment：时间格式化  
-   mongolass: mongodb驱动  
-   objectid-to-timestamp: 根据ObjectId生成时间戳  
-   sha1: sha1加密，用于密码加密  
-   winston:日志 
 

## app.locals和res.locals区别


app.locals上通常挂载常量信息（如博客名、描述、作者信息），res.locals上通常挂载变量信息，即每次请求可能的值都不一样（如请求作者信息，res.locals.user = req.session.user）;



## pm2 


-  Nodejs下的生产环境进程管理工具，可以用来在生产环境中进行自动重启、日志记录、错误预警等。  
    - 全局安装pm2   
        npm install pm2 -g  
    - 修改package.json,添加start命令  
        *package.json*  
            "scripts": {
                "start": "NODE_ENV=production pm2 start index.js --node-args='--harmony' --name 'myblog'"
            }
    - npm start 通过 pm2 启动程序  
- npm2常见命令
    - npm2  start/stop :启动/停止程序
    - npm2  reload/restart [id|name]:重启程序
    - pm2   logs [id|name]:查看日志
    - pm2   l/list:列出程序列表
    - 更多命令可使用 pm2 -h 查看。