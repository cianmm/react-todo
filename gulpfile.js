;var gulp = require('gulp');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('hinting', function() {
	return gulp.src('build/*.js') //read all jsx files in src/
	.pipe(jshint()) //run contents through jshint
	.pipe(jshint.reporter('default')) //report on findings
});

gulp.task('react-compiling', function() {
	return gulp.src('src/*.jsx') //read all jsx files in src/
	.pipe(react()).on('error', errorHandler) // compile to jsx
	.pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
	return gulp.src('src/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('build'));
});

gulp.task('watch', function(){
	gulp.watch('src/*.jsx', ['react-compiling']);
});

gulp.task('default', ['watch']);

// Handle the error
function errorHandler (error) {
  console.error(error.toString());
  this.emit('end');
}