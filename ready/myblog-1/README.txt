#Express
    supervisor

    express.Router

#启动程序 
一、node  index
二、
    在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：
    npm install -g supervisor

    运行 supervisor --harmony index 启动程序