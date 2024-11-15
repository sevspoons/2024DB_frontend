# 2024DB_frontend

---

### 1.开始

- pnpm包管理

- vite模版:vue3-ts

- 启动项目:local-host
  
  ```
  pnpm install
  pnpm run dev
  ```

---

### 2. 关于食光航迹

这是我们的项目主题,或者说是标题,是一群BUAAer的`DB大作业`,核心任务为开发一个前后端分离的中等规模系统.

饭是生活的重要一部分,我们将致力于整理北航校园中最接地气的美食,为每位同学or老师or参观的友人提供优质餐饮推荐信息,解决大家"这顿吃啥"的这一关乎存亡的问题.

---

### 3. 如何开发---以login页面为例

- 路由-Router 参考src/router目录,配置baseURL/login路由渲染src/views/login
  
  - routre设置:就是告诉项目在http://xxx/login时渲染我在views中编写的login界面,在此渲染活动前后可以进行一系列操作,这里以login相关路由保护为例,router配置路由守卫,检查用户仓库(@store/user),未登录时拒绝访问,重定向到登录页(redirect)

- login页面内容编写
  
  - 现在的项目router配置已经能够正常渲染login,编写login内容是主要工作
  - 页面设计,调用适当的组件即可,不多赘述,建议多使用el-row和el-col进行规划,css样式参考style目录下,以安装sass,推荐使用scss
  - 功能实现,登录操作就是一次简单的与后端的交互
    - baseURL设置: src\api\baseurl.ts,使用请求时,如登录请求base/login/name/password,调用:baseUrlApi(/login/name/password),便于后端地址变动
    - 触发与事件,可以参考login页面已有的,例如现在是用一个登录按钮,绑定了点击事件来尝试登录,根据后端的返回信息判断登录状况髌骨执行相应操作,可以本地调试一遍登录过程
  - 体验优化:页面需要用户有反馈交互,例如已有的账号密码填写检查,登录成功/失败的msg弹窗,当然这一部分并不紧急,后续慢慢优化

- 测试与debug
  
  - 渲染bug: 如果你写出的组件没有出现/组件的位置不符合期待/组件覆盖,大小关系有问题,可以使用浏览器插件vue.js devtool,查看组件数,对于封装的元素若实在不便操作,可以尝试el提供的template插槽,在不行时适当使用:deep选择器甚至:root样式
  - 功能bug,浏览器检查->源代码/来源->左侧localhost/src文件夹中可以找到你的代码,浏览器中可以打断点调试,同时建议适当加入consolo-log甚至err来输出(print大法)
  - 当然,以上操作为个人使用习惯,上述功能均可以通过插件在万能的vscode中集成

- git与上传
  
  - 防冲突:实现协商个人负责页面,提交使用变基,减少直接合并
  - husky,模版包含的husky检查,可能会若commit时出现复杂的提示,可以使用--no-verify,跳过检查

---

### 4.部署到服务器

目前部署使用nginx在服务器端进行反向代理,root路径与index已经配置好,将dist更新到指定位置即可:

- build
  
  ```
  pnpm run build
  ```
  
  在nodem_modules完整,pnpm运行正常时运行,目前没有cdn这一步会比较慢,跑完了之后项目根目录会出现一个dist目录,里面是js/css等静态文件

- sftp
  
  因为nginx是在监听时动态管理网站资源,所以现在只要传个dist即可,使用sftp
  
  ```
  sftp root@47.94.132.118
  (登录过程省略)
  cd /home/SGHJ/front
  put -r the-path-to-dist
  (选择项目中dist的路径,如我的是D:\DB\frontend\2024DB_frontend\dist)
  ```

- 效果检测
  
  http://47.94.132.118:8083
  
  连上去康康你添加的变化有没有更新上去
