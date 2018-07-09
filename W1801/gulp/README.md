#Gulp的4个API：
1. gulp.task(name[,deps],fn):定义任务
参数说明：name==任务名称 deps==依赖任务名称
 fn==回调函数
2. gulp.src(globs[,options]):输入需要处理的文件
参数说明：globs == 处理的文件路径（字符串或字符串数组）
3. gulp.dest(path[,options]):输出处理后的文件路径
4. gulp.watch(globs[,opts,cd]):监视文件变化，当文件发生变化后，可以利用它执行相应的任务。例如：文件的压缩和编译

#Gulp常用的插件
1. 编译类
    gulp-less:编译less文件
    gulp-sass:编译sass文件
    gulp-sourcemaps:生成资源映射
    gulp-babel；ES6/7/8 ===> ES5

2. 压缩文件
    gulp-clean-css:压缩css文件
    gulp-uglify:压缩js文件
    gulp-imagemin:压缩图片
    gulp-htmlmin:压缩html文件

3. 代码同步
    browser-sync:自动刷新，代码改变时，浏览器自动刷新

4. 工具
    gulp-load-plugins:自动加载插件

5. 文件操作
    gulp-concat:多个文件合并为一个文件，用于css和js文件合并

6. 自动注入
    gulp-autoprefixer:自动添加css浏览器前缀





