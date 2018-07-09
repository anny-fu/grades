// 导入gulp模块
var gulp = require('gulp');
// 请求gulp-less
var gulpLess = require('gulp-less');
//请求gulp-autoprefixer (添加CSS前缀)
var autoprefixer = require('gulp-autoprefixer');


gulp.task("compileLess", function() {
  gulp.src("./style/less/*.less")
    // 编译less
    .pipe(gulpLess())
    // 自动注入前缀
    .pipe(autoprefixer())
    // 指定编译后生成css文件目录
    .pipe(gulp.dest("./style/css"));
  console.log("编译完成！");
});

gulp.task('watch', function() {
  gulp.watch('./style/less/*.less', ['compileLess']);
});