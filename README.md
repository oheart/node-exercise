# node-exercise
practice  node by doing something

#参考链接
https://github.com/nswbmw/N-blog

https://cnodejs.org/topic/523513d3101e57452141d0b1

#启动程序 
一、node  index
二、
    在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：
    npm install -g supervisor

    运行 supervisor --harmony index 启动程序

#ejs模版3个常用标签
<% code %>   -->运行javascript代码，不输出
<%= code %>  -->显示转义后的HTML内容 （当code 为<h1>hello</h1>这种字符串时，原样输出）
<%- code %>  -->显示原始HTML内容 （当code为<h1>hello</h1>这种字符串时，则会显示H1大的hello 字符串） 

