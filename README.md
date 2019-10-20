# `AngularTodo`

待办事项应用的前端部分，使用 `Angular 8` 开发。

后端部分在 [nest-todo](https://github.com/TangJinJian/nest-todo) 里。

## 目录说明

- `/src/app/services` 一些服务
- `/src/app/login` 登录组件
- `/src/app/todos` 待办事项组件

## 使用说明

```
# 打开项目目录
cd angular-todo

# 安装依赖 
npm i

# 把代理配置，改成 nest-todo 后端服务的 RESTful APIs 接口 baseURL
# 修改代理文件 src/proxy.conf.json 的 target 属性

# 启动应用
npm run start
```

## 部署

```
# 编译生产代码
npm run build

# 把编译后单页应用，放置到服务器上
# 编译后的文件路径 /dist/angular-todo
```
