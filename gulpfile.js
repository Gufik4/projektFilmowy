var gulp = require('gulp');//dołączamy gulpa
var sass = require('gulp-sass');//
var sourcemaps = require('gulp-sourcemaps');//sourcemapy
gulp.task('sass', function() {
return gulp.src('scss/main.scss')
.pipe(sourcemaps.init())
.pipe(sass({errLogToConsole: true}))
.pipe(sourcemaps.write())
.pipe(gulp.dest('css'))
});
gulp.task('watch', function(){
gulp.watch('scss/*.scss', ['sass']); });
