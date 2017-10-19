var express = require('express');
var app = express();


app.use(function(req,res,next){
    console.log('1');
    // next();
    next(new Error('haha'));
})

app.use(function(req,res,next){
    console.log('2');
    res.status(200).end();
})

//错误处理
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

// 通过app.use加载中间件，在中间件中通过next将请求传递到下一个中间件，next可接受一个参数接受错误信息，如果使用了
// next()，则会返回错误而不会传递到下一个中间件。


app.listen(3000)









