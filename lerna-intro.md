# lerna入门

[TOC]

## 多package管理面临的问题

早期的刀耕火种阶段，没有什么自动化的工具。发布package时，都是手动修改**版本号**。如果packages数量不多还可以接受。但是当数量逐渐增多，且这些packages之间还有依赖关系时，就很痛苦了。工序繁琐，耗时费力。

举个例子，如果要维护module-1,module-2两个package，其依赖关系如下：

```json
//module-a/package.json
{
    "name": "module-a",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
    	"test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "keywords": \[\],
    "author": "",
    "license": "ISC"
}
```

```json
// module-b/package.json
{
    "name": "module-b",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "keywords": \[\],
    "author": "",
    "license": "ISC",
    "dependencies": {	
    	"module-2": "^1.0.0"
    }
}
```

在这种场景下，module-b依赖module-a。这时如何更新module-a？需要先修改module-a版本号并发布。然后修改module-b的依赖关系和版本并发布。如果依赖关系更复杂，可以想想发布的工作量有多大。



## 什么是lerna?

lerna是什么呢？其官网上是这样描述的。它用于管理包含多个package（可理解为功能模块或子项目）结构的代码仓库的工具，优化工作流。

> A tool for managing JavaScript projects with multiple packages.

### 适用场景

+ 当存在一个含有多个package的monorepo

- 管理这些package的版本与发布时
- 管理package共用的代码规范等配置时
- 管理package共用的依赖时

引入lerna后，可以实现：

1. 自动解决packages之间的依赖关系
2. 通过`git` 检测文件改动，自动发布
3. 根据`git` 提交记录，自动生成CHANGELOG

### 工作模式

lerna有两种工作模式，Independent mode和Fixed/Locked mode，在这里介绍可能会对初学者造成困扰，但因为实在太重要了，还是有必要提一下的。

- **fixed/locked(默认)**

  固定模式。该模式为单版本号，在根目录中的`lerna.json`中设置。当使用`lerna publish`时，如果自从上次发布后有模块改动，那么将会更新到新发布的版本。lerna是把工程当作一个整体来对待。每次发布packages，都是**全量发布**，无论是否修改。

  目前[Babel](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel)也采用该模式，想要自动整合不同包的版本时使用这个模式。特点是任何package的major change均会导致**所有包**都会进行major version的更新。

- **independent**

  ```
  lerna init --independent
  ```

  独立模式。该模式中允许开发者独立管理多个包的版本更新。每次发布时，会得到针对每个包改动(patch, minor, major custom change)的提示。lerna会配合git，检查文件变动，只发布有改动的package。将`lerna.json`中的`version`键设为`independent`来启用独立模式。




## 命令行

### 命令

| command                     | value                                                        | options                                                      |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `lerna init`                | 创建一个新的lerna项目或将已存在项目改造为lerna项目           | `--independent`/`-i`                                         |
| `lerna bootstrap`           | 当使用`yarn`并开启了`workspace`时等价于在根目录执行`yarn install` |                                                              |
| `lerna import <pathToRepo>` | 将本地路径`<pathToRepo>`中的包导入到`packages/<directory-name>`，并提交操作记录 |                                                              |
| `lerna publish`             | 对更新后的包发布新版本；使用新版本号标记；升级所有npm和git中的库 | `--npm-tag [tagname]`, `--canary/-c`, `--skip-git`, `--force-publish [packages]` |
| `lerna change`              | 检查自上次发布以来改动的包                                   |                                                              |
| `lerna diff [package?]`     | 比较自上次发布以来的所有或指定的包                           |                                                              |
| `lerna run [script]`        | 在每个包中执行一个npm script                                 |                                                              |
| `lerna ls`                  | 列出当前lerna项目中的public包                                |                                                              |



### 过滤器

用来过滤命令执行时的范围，详见[`@lerna/filter-options`](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lerna%2Ffilter-options)

| filter            | description                   |
| ----------------- | ----------------------------- |
| `--scope <glob>`  | 仅包含glob所匹配到的package   |
| `--ignore <glob>` | 排除glob匹配到的package       |
| `--no-private`    | 排除私有package，默认是包含的 |



## 全局配置

在项目根目录的`lerna.json`中设置lerna的相关配置。

```json
{
  "version": "1.0.0",
  "npmClient": "yarn",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"]
    }
  },
  "packages": [
    "packages/*"
  ]
}
```

常用的字段：

| key                             | value                                                        |
| ------------------------------- | ------------------------------------------------------------ |
| `version`                       | 当前仓库版本，当设为`independent`时开启独立模式              |
| `npmClient`                     | 执行命令的client，默认为`npm`，可以设为`yarn`                |
| `command.publish.ignoreChanges` | 设置不会包含进`lerna change/publish`操作的文件路径，使用它来避免一些非重要改动时的版本更新，比如更新`README.md`中的拼写错误 |
| `packages`                      | 用于定位package的文件路径                                    |



### yarn workspace

lerna与yarn的[`workspace`](https://link.juejin.im/?target=https%3A%2F%2Fyarnpkg.com%2Fen%2Fdocs%2Fworkspaces)特性很好的融合在了一起，前者负责`版本管理与发布`，后者负责`依赖管理`。

`workspace`的特点：在所有workspaces所匹配的项目路径下会执行统一的yarn命令，包含测试、安装依赖或执行脚本。

在lerna中启用workspace：

1. `lerna.json`中lerna的设置

   ```json
   {
     ...
     "npmClient": "yarn",
     "useWorkspaces": true,
     ...
   }
   ```

   lerna与`yarn workspace`有很好的相性，设置`useWorkspaces`等价于使用`bootstrap`命令的`--use-workspaces`选项，详情见[bootstrap](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Flerna%2Flerna%2Fblob%2Fmaster%2Fcommands%2Fbootstrap%2FREADME.md%23--use-workspaces)

2. 根目录下的`package.json`

   ```json
   {
     ...
     "private": true,
     "workspaces": [
       "packages/*"
     ],
     ...
   }
   ```

   `"private": true`是必须的，`workspaces`为工作空间中所包含的项目路径，详见[workspace](https://link.juejin.im/?target=https%3A%2F%2Fyarnpkg.com%2Fen%2Fdocs%2Fworkspaces)

注意: 若开启了workspace功能，则lerna会将`package.json`中`workspaces`中所设置的项目路径作为`lerna packages`的路径，而不会使用`lerna.json`中的`packages`值。相关源码：

```js
get packageConfigs() {
    if (this.config.useWorkspaces) {
      const workspaces = this.manifest.get("workspaces");
        ...
      return workspaces.packages || workspaces;
    }
    return this.config.packages || [Project.PACKAGE_GLOB];
  }
```

也就是说，如果使用`workspace`时未开启`useWorkspaces`，则`yarn`与`lerna`会分别管理对应的项目路径。

以[vue-cli](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-cli)为例，它的`lerna.json`配置:

```json
{
  "npmClient": "yarn",
  "useWorkspaces": false,
  "version": "3.2.1",
  "packages": [
    "packages/@vue/babel-preset-app",
    "packages/@vue/cli*"
  ]
}
```

根目录下的`package.json`:

```json
{
  "private": true,
  "workspaces": [
    "packages/@vue/*",
    "packages/test/*",
    "packages/vue-cli-version-marker"
  ],
  ...
}
```

它将`useWorkspaces`设为了false，那么意味着使用`yarn`管理的是`package.json`中`workspaces`所对应的项目路径下的依赖，有`@vue`下的所有项目，`test`中的测试文件和`vue-cli-version-marker`。而`leran`管理的是`lerna.json`中`packages`所对应的`@vue/babel-preset-app`和`@vue/cli*`的版本与发布。

而在`nuxt`中则是`lerna`与`yarn workspace`均采用了相同的package路径。



## 依赖管理

下面所操作的`lerna`项目默认开启了`useWorkspaces`

### 初始化

1. 安装lerna与初始化lerna项目。

2. 将package的`name`设置成统一的`@repo/module`的格式，在这里就是`@monorepo/module-a`

   ```json
   {
     "name": "@yourrepo/module-a",
     "version": "1.0.0",
     "main": "index.js",
     "license": "MIT",
     "dependencies": {}
   }
   ```

   

### 依赖的安装与移除

1. 添加所有package中的依赖

   ```
   lerna add dep-name
   ```

   会将`dep-name`包安装到packages所包含的package中。

2. 移除所有package中的依赖

   ```
   lerna exec -- yarn remove dep-name
   ```

   移除packages所包含的package中的`dep-name`包。

3. 给指定package中添加依赖

   ```
   lerna add dep-name --scope module-a
   ```

   在`module-a`package中添加的`dep-name`包，使用`--scope`命令限定目标package范围。

   也可以手动修改

4. 移除指定package中的依赖

   lerna目前并没有`remove`这种命令，需要在对应package的`package.json`中删除对应依赖，然后执行`lerna bootstrap`即可。

5. 在package中引入相邻依赖

   目前的项目结构如下：

   ```
   monorepo/
       packages/
           module-a/
           module-b/
   ```

   如果想在`module-b`中引入`module-a`，执行如下命令即可

   ```
   lerna add @monorepo/module-a --scope @monorepo/module-b
   ```

### 执行npm script

1. 执行所有package中的`scripts`命令

   使用lerna的`run`命令就可以在每个package中执行所包含的对应脚本，前提是需要先在package中写好公共的`scripts`。

   比如，若每个package均有`test`script

   ```json
   "name": "@monorepo/module-a",
   "scripts": {
       "test": "jest"
   }
   ```

   则使用如下命令即可在每个package内执行测试：

   ```
   lerna run test --stream
   ```

2. 执行指定package中的scripts命令

   需要使用`--scope`过滤器来限定作用范围

   比如，在project-alpha的`package.json`中：

   ```json
   {
     "name": "project-alpha",
     "version": "1.0.0",
     "main": "index.js",
     "scripts": {
       "dev": "node index.js"
     }
   }
   ```

   运行它的`dev`命令需用下面的语句：

   ```
   lerna exec --scope project-alpha -- yarn run dev
   ```

>  如果要用npm script 执行某个package中的可执行文件，需要单独设置依赖。并且，在package的`package.json`中，一般还需设置在runtime需要的依赖和一些公共的`scripts`。



## 工作流

### 环境配置

Lerna的主要功能可以分为：`版本控制`与`发布`，需要与npm(或yarn)和git一同使用。

- **Git**
  在一个lerna工程里，是通过git来进行代码管理的。所以你首先要确保本地有正确的git环境。
  如果需要多人协作开发，请先创建正确的git中心仓库的链接。
  因此需要你了解基本的git操作，在此不再赘述。
- **npm仓库**
  无论你管理的package是要发布到官网还是公司的私有服务器上，都需要正确的仓库地址和用户名。
  你可运行下方的命令来检查，本地的npm `registry`地址是否正确。

```
npm config ls
```

- **lerna**
  你需要全局安装lerna工具。

```
npm install lerna -g
或
yarn global add lerna
```



### 初始化 Lerna 工程

1. **在指定目录，如`d:\` 下创建一个空的文件夹，命名为`lerna-demo**`

```
> mkdir lerna-demo
```

2. **进入相关目录，进行初始化。**

```
> cd d:/lerna-demo
> lerna init
```

执行成功后，目录下将会生成这样的目录结构。

```
 - packages(目录)
 - lerna.json(配置文件)
 - package.json(工程描述文件)
```

3. **添加一个测试package**

> 默认情况下，package是放在`packages`目录下的。

```
// 进入packages目录
cd d:/lerna-demo/packages
// 创建一个packge目录
mkdir module-a
// 进入module-a package目录
cd module-a
// 初始化一个package
yarn init
```

执行完毕，工程下的目录结构如下：

```
--packages
	--module-a
		package.json
--lerna.json
--package.json
```

4. **安装各packages依赖**

在测试package中，module-a没有任何依赖。在module-a的`package.json` 文件中添加一些第三方库的依赖。并采用以下命令安装。这步操作，官网上是这样描述的。

> Bootstrap the packages in the current Lerna repo. Installs all of their dependencies and links any cross-dependencies.

```
cd d:/lerna-demo
lerna bootstrap
```


执行完该命令后，module-a的依赖已经安装上了。

5. **发布**

在现在发布时需要`git` 工具配合。在发布之前，确认该lerna工程是否已经连接到git的远程仓库。可以执行下面的命令进行查看。

```
> git remote -v
origin  https://github.com/inier/lerna-demo.git (fetch)
origin  https://github.com/inier/lerna-demo.git (push)   //代码的托管地址
```

>  如果没有成功与远程仓库链接，请先在创建一个空的github仓库，然后根据相关提示信息，进行链接。

确认有远程仓库的链接信息后，执行发布命令。

```
lerna publish
```

执行这条命令，如何根据提示，一步步的完成packages发布。

```
 -  Run the equivalent of  `lerna updated`  to determine which packages need to be published.
 -  If necessary, increment the  `version`  key in  `lerna.json`.
 -  Update the  `package.json`  of all updated packages to their new versions.
 -  Update all dependencies of the updated packages with the new versions, specified with a  [caret (^)](https://docs.npmjs.com/files/package.json#dependencies).
 -  Create a new git commit and tag for the new version.
 -  Publish updated packages to npm.
```



## 采用统一的规范配置

1. 以husky和prettier为例

   ```
   yarn add --dev husky prettier lint-staged -W
   ```

   使用`-W`选项会将依赖安装到`workspace`的根目录下。

2. 在根目录下正常设置相关配置文件

   ```json
   // .prettierrc
   {
       "singleQuote": true,
       "jsxBracketSameLine": true,
       "bracketSpacing": true,
       "semi": true,
       "arrowParens": "always",
       "printWidth": 120
   }
   ```

   ```json
   // package.json
   {
       ...
       "scripts": {
           ...
       },
       "husky": {
           "hooks": {
             "pre-commit": "echo 'Pre-commit checks......' && lint-staged"          
           }
       },    
       ...
       "devDependencies": {
           "husky": "^3.0.0",
           "lerna": "^3.10.7",
           "lint-staged": "^9.0.0",
           "prettier": "^1.18.2",
       	"stylelint": "^10.1.0"
       }
   }
   ```

   ```js
   // lint-staged.config.js
   // https://github.com/okonet/lint-staged#configuration
   
   module.exports = {
     'packages/**/*.{js,jsx}': ['prettier --write', 'git add'],
     'packages/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'git add'],
     'packages/**/*.{css}': ['prettier --write', 'stylelint --fix', 'git add'],
     'packages/**/*.{less}': ['prettier --write', 'stylelint --syntax less --fix', 'git add'],
     'packages/**/*.{sass,scss}': ['prettier --write', 'stylelint --syntax scss --fix', 'git add'],
     'packages/**/*.{json,md,html}': ['prettier --write', 'git add'],
     'yarn.lock': ['git rm --cached']
   };
   ```

   

3. 测试

   ```
   git commit -m "lint test"
   ```

   这样，每次在根目录下执行git命令时会对里面的所有package进行lint

共用的`devDependencies`

多数package中共用的`devDependencies`类型的库都可以提升到项目根目录中，这样做的好处有：

1. 所有包使用相同版本的依赖，统一管理
2. 可使用自动化工具让根目录下的依赖保持更新
3. 减少依赖的安装时间，一次安装，多处使用
4. 节省存储空间，安装在根目录的`node_module`下



## 提交与发布

与`lerna`中版本控制及发布相关的概念与工具：

- [Conventional Commits](https://link.juejin.im/?target=https%3A%2F%2Fwww.conventionalcommits.org)

  `约定式提交`。一种源于[AngularJS commit rules](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fangular%2Fangular.js%2Fblob%2Fmaster%2FDEVELOPERS.md%23commits)的提交规则。

- [Conventional Changelog](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fconventional-changelog%2Fconventional-changelog)

  用于从git元数据中生成`CHANGELOG.md`的工具，该工具仅当遵循`Conventional Commits`规则时起作用。

- [Semantic Release](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fsemantic-release%2Fsemantic-release)

  `lerna`中内置的一个工具，用于生成版本号、git标签、Conventional Changelog、发布的提交信息以及修改记录。可以在`lerna.json`中将`conventionalCommits`标记设为`true`开启，该工具仅当遵循`Conventional Commits`规则时起作用。

- [Commitlint](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fmarionebl%2Fcommitlint)

  一个遵循`Conventional Commits`的commit信息格式化工具

具体的操作与demo可查看这篇[文章](https://link.juejin.im/?target=https%3A%2F%2Fmichaljanaszek.com%2Fblog%2Flerna-conventional-commits)



### Configure commitlint

Lerna集成commitlint ，参考 [lerna-conventional-commits-example](https://github.com/Everettss/lerna-conventional-commits-example) 

```javascript
yarn add --dev @commitlint/cli @commitlint/config-conventional husky
```

```json
// package.json
{
  "name": "lerna-demo",
  "private": true,
  "devDependencies": {
    "@commitlint/cli": "^8.0.0",
    "@commitlint/config-conventional": "^8.0.0",
    "husky": "^3.0.0",
    "lerna": "^3.10.7",
    "lint-staged": "^9.0.0",
    "prettier": "^1.18.2",
    "stylelint": "^10.1.0"
  },
  "husky": {
    "hooks": {
      "pre-commit": "echo 'Pre-commit checks......' && lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}

```



## 最佳实践

为了能够使lerna发挥最大的作用，使用`lerna` 可参考以下最佳实践。

+ 采用Independent模式
+ 根据`Git`提交信息，自动生成changelog
+ eslint规则检查
+ prettier自动格式化代码
+ 提交代码，代码检查hook
+ 遵循semver版本规范

>  在开发多包工程的过程中，最重要的一点就是**规范**。因为应用场景各种各样，必须保证发布的package是规范的，代码是规范的，一切都是循规蹈矩的。



## 工具整合

在这里引入的工具都是为了解决一个问题，就是工程和代码的规范问题。

- husky
- lint-staged
- prettier
- eslint
- stylelint



## 参考

- [lerna](https://link.juejin.im/?target=https%3A%2F%2Flernajs.io%2F)
- [lerna/lerna in Github](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Flerna%2Flerna)
- [Workspaces](https://link.juejin.im/?target=https%3A%2F%2Fyarnpkg.com%2Fen%2Fdocs%2Fworkspaces)
- [Monorepo setup with Lerna and Yarn workspaces](https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2Ftrabe%2Fmonorepo-setup-with-lerna-and-yarn-workspaces-5d747d7c0e91)
- [A Beginner’s Guide to Lerna with Yarn Workspaces](https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2F%40jsilvax%2Fa-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d)
- [Setting up a monorepo with Lerna for a TypeScript project](https://link.juejin.im/?target=https%3A%2F%2Fblog.logrocket.com%2Fsetting-up-a-monorepo-with-lerna-for-a-typescript-project-b6a81fe8e4f8)
- [lerna管理前端packages的最佳实践 - 掘金](https://juejin.im/post/5a989fb451882555731b88c2)
- [Semantic Release with Lerna and Conventional Commits](https://link.juejin.im/?target=https%3A%2F%2Fmichaljanaszek.com%2Fblog%2Flerna-conventional-commits)

+ [lerna最佳实践 代码](https://github.com/LittleBreak/lerna-best-practices) [文章](https://juejin.im/entry/5c26d0db6fb9a04a0e2d45a4)

  

  