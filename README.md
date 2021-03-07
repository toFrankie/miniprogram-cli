# 说明

### 背景

由于平常做小程序开发，几乎不使用小程序开发工具进行代码的编写，而是使用 VS Code。这样的话，创建新页面或者自定义组件时，就得切换回小程序开发工具，使用其内置的 Page 或 Component 创建功能。

So...写了一个 CLI 命令来创建模板吧，也很简单。

主要利用 [Inquirer.js](https://github.com/SBoudrias/Inquirer.js#readme) （一个交互式命令行操作工具）和 Node.js 的 [fs](http://nodejs.cn/api/fs.html#fs_file_system) 文件系统来处理即可。

### 待完善

由于时间问题，目前 CLI 实现的功能很有限，没有做太多东西，后面再加入其它一些东西...

例如：
* 支持支付宝小程序、百度小程序等；
* 在 app.json 配置文件加入新建页面；
* ...

### Usage

```shell
$ yarn install

$ yarn run create

  yarn run v1.22.10
  $ node cli
  ? 请选择模板类型 pages
  ? 请输入模板名称 home

  🎉🎉🎉
  模板创建成功，位于：pages/home/home
    ____  _   _  ____ ____ _____ ____ ____
   / ___|| | | |/ ___/ ___| ____/ ___/ ___|
   \___ \| | | | |  | |   |  _| \___ \___ \
    ___) | |_| | |__| |___| |___ ___) |__) |
   |____/ \___/ \____\____|_____|____/____/

  ✨  Done in 10.73s.
```