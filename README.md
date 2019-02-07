# Aillo's blog

## Project setup

[View The Blog: http://www.lucario.cn](http://www.lucario.cn)

you should install both the dependences for client and server to run the code~

``` bash
npm install
```

### Compiles and hot-reloads for development

this will start the vue-cli dev server, listening on post:8080

``` bash
npm run serve
```

### Compiles and minifies for production

``` bash
npm run build
```

## Design

### Version1

第一稿的设计主要还是以简洁为主，毕竟开始设计的时候配套的图文还在整理之中，并不清楚最终需要怎样的效果呈现，所以尽量避免了过度设计，不过当最终上线时，暴露出的问题也非常之多，首先就是设计上太过缺乏特色，并不能突出个人特点，就此问题，第二轮的设计以及开始，同时大幅精简代码量，为第二次设计的大改动保驾护航

接下来是分页的设计

#### 首页

![Homeoage](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/homepage.png)

首页还是以简洁为主，配合头部的圆球动画，下滑则显示核心内容与底部导航

#### 菜单页面

##### 第一稿

![HCategory](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/category1.png)

一开始的设计只考虑了文章的部分，觉得这样依旧不错，但是当照片集加入之后，现有的设计显得太过臃肿，难以凸显照片本身，便临时做了二稿

##### 第二稿

![Category](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/category1.png)

二稿更加简洁，删去巨量动画，专注于图文显示，只是缺乏特色

#### 阅读界面

![Category](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/reader.png)

#### 照片界面

![Category](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/viewer.png)

很简洁的界面，原先设计了下滑吸附，但实测效果不佳，删去

#### 高清照片界面

![Category](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/viewer_hd.png)

大图界面，普普通通简简单单

### Version2

on progress...
