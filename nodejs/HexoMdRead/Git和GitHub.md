---
title: Git和GitHub
date: 2019-03-13 16:56:39
tags: git
categories: 软件使用
---

<!--more-->
全世界最大同性交友群GitHub，值得拥有。
## 1.warning: LF will be replaced by CRLF
这个是在windows系统中必见的一个问题。
## 2.代码获取Gist文件最新版本
Gist是Github发布的新功能，主要是用来存放小型代码。结合浏览器插件GistBox，可以打造成一个类似于有道云笔记的笔记。各种好处，我就不说了。知乎上有。我的需求是这样的，在博客中有一个每日一问的版块，需要使用到后台，我想到了使用Gist编写内容，然后通过ajax的方式调用获取数据。https://developer.github.com/v3/gists/#get-a-single-gist ，Gist提供了API供读取相关内容，但是这里面有个问题，是因为api调用的话，会携带大量的history信息，我考虑如果这个文本被修改了很多次，会不会返回的内容很多呢？那有没有直接获取最新版本的Gist的方法呢？回答是有的。
### 1)获取单独的Gist GET /gists/:gist_id
实例：https://api.github.com/gists/bd2afd6e78fd085fe988920343860d20 ，:gist_id是在创建完成Gist之后，在Embed里面用户名之后的一串数字即为这个Gist的id。
{% asset_img Gist.png Gist %}
### 2）获取最新版本的Gist
要获取特定版本的Gist，可以直接点击上图的raw查看地址。
特定版本：https://gist.githubusercontent.com/ <username\> /bd2afd6e78fd085fe988920343860d20/raw/6a450f1ba6d96f24bee0f2cd290e21084a337665/laster.js 
https://gist.githubusercontent.com/<username\> /<gist-id\>/raw/...
在打开的url中去掉raw后面的版本号，即为最新版本的Gist。但是这个请求是有问题的，当你改变了Gist的内容的时候，使用这个地址，并不会立刻得到最新的版本，需要过个几分钟时间，才能得到最新版本的Gist,可能Github服务器太多，反应不过来吧。
最新版本：https://gist.githubusercontent.com/<username\> /bd2afd6e78fd085fe988920343860d20/raw/laster.js
这样就解决了我的问题，可以ajax获取Gist中的内容，呈现在页面中，只要修改Gist的内容，博客不用修改，也可以获取最新的内容，静态博客变成了动态博客。基于这种思想，有人专门开发了一个动态博客，送上链接
https://github.com/GitHub-Laziji/VBlog (不得不感叹，Github上的人才真是太多了，佩服，学习)
## 3.放弃修改
git checkout .
## 4.Windows下删除和修改保存的git密码
有时候在局域网内搭建了一个git服务器，在使用Windows进行远程提交的时候，第一次会弹出框提示输入用户名密码，只需输入一次，windows就自动记住了用户名密码，以后就不用输入了。但是要是不小心输入错误了，怎么办？
进入控制面板->选择用户账户->选择管理你的凭据->选择Windows凭据->选择git保存的用户信息->选择编辑或者进行删除操作
## 5.查看远程仓库地址
git remote -v

## 6.执行git add . 时遇到 warning: You ran 'git add' with neither '-A (--all)' or '--ignore-removal'
在仓库中删除文件后，试图直接用 git add . 将所有删除工作提交暂存区，结果遇到了报错：
```
warning: You ran 'git add' with neither '-A (--all)' or '--ignore-removal',
whose behaviour will change in Git 2.0 with respect to paths you removed.
Paths like 'public/static/js/gis/.TMap.js.swp' that are
removed from your working tree are ignored with this version of Git.

* 'git add --ignore-removal <pathspec>', which is the current default,
  ignores paths you removed from your working tree.

* 'git add --all <pathspec>' will let you also record the removals.

Run 'git status' to check the paths you removed from your working tree.

```
用 git add --all 可以解决问题。

参考文章：
1.git: git add --ignore-removal & git add --all 区别：https://blog.csdn.net/JNingWei/article/details/78494478

## 7.git clone时携带用户名密码
有使用进行远程复制，如果显示remote: User permission denied，就需要在请求的时候，携带上用户名密码：git clone http://邮箱(或用户名):密码@仓库,例如： git clone http://ph-zhenglc:Ph2095@192.168.1.11:3000/phkj/PhEmsGis.git 。 有一个地方要注意，就是如果用户名密码中包含了@字符，可能需要进行转义，用 %40 代替 @ 字符。

参考文章：
1.git clone 克隆远程仓库使用账号密码：http://www.luyixian.cn/news_show_10477.aspx
2.git使用用户名密码clone的方式：https://www.cnblogs.com/shiluoliming/p/9797033.html

## 8.出现gun nano界面
提交的时候，出现了冲突，需要输入合并的理由，但是就是不会操作，需要按Ctrl+X然后输入y,然后再按Ctrl+X就可以了。将编辑器改为vim，使用：git config --global core.editor "vim"

参考文章：
1.git提交后出现nano界面,解决方法：https://blog.csdn.net/wuxing164/article/details/78026101

## 9.修改gitignore后生效
```
git rm -r --cached .  #清除缓存
git add . #重新trace file
git commit -m "update .gitignore" #提交和注释
git push origin master #可选，如果需要同步到remote上的话
```

参考文章：
1.git 修改.gitignore后生效：https://blog.csdn.net/mingjie1212/article/details/51689606

## 10.解决Git中fatal: refusing to merge unrelated histories
在操作后面添加：--allow-unrelated-histories
```
git pull origin master --allow-unrelated-histories
```
参考文章：
1.解决Git中fatal: refusing to merge unrelated histories：https://blog.csdn.net/wd2014610/article/details/80854807