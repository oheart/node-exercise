## 启动程序 

- 1.node  index
- 2.在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：  

    npm install -g supervisor    

    运行 supervisor --harmony index 启动程序  

##  pm2 

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

## 参考链接

[链接1：nswbmw/N-blog](https://github.com/nswbmw/N-blog)    
[链接2](https://cnodejs.org/topic/523513d3101e57452141d0b1)

