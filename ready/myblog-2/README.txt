#模版引擎
    ejs
    includes



#ejs模版3个常用标签
<% code %>   -->运行javascript代码，不输出
<%= code %>  -->显示转义后的HTML内容 （当code 为<h1>hello</h1>这种字符串时，原样输出）
<%- code %>  -->显示原始HTML内容 （当code为<h1>hello</h1>这种字符串时，则会显示H1大的hello 字符串） 