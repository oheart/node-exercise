var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views')); //设置存放模版文件的目录
app.set('view engine','ejs'); //设置模版引擎为 ejs


app.use('/',indexRouter);
app.use('/users',userRouter);

app.listen(3000)










// 简单情况下
// var express = require('express');
// var app = express();

// //访问根路经时，返回hello，express
// app.get('/',function(req,res){
//     res.send('hello,express');
// })
// // 当访问localhost:3000/users/nswbmv路径时，返回hello，nswbmv。
// app.get('/users/:name',function(req,res){
//     res.send('hello, ' + req.params.name);
// })


// app.listen(3000)

//生成一个express实例app，挂载了一个根路由控制器，然后监听3000端口并启动程序。