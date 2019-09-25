# vue-house



>在线抢房前后端结合的demo 这本是一个商业项目，计划客户手机H5抢房，大屏上实时显示房源被抢完过程  由于某些原因没有开发完善，请勿用于生产环镜，造成一切损失有使用者自己负责


#### GIF预览


![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/gif.gif)



#### 截图预览

|![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/01.png)| ![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/02.png)| 
| --- | --- |
|![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/03.png)| ![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/04.png)| 
|![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/05.png)| ![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/06.png)| 
|![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/07.png)| ![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/08.png)| 
|![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/09.png)| ![](https://raw.githubusercontent.com/wuyouxin/vue-house/master/jpg/10.png)| 





#### 前后 & 端所有技术
- axios
- better-scroll
- vue
- vue-router
- vue-socket.io
- vuex
- koa
- koa-router
- mongoose
- socket.io
- svg-captcha





#### 前端

``` bash
# install dependencies
cd vue-house && npm i

# serve with hot reload at http:127.0.0.1:8080
npm run dev

```






#### 后端

``` bash
# 安装docker

# docker下安装redis
docker pull redis:4

# docker下启动redis
docker run --name redis -p 6379:6379 -d redis:4 redis-server --appendonly yes

# docker下安装mongodb
docker pull mongo:4.0.2

# docker下启动mongodb
docker run --name mongo -p 27017:27017 -d mongo:4.0.2

#拷贝vue-house-service文件夹下的house-mongo文件夹到docker的mongodb容器里(具体百度)
#进入mongodb docker容器执行导入数据
mongorestore -p 27017 -d house-mongo ./house-mongo

# 启动服务
cd vue-house-service node app

```