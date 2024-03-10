# frege 是什么?
frege 可以从一个现有的 `package.json` 逆向生成安装所需的 `npm install` 或者 `yarn add` 脚本.

## 安装
建议把 frege 安装到全局, 然后就可以在命令下直接使用了.

```npm
npm install frege -g
```
或者
```npm
yarn global add frege
```

## 使用
### 参数说明
```text
frege [options]

基本配置:
  -f, --file String     要解析的 package.json 文件, 默认会解析当前目录下名为 package.json 的文件 - default: package.json
  -l, --latest          不管 package.json 中 npm 包的具体版本号, 安装该包的最新版本 - default: false
  -p, --productionOnly  仅生成 dependencies 项目下 npm 包的安装脚本. - default: false
  -d, --devOnly         仅生成 devDependencies 项目下的 npm 包的安装脚本, 即开发使用的. - default: false
  -y, --yarnInstall     生成使用 yarn 的安装脚本. - default: false
  -u, --update					通常跟 -l 一起使用, 生成最新的依赖包安装脚本, 并运行. 结果就是把 package.json 和 node_moduels 下面的依赖都更新到最新版本
  -h, --help            Show help
  -v, --version         Output the version number
```

## Examples
### frege
```text
frege
```
不带任何参数直接运行 frege 命令将生成当前目录下 package.json 文件中 dependencies 和 devDependencis(如果有的话) 全部 npm 包的安装脚本, 例如:
```npm
npm i -S debug@">=2.6.8 <3.0.0" optionator@">=0.8.2 <0.9.0" semver@">=5.3.0 <6.0.0"
npm i -D ava@">=0.19.1 <0.20.0" chai@">=4.0.1 <5.0.0" eslint@">=3.19.0 <4.0.0" tap-nyan@">=1.1.0 <2.0.0"
```

### frege -p
是
```text
frege --productionOnly
```
的缩写, 仅生成 `dependencis` 下面 npm 包的安装脚本.
```npm
npm i -S debug@">=2.6.8 <3.0.0" optionator@">=0.8.2 <0.9.0" semver@">=5.3.0 <6.0.0"
```

### frege -p -y
是
```text
frege --productionOnly --yarnInstall
```
的缩写, 仅生成 `dependencis` 下面 npm 包的安装脚本, 但是使用 yarn.
```npm
yarn add debug@">=2.6.8 <3.0.0" optionator@">=0.8.2 <0.9.0" semver@">=5.3.0 <6.0.0"
```

### frege -d
是
```text
frege --devOnly
```
的缩写, 仅生成 `devDependencis` 项下面 npm 包的安装脚本.
```npm
npm i -D ava@">=0.19.1 <0.20.0" chai@">=4.0.1 <5.0.0" eslint@">=3.19.0 <4.0.0" tap-nyan@">=1.1.0 <2.0.0"
```

### frege -l
是
```text
frege --latest
```
的简写, 安装 npm 包的最新版本, 而不是原有 package.json 中指定的版本范围.
```npm
npm i -S debug@latest optionator@latest semver@latest
npm i -D ava@latest chai@latest eslint@latest tap-nyan@latest
```

### frege -l -u
是
```text
frege --latest --update
```
的简写, 安装 npm 依赖包的最新版本, 同时运行该脚本将 package.json 文件和 node_moduels 下面的依赖包都更新至最新版本.
```npm
npm i -S debug@latest optionator@latest semver@latest
npm i -D ava@latest chai@latest eslint@latest tap-nyan@latest
```

### frege -f ../augustine/package.json
指定要解析的 package.json 文件的完整路径.

有问题欢迎反馈!

范圣刚 <tom@tfan.org>
