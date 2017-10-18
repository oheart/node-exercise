var express = require('express');
var router = express.Router();

router.get('/:name',function(req,res){
    res.render('users',{
        name: req.params.name
    })
})

module.exports = router;

// 通过调用res.render函数渲染ejs模版，res.render第一个参数是模版的名字，这里是users则会匹配views/users.ejs，
// 第二个参数是传给模版的数据，这里传入name，则在ejs模版中可使用name。res.render的作用就是将模版和数据结合生成
// html，同时设置响应头中的Content-Type:text/html,告诉浏览器我返回的是html，不是纯文本。