const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

//GET /signin   登录页
router.get('/', checkNotLogin, function(req, res, next){
    res.render('signin')
})

//POST /signin  用户登录
router.post('/', checkNotLogin, function(req, res, next){
    const name = req.fields.name
    const password = req.fields.password

    UserModel.getUserByName(name)
    .then(function(user){
        if(!user){
            req.flash('error','用户不存在')
            return res.redirect('back')
        }
        //检查密码是否匹配,匹配则跳转到主页，不匹配则提示错误
        bcrypt.compare(password, user.password,function(err,res){
           const pwdMatchFlag = res;
           tryLogin(pwdMatchFlag);
        })
        //尝试登录
        function tryLogin(pwdMatchFlag){
            if(pwdMatchFlag){
                req.flash('success','登录成功')
                //用户信息写入session
                req.session.user = user;
                //跳转到主页
                res.redirect('/posts')
            }else{
                req.flash('error','用户名或密码错误')
                return res.redirect('back')
            }
        }

    })
    .catch(next)
})

module.exports = router
