// plugins
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    server = require('gulp-webserver');


// path
var path = {
  source: './src',
  public: './public'
};


/**
 * scssのコンパイル
 */
gulp.task('scss', function() {
  var supportBrowser = ['> 0.5% in JP'],
      postcssPlugins = [
        // require('doiuse')(supportBrowser),
        require('autoprefixer')(supportBrowser)
      ];

  gulp.src(path.source + '/scss/**/*.scss')
  .pipe(plumber({ errorHandler: errorHandle }))
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(postcssPlugins))
  .pipe(gulp.dest(path.public + '/css/'));
});


/**
 * webserverの起動
 */
gulp.task('webserver', function() {
  gulp.src(path.public)
  .pipe(server({
    // livereload: true, // 自動更新
    open: true // 自動でブラウザで開く
  }));
});


/**
 * watch
 */
gulp.task('watch', function() {
  gulp.watch(path.source + '/scss/**/*.scss', ['scss']);
});


/**
 * default
 *   サーバを立ち上げて、ファイルの監視をする
 */
gulp.task('default', ['webserver', 'watch']);


/**
 * plumberのエラーハンドリング 
 */
function errorHandle(err) {
  console.log(err.messageFormatted);
  return this.emit('end');
}