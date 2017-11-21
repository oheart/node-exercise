const { URL } = require('url')
const express = require('express');
const router = express.Router();

const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin;

//GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/',function(req, res, next){
    const author = req.query.author;
    //当前页
    const page = parseInt(req.query.page) || 1;
    //每页显示多少条
    const perPage = 5;

    Promise.all([
        PostModel.getPosts(author, page, perPage),
        PostModel.getCount(author),
    ])
        .then(function(result){
            var pageNum = Math.ceil(result[1] / perPage);

            res.render('posts',{
                posts: result[0],      //获取所有文章
                count: result[1],      //总条数
                page: page,           //当前页
                pageNum: pageNum,     //总页数
                author: author      //获取作者信息
            })
        })
        .catch(next)


})



//GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next){
    res.render('create')
})

//POST /posts/create 发表一篇文章
router.post('/create', checkLogin, function(req, res, next){
    const author = req.session.user._id
    const title= req.fields.title
    const content = req.fields.content

    //校验参数
    try{
        if(!title.length){
            throw new Error('请填写标题')
        }
        if(!content.length){
            throw new Error('请填写内容')
        }
    }catch(e){
        req.flash('error', e.message)
        return res.redirect('back')
    }
    let post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    }
    PostModel.create(post)
        .then(function(result){
            //此时post是插入mongodb后的值，包含_id
            post = result.ops[0];
            req.flash('success','发表成功');
            //发表成功后跳转到该文章页
            res.redirect(`/posts/${post._id}`)
        })
        .catch(next)

})

//GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function(req, res, next){
    const postId = req.params.postId

    Promise.all([
        PostModel.getPostById(postId),  //获取文章信息
        CommentModel.getComments(postId), //获取该文章所有留言
        PostModel.incPv(postId)     //pv加1
    ])
        .then(function(result){
            const post = result[0]
            const comments = result[1]
            if(!post){
                throw new Error('该文章不存在')
            }
            res.render('post',{
                post: post,
                comments: comments
            })
        })
        .catch(next)
})

//GET /posts/:postId/edit 更新文章页
router.get('/:postId/eidt', checkLogin, function(req, res, next){
    const postId = req.params.postId
    const author = req.session.user._id

    PostModel.getRawPostById(postId)
        .then(function(post){
            if(!post){
                throw new Error('该文章不存在')
            }
            if(author.toString() !== post.author._id.toString()){
                throw new Error('权限不足')
            }
            res.render('edit',{
                post: post
            })
        })
        .catch(next)
})


//POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next){
    const postId = req.params.postId
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content

    PostModel.getRawPostById(postId)
        .then(function(post){
            if(!post){
                throw new Error('文章不存在')
            }
            if(post.author._id.toString() !== author.toString()){
                throw new Error('没有权限')
            }
            PostModel.updatePostById(postId,{ title: title, content: content })
                .then(function(){
                    req.flash('success','编辑文章成功')
                    //编辑成功后跳转到上一页
                    res.redirect(`/posts/${postId}`)
                })
                .catch(next)
        })
})

//GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next){
    const postId = req.params.postId
    const author = req.session.user._id

    PostModel.getRawPostById(postId)
        .then(function(post){
            if(!post){
                throw new Error('文章不存在')
            }
            if(post.author._id.toString() !== author.toString()){
                throw new Error('没有权限')
            }
            PostModel.delPostById(postId)
                .then(function(){
                    req.flash('success','删除文章成功');
                    //删除成功后跳转到主页
                    res.redirect('/posts')
                })
                .catch(next)
        })
})

//POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next){
   const author = req.session.user._id
   const postId = req.params.postId
   const content = req.fields.content
   const replyId = req.fields.replyId;


    const comment = {
        author: author,
        postId: postId,
        content: content
    }

    if(replyId){
        comment.replyId = replyId
    }
   CommentModel.create(comment)
        .then(function(){
            req.flash('success','留言成功');
            //留言成功后跳转到上一页
            res.redirect('back')
        })
        .catch(next)
})

//GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next){
    const commentId = req.params.commentId
    const author = req.session.user._id

    CommentModel.delCommentById(commentId, author)
        .then(function(){
            req.flash('success','删除留言成功');
            //删除成功后跳转到上一页
            res.redirect('back')
        })
        .catch(next)
})

module.exports = router
