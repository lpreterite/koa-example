# koa-example
一个基于koa2的网站例子

## 快速开始
```
$ npm i
$ sequelize db:migrate
$ sequelize db:seed:all
$ npm run start
```

## 断点测试
```
$ npm run debug
# or
$ node-inspector -p 5859

# output
Node Inspector v0.12.8
Visit http://127.0.0.1:5859/?port=5858 to start debugging.
```

在浏览器打开`http://127.0.0.1:5859/?port=5858`便可进行调试了:)

## 自动测试
```
$ npm run test
```