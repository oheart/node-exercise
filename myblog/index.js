var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('hello,express');
})

app.listen(3000)

//生成一个express实例app，挂载了一个根路由控制器，然后监听3000端口并启动程序。