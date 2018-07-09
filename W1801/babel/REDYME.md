<!-- 初始化项目配置文件：package.json -->
```
cnpm init -y / cnpm init --yes
```
<!-- 导入项目开发依赖 --save-dev :只在开发环境中运用，比如;babel,webpack,less,sass,gulp-->
```
cnpm i babel-cli --save-dev(-D)
```
<!-- 导入项目依赖 --save ：项目打包上线后任然需要使用的，比如：jquery,bootstrap -->
```
cnpm i jquery -S(--save)
```

<!-- 运行命令快捷方式，在package.json文件的scripts选项中配置 
"命令名称":"执行的命令" 
"test":"cnpm install babel-cli babel-preset-env  babel-preset-stage-3 --save-dev"
运行命令：cnpm run test
-->

<!-- 在一个新的项目中根据package.json文件导入项目依赖 
命令：cnpm install / yarn 
 -->