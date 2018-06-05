# i-music

> 一个mpvue开发的i-music小程序,证明mpvue完全有能力开发一个中大型的小程序

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

5、在使用css3 时post会加前缀  导致在微信端报错

#### 推荐库

1、在 mpvue 中使用 vue-router 兼容的路由写法 mpvue-router-patch 

2、兼容小程序的  fly

#### 

使用 mpvue 开发小程序，你将在小程序技术体系的基础上获取到这样一些能力：

彻底的组件化开发能力：提高代码复用性

完整的 Vue.js 开发体验

方便的 Vuex 数据管理方案：方便构建复杂应用

快捷的 webpack 构建机制：自定义构建策略、开发阶段 hotReload

支持使用 npm 外部依赖

使用 Vue.js 命令行工具 vue-cli 快速初始化项目

H5 代码转换编译成小程序目标代码的能力
