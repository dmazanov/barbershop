var gulp = require("gulp"),
		browserSync = require("browser-sync").create(),
		sass = require("gulp-sass"),
		postcss = require("gulp-postcss"),
		autoprefixer = require("autoprefixer");


// Static Server + watching scss/html files
gulp.task('browser-sync', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch("*.html").on('change', browserSync.reload);
	gulp.watch("scss/**/*.scss", ['sass']);
	gulp.watch("js/**/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("scss/**/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([
			autoprefixer({ browsers: [
					"last 1 version",
					"last 2 Chrome versions",
					"last 2 Firefox versions",
					"last 2 Opera versions",
					"last 2 Edge versions"
				]})
		]))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());
});

gulp.task ('default', ['browser-sync']);