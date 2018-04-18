# i-music

> 一个mpvue开发的i-music小程序

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### mpvue遇到的坑

1、slot里面包括自定义组件，会不显示

2、e的事件直接取不到touches，需要const touch = e.touches ? e.touches[0] : e['mp'].touches[0] 兼容

3、在slot使用中，会出现微信开发工具把solt id 报错的情况，需要重启项目

4、在遇到莫名其妙的问题时，可以尝试重启微信开发工具


#### 推荐库

1、在 mpvue 中使用 vue-router 兼容的路由写法 mpvue-router-patch 

2、兼容小程序的  fly