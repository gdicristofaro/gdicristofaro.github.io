var less = require('gulp-less');
var path = require('path');
var config = require('../config').less;
var gulp = require('gulp');


gulp.task('less', function () {
  return gulp.src(config.src)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(config.dest));
});
