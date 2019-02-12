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

##### v1-第一稿

![Category](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/category1.jpg)

一开始的设计只考虑了文章的部分，觉得这样依旧不错，但是当照片集加入之后，现有的设计显得太过臃肿，难以凸显照片本身，便临时做了二稿

##### v1-第二稿

![Category](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/category2.png)

二稿更加简洁，删去巨量动画，专注于图文显示，只是缺乏特色

#### 阅读界面

![Reader](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/reader.jpg)

#### 照片界面

![Viewer](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/viewer.png)

很简洁的界面，原先设计了下滑吸附，但实测效果不佳，删去

#### 高清照片界面

![Viewer_hd](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v1/viewer_hd.png)

大图界面，普普通通简简单单

### Version2

第二版的设计初衷是添加一些个人特色，不过在设计上多次尝试均为达到满意的效果，就改为优化复杂度，提升运行速度的设计优化环节，原先的打算放至V3中解决

#### v2-第一稿

第一稿打算是将宿舍的布局以动画的形式展现出来，但考虑到工作量和移动端适配问题，最终决定放弃，毕竟宿舍不是久住之地，日后换宿舍就会导致设计全部失效也是蛮可惜的

![gen1](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v2/gen1.png)

#### v2-第二稿

第二稿打算走简洁路线，但是过分的设计感并不符合我的特色，否决

![gen1](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v2/gen2.jpg)

#### v2-第三稿

第三稿专注“佳句”一环，打算让它贯穿博客，但考虑到后期内容填充的过量时间消费，取消

![gen1](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v2/gen3.jpg)

#### v2-第四稿

第四稿接近预定的设计定稿时间，就把时间花在了优化页面上，主要以微调配色，字号，css代码，同时降低首页负复杂度，做更好的移动端适配

![gen1](https://github.com/KevinLEEEEEEE/AilloBlog/blob/master/doc/v2/gen4.jpg)

### Version3

Waiting......
