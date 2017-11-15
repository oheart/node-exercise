const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router();

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

//GET /signup 注册页
router.get('/', checkNotLogin, function(req, res, next){
    res.render('signup')
})
//POST /signup 用户注册
router.post('/', checkNotLogin, function(req, res, next){
    const name = req.fields.name
    let password = req.fields.password
    const repassword = req.fields.repassword
    const gender = req.fields.gender
    const avatar = req.files.avatar.path.split(path.sep).pop()
    const bio = req.fields.bio

    try{
        if(!(name.length >=1 && name.length <= 10)){
            throw new Error('名字请限制在 1-10 个字符')
        }
        if(password.length < 6){
            throw new Error('密码至少 6 个字符')
        }
        if(password !== repassword){
            throw new Error('两次输入密码不一致')
        }
        if(['m', 'f', 'x'].indexOf(gender) === -1){
            throw new Error('性别只能是 m、f 或 x')
        }
        if(!req.files.avatar.name){
            throw new Error('缺少头像')
        }
        if(!(bio.length >=1 && bio.length <= 30)){
            throw new Error('个人简介请限制在 1-30 个字符')
        }
    }catch(e){
        //注册失败，异步删除上传的头像
        fs.unlink(req.files.avatar.path)
        req.flash('error', e.message)
        return res.redirect('/signup')
    }

    //生成salt 的迭代次数
    const saltRounds = 10;

    //生成salt并获取hash值
    bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(password,salt, function(err, hash){
            //把hash值赋值给password变量
            password = hash;
            storeUInfo();
        })
    })

    //存储用户信息
    function storeUInfo(){
        let user = {
            name: name,
            password: password,
            gender: gender,
            avatar: avatar,
            bio: bio
        }
        //用户信息写入数据库
        UserModel.create(user)
            .then(function(result){
                //此时user是插入mongodb后的值，包含_id
                user = result.ops[0];
                //删除密码这种敏感信息，将用户信息存入session
                delete user.password
                req.session.user = user;
                //写入flash
                req.flash('success','注册成功');
                //跳转到首页
                res.redirect('/posts')
            })
            .catch(function(e){
                //注册失败，异步删除上传的头像
                fs.unlink(req.files.avatar.path)
                //用户名被占用则跳回注册页，而不是错误页
                if(e.message.match('duplicate key')){
                    req.flash('error','用户名已被占用')
                    return res.redirect('/signup')
                }
                next(e)
            })
    }



})

module.exports = router
