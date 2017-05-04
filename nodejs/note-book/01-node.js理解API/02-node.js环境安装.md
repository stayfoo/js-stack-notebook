# node.js环境安装
## 一、node.js安装
### 1.1 `Mac` 上面搭建`node.js`开发环境.

>方法步骤：
>>- 步骤一：安装`Xcode`
>>- 步骤二：安装`Homebrew`
>>>> `macOS` 不可或缺的套件管理器：[Homebrew 主页](http://brew.sh)
>>>> 打开终端窗口，粘贴脚本，确认执行安装：
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
>>- 步骤三： 安装`node.js`
>>> 方法一：
>>>>- 使用`Homebrew`安装`nodejs`，输入命令
```bash
brew install nodejs #安装
node --version      #查看 node版本
```
>>> 方法二：
>>>> 从[nodejs.org](https://nodejs.org/en/)下载`Macintosh Installer node-v4.6.1.pkg`，下载之后点击安装。
它将在你的`Mac`上面安装`Node.js`和`npm`（`node package manager`）。
安装成功后就可以使用`node`和`npm`命令了。

### 1.2 安装`mongodb`

```bash
brew install mongodb # 安装
mongo --version    # 查看mongodb的版本
```

### 1.3 测试一下`Node.js`

> （1）使用`vim`编辑器创建一个简单的`js`文件，打印`“Hello, Node”`
>>- 在目标目录创建`test.js`文件，输入命令：
`vi test.js`
>>- 并编辑js代码：
`console.log('Hello, Node');`
>>- 编辑完成，退出`vim`编辑器。
>
> （2）使用`node`运行`test.js`，输入命令：
`node test.js`
执行`js`成功，命令行打印`“Hello, Node”`。

## 二、node.js实用工具
### 1、npm 包管理器
#### 1.1 介绍
`node package manager` (`npm`)

>`npm` 之于 `node.js`, 可以对比：
>>- `pip`  之于 `Python`，
>>- `gem`  之于 `Ruby`,  
>>- `pear` 之于 `PHP`,   
>>- `CPAN` 之于 `Perl` 
>>- `apt-get` 之于 `Debian`/`Ubutnu`,
>>- `yum`之于`Fedora`/`RHEL`/`CentOS`，
>>- `homebrew` 之于 `Mac OS X` 

> 如果你熟悉`Ruby`的`gem`或者`Python`的`pip`，你会发现`npm`与它们的行为不同，`gem`或`pip`总是以全局模式安装，使包可以供所有的程序使用
> 
> 而`npm`默认会把包安装到当前目录下。

> 包安装全局：
>> 优点：可以提高程序的重复利用程度，避免同样的内容的多份副本。
>>
>> 缺点：难以处理不同的版本依赖。

> 包安装当前目录：
>> 优点：不会有不同程序依赖不同版本的包的冲突问题，同时还减轻了包作者的`API`兼容性压力。
>>
>> 缺点：同一个包可能会被安装许多次。

默认安装`node.js`的时候，会连带一起安装`npm`。
```bash
# 更新最新版本
npm install npm -g
```

初始化， 会创建一个 `package.json`文件 
```bash
npm init -y
```

安装一个模块，并保存到 `package.json` 中
```bash
npm install -S jquery
```

#### 1.2 注意

* `npm`在默认情况下会从`http://npmjs.org`搜索或下载包，将包安装到当前目录的`node_modules`子目录下。

* 使用全局模式安装的包，并不能直接在`JavaScript`文件中用`require`获得，因为`require`不会搜索`/usr/local/lib/node_modules/`

#### 1.3 使用

`npm link` 命令：功能在本地包和全局包之间创建符号链接。

> (1) 把全局包当本地包来使用：
>>- 使用全局模式安装的包不能直接通过`require`使用，但通过`npm link`命令可以打破这一限制。

```bash
# 全局安装 `express`
npm install -g express
# 然后工程目录下运行
npm link express

# ./node_modules/express
# /usr/local/lib/node_modules/express
# 可以在`node_modules`子目录中发现一个指向安装到全局的包符号链接。
# 通过这种方法，我们就可以把全局包当本地包来使用。 
``` 

> (2) 把本地包链接到全局：
>>- 使用`npm link`命令还可以将本地的包链接到全局。
>>- 使用方法：在包目录（`package.json`所在目录）中运行`npm link`命令。
>>- 如果我们要开发一个包，利用这种方式可以非常方便地在不同的工程间进行测试。

#### 1.4 `npm`包发布

> 注册账号：
```bash
npm adduser
```

> 验证账号：
```bash
npm whoami
```

> 发布,在`package.json`目录下运行：
```bash
npm publish
```

> 版本更新： 只需要在`package.json`文件中修改`version`字段，然后重新使用`npm publish`命令就行了。

> 如果你对已发布的包不满意，取消发布：
```bash
npm unpublish
```

### 2、nodejs多版本管理器
#### 2.1 安装

工具：`n`   下载链接：https://github.com/visionmedia/n 

>方式1：
下载源代码,命令安装。
`bash`脚本：
```bash
make install
```

>方式2：
```bash
npm install -g n
```

#### 2.2 使用

> 安装任意发布版本的`node.js`，运行命令： 
```bash
n 版本号
```

> 列出已经安装的所有版本的`node.js` ，运行命令：
```bash
n
``` 
> 其中，“`*`”后的版本号为默认的`node.js`版本; 
> 切换默认环境，运行命令：
```bash
n 版本号
```
> 不切换环境，直接指定`node.js`运行环境，运行命令：
```
n use 版本号 script.js
```

#### 2.3 注意
> （1）`n`会从 `http://nodejs.org` 下载源代码包，然后自动编译安装;

> （2）通过`n`获取的`node.js`实例都会安装在 `/usr/local/n/version/` 目录中;

> （3）`n`无法管理通过其他方式安装的`node.js`版本实例 （如官方提供的安装包、发行版软件源、手动编译），必须通过`n`安装`node.js`才能管理多版本的`nodejs`


### 3、supervisor

> 用途：
>> 监视代码的改动，并自动重启 `node.js` .

```bash
npm install -g supervisor
sudo npm install -g supervisor # npm 会将 supervisor 安装到系统目录，需要管理员授权。

# 启动app.js：
supervisor app.js 
```



