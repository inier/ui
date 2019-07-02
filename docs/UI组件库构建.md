## 构建自己的前端UI组件库

React + Storybook + Lerna



### 前言

本文意在帮助读者快速搭建自己的前端UI组件库，构建-打包-发布，帮你解决大型web前端应用中组件重用的问题.

+ **React**

自2014年以来，react不断地发展壮大，时至今日已经发展成为最受欢迎的前端框架，如果你还不太了解react，请看[这里](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact)。

+ **Storybook**

storybook是一套UI组件的开发环境，它允许你浏览组件库，查看每个组件的不同状态，以及交互式开发和测试组件。 storybook允许你独立于你的app来开发你的UI组件，你可以先不关心应用层级的组件依赖，快速的着手组件的开发，而后再将之应用于自己的app中。尤其在大型应用，跨团队合作过程中，良好的组件抽象，使用storybook封装管理，可以极大的提高的组件的重用性，可测试性，和开发速度。你可以点击[这里](https://link.juejin.im/?target=https%3A%2F%2Fstorybook.js.org%2Fexamples%2F)查看storybook是如何工作的。

+ **Lerna**

[lerna](https://link.juejin.im/?target=https%3A%2F%2Flernajs.io%2F)帮你管理你的包集合，当你自己的library变多时，你的版本控制，跟踪管理，测试就会变得越发复杂，lerna正是帮你解决这个问题，它使用npm和git来帮助你优化你的多包管理流程。

本文假设你已经熟悉发布自己的npm包，如果不熟悉，可以先查看相关文章，例如[《怎么开发一个npm包》](https://juejin.im/entry/58a3caa686b599007391dfbe)；

接下来我们就一步一步来搭建自己的UI组件库。



### 构建

#### 一. 初始化react app

有很多教程帮助我们如何搭建一个前端react app，本文重点不在react的原理，生命周期函数等使用上，这里选择facebook官方提供的脚手架create-react-app来快速构建一个react app。

> 注意你的node版本（推荐>=6, 可以使用nvm来管理node版本，npx comes with npm 5.2+ and higher）

初始化成功后，会生成如下工程目录：

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

然后执行：

```
cd my-app
yarn start
```

此时，通过访问[http://localhost:3000/](https://link.juejin.im/?target=http%3A%2F%2Flocalhost%3A3000%2F) ，可以查看初始化好的app了。



#### 二. 初始化storybook

如果你是第一次安装storybook，尝试以下命令：

```
npm i -g @storybook/cli
cd my-app #(the app above)
getstorybook init
```

此时，会生成如下的工程目录：

```
my-app
├── .storybook
│   └── addons.js //(storybook的包依赖)
│   └── config.js //(配置文件，告诉storybook去加载哪些定义好的组件集合)
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    ├── stories
    │   └── index.js  //(storybook的组件集合，你需要在这里添加你创建好的UI组件)
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

storybook初始化完成后，可以执行`yarn storybook`启动storybook的本地开发环境，类似[http://localhost:9009/](https://link.juejin.im/?target=http%3A%2F%2Flocalhost%3A9009%2F)，会显示包含简单示例的storybook交互界面。



#### 三. 开发自己的组件

接下来，开发自己的组件并且加入到storybook中，这里以两个button为例：

```react
// src/StateFulReactButton.js

import React, { Component } from 'react';
 
class StateFulReactButton extends Component {
  render() {
    const { handleOnclick } = this.props;
 
    return (
      <button onClick={handleOnclick}>react stateful button</button>
    );
  }
}
 
export default StateFulReactButton;
```

```react
// src/StatelessReactButton.js
import React from 'react';
 
const StatelessReactButton = ({ handleOnclick }) => {
  return <button onClick={handleOnclick}>react stateless button</button>
};
 
export default StatelessReactButton;
```

将组件引入到storybook中：

```react
// src/story/index.js
import StateFulReactButton from './../StatefullReactButton';
import StatelessReactButton from './../StatelessReactButton';
//在后续增加方法：
.add('StateFulReactButton', () => <StateFulReactButton handleOnclick={action('clicked')} />)
.add('StatelessReactButton', () => <StatelessReactButton handleOnclick={action('clicked')} />);
```

访问本地storybook server，即刻看到新增的菜单项，点击可以预览对应的组件。

好啦，至此我们的两个react组件就开发好了。

当然，配合其他插件storybook可以做很多事情，比如`knobs` [`查看示例`](https://link.juejin.im/?target=https%3A%2F%2Fstorybook.gumgum.com%2F%3Fknob-Text%3D2%26amp%3Bknob-Group%3Dfalse%26amp%3Bknob-Responsive%3Dfalse%26amp%3Bknob-ClassName%3D%26amp%3Bknob-Type%3Dbutton%26amp%3Bknob-Empty%3Dfalse%26amp%3Bknob-Size%3D%26amp%3Bknob-Context%3Ddefault%26amp%3Bknob-Style%3D%7B%7D%26amp%3BselectedKind%3DAtoms%26amp%3BselectedStory%3DButton%26amp%3Bfull%3D0%26amp%3Bdown%3D1%26amp%3Bleft%3D1%26amp%3BpanelRight%3D1%26amp%3BdownPanel%3Dstorybooks%2Fstorybook-addon-knobs)，你可以在你的storybook server界面上直接与你的定制的组件交互，直观的验证你的组件行为，而这一切完全从你的app中剥离出来了。



#### **四. 应用你的组件**

上述组件的开发验证过程完成后，就可以把组件加入到你的app 生产代码中去了。

```js
// src/App.js
import StateFulReactButton from './../StatefullReactButton';
import StatelessReactButton from './../StatelessReactButton';
```

```react
<StateFulReactButton handleOnclick={() => alert("I am StateFulReactButton")} />
<StatelessReactButton handleOnclick={() => alert("I am StatelessReactButton")} />
```

启动本地的开发环境 ([http://localhost:3000](https://link.juejin.im/?target=http%3A%2F%2Flocalhost%3A3000))，新增的button组件已经可以完美的工作了。



#### 五. lerna初始化，包管理

前端工程开发到一定阶段以后你会发现大量的重复，这是所有开发人员需要面对的问题，组件复用提供了很好的解决思路，消除内部重复的同时还能解决跨团队重复的问题。继续以StateFulReactButton和StatelessReactButton为例，我们来把它们拆成两个独立的包，使用lerna管理起来。

安装[lerna](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Flerna%2Flerna)：

```
npm install --global lerna
```

初始化lerna：

```
cd my-app #(the app above)
lerna init
```

lerna 会帮你初始化git做版本管理，此时你的工程目录应该是这个样子：

```
my-app
├── .storybook
│   └── addons.js
│   └── config.js
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    ├── stories
    │   └── index.js 
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
    └── StateFulReactButton.js
    └── StatelessReactButton.js
└── packages //(lerna包管理目录，在这里定义并测试你的组件)
└── lerna.json //(lerna配置文件)
```

packages目录里新建StateFulReactButton/src, StatelessReactButton/src目录，我们把StateFulReactButton.js和StatelessReactButton.js分别迁移过来，再分别在两个src目录下新建自己的index.js文件，像这样：

```
└── packages
    └── StatefullReactButton
        ├── src
        │   └── index.js 
    └── StatelessReactButton
        ├── src
        │   └── index.js
```

```js
// StatefullReactButton/src/index.js
import StateFullReactButton from './StatefullReactButton';
export default StateFullReactButton;
```

```js
// StatelessReactButton/src/index.js
import StatelessReactButton from './StatelessReactButton';
export default StatelessReactButton;
```

> 多包一层便于后面打包自动化配置；

在各自的根目录下分别初始化npm包：

```
cd packages/StateFulReactButton
npm init
```

```
cd packages/StatelessReactButton
npm init
```

初始化过程npm会询问并初始话一些配置给你，这里注意`entry point`，我们的两个组件是基于react和ES6语法写的，需要打包工具帮我们打包成通用的js才能够使用，这里暂时用默认配置，后面我们打好包后会来手动修改这个配置。



#### 六. 组织storybook

这个时候我们要重新组织一下storybook了，新建StateFulReactButton/src/stories和StatelessReactButton/src/stories目录，各自新建index.js文件（同样你需要重新修改一下你根目录src/stories下的storybook）：

```react
// StateFulReactButton/src/stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StatefullReactButton from '../StatefullReactButton';
 
storiesOf('Stateful Button', module)
  .add('stateful react Button', () => <StatefullReactButton handleOnclick={action('clicked')}/>);
```

```react
// StatelessReactButton/src/stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StatelessReactButton from '../StatelessReactButton';
 
storiesOf('Stateless Button', module)
  .add('stateless react Button', () => <StatelessReactButton handleOnclick={action('clicked')}/>);
```

修改`.storybook/config.js`storybook配置文件：

```react
import { configure } from '@storybook/react';
 
const req = require.context('../packages/', true, /stories\/.+.js$/);
const loadStories = () => {
  require('../src/stories');  //（加载根目录下的storybook）
  req.keys().forEach(module => req(module)); //（加载各个组件目录下的storybook）
};
 
configure(loadStories, module);
```

用浏览器打开你的storybook server，看看是否工作正常；



### **打包**

说到打包工具，`webpack`和`rollup`不得不提，在构建复杂的前端应用时，他们帮助我们拆分代码，管理静态资源，是前端工程化必备的工具，两者相似又有不同，在什么场景下如何使用大家可以参考下[这篇文章](https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2Fwebpack%2Fwebpack-and-rollup-the-same-but-different-a41ad427058c)，**一言以蔽之，对于应用开发，使用 webpack；对于类库开发，使用 Rollup。**

我们分离出的两个button组件，更像是类库，这里我们选择rollup，如何使用rollup打包具体细节我们不详细说了大家可以自行搜索。这里提供几个配置文件，说明如何把rollup打包引入到我们的工程中来；

首先安装rollup：

```
yarn add rollup
```

还有一些打包需要用到的插件(有些可能在你的工程里用不到)：

```
yarn add rollup-plugin-babel
yarn add rollup-plugin-node-resolve
yarn add rollup-plugin-filesize
yarn add rollup-plugin-sass
yarn add rollup-plugin-react-svg
```

根目录下新建文件`rollup.config.js`, 加入下列代码：

```react
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import sass from 'rollup-plugin-sass';
import svg from 'rollup-plugin-react-svg';
import { writeFileSync } from 'fs';
import path from 'path';
 
const external = ['react', 'prop-types'];
const outputTypes = [
  { file: './dist/es/index.js', format: 'es' }, //(ES Modules)
];
 
const tasks = outputTypes.map(output => ({
  input: './src/index.js', //(组件主入口，相对路径)
  external,
  output,
  name: 'my-library',
  plugins: [
    resolve(),
    filesize(),
    sass({
      output: styles => writeFileSync(path.resolve('./dist', 'index.css'), styles),
      options: {
        importer(url) {
          return url.startsWith('~') && ({
            file: `${process.cwd()}/node_modules/${url.slice(1)}`
          })
        }
      }
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'], //(你需要安装babel插件来解析ES6)
    }),
    svg()
  ],
}));
 
export default tasks;
```

然后安装babel插件来解析ES6(有些可能在你的工程里用不到)：

```
yarn add babel-core
yarn add babel-cli
yarn add babel-loader
yarn add babel-plugin-external-helpers
yarn add babel-plugin-transform-object-rest-spread
yarn add babel-preset-env
yarn add babel-preset-react
```

根目录下新建`.babelrc` babel配置文件, 写入：

```json
{
  "presets": [
    [
      "env",
      { "modules": false }
    ],
    "react"
  ],
  "env": {
    "test": {
      "presets": [["env"], "react"]
    }
  },
  "plugins": [
    "transform-object-rest-spread"
  ]
}
```

接下来我们回头修改前面提到的两个包的`package.json`配置文件：

+ `StatefulReactButton/package.json`

```js
{
  "name": "statefull-react-button",
  "version": "1.0.0", //（组件版本）
  "description": "this is my StatefullReactButton",
  "main": "dist/es/index.js",  //（打包后组件主函数入口）
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    "build": "rollup -c ../../rollup.config.js" //（组件打包，这里使用同一个rollup.config.js，此处为相对路径）
  },
  "dependencies": {
    "classnames": "^2.2.5" //（另外单独给每个组件添加自己的依赖库，以做比较）
  },
  "publishConfig": {
    "access": "public" //（组件库发布地址，默认为你的npm账户仓库）
  }
}
```

+ `StatelessReactButton/package.json`

```js
{
  "name": "stateless-react-button",
  "version": "1.0.0", //（组件版本）
  "description": "this is my StatelessReactButton",
  "main": "dist/es/index.js", //（打包后组件主函数入口）
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c ../../rollup.config.js" //（组件打包，这里使用同一个rollup.config.js，此处为相对路径）
  },
  "dependencies": {
    "lodash": "^4.4.0"  //（另外单独给每个组件添加自己的依赖库，以做比较）
  },
  "publishConfig": {
    "access": "public" //（组件库发布地址，默认为你的npm账户仓库）
  }
}
```

至此，我们的工程化就基本完成了，执行下面命令：

```
lerna bootstrap #(安装各个组件的包依赖)
lerna run build #(使用lerna和rollup为各个组件打包)
```

你会在你的两个组件根目录里看到`dist`文件夹，里面有打包好的可用于发布的`index.js`文件。

你的工程目录应该是这个样子：

```
my-app
├── .storybook
│   └── addons.js
│   └── config.js
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    ├── stories
    │   └── index.js 
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
    └── StatelessReactButton.js
└── packages //(lerna包管理目录，在这里定义并测试你的组件)
    ├── StatefulReactButton
        ├── node_modules
        ├── dist
            └── es
                └── index.js
        └── src
            └── stories
                └── index.js
            ├── index.js 
            └── StatefulReactButton.js    
    └── StatelessReactButton
        ├── node_modules
        ├── dist
            └── es
                └── index.js
        └── src
            └── stories
                └── index.js
            ├── index.js
            └── StatelessReactButton.js   
└── lerna.json //(lerna配置文件)
└── .babelrc
└── rollup.config.js
└── yarn.lock
```



### **发布**

一条命令，你的包就上线啦：

```
lerna publish
```

打开你的npm账户仓库，看到你刚刚发布的组件了吧， 接下来你就可以像安装其他前端库一样使用你自己的组件了~~~

```
yarn add statefull-react-button
yarn add stateless-react-button
```

> 本文未提及测试，css，图片等静态资源的处理，还请读者自己添加。





参考：

https://blog.csdn.net/weixin_34205826/article/details/87990100

https://blog.csdn.net/win7583362/article/details/79238060

https://github.com/reakit/reakit