var gulp = require("gulp"),
		browserSync = require("browser-sync").create(),
		sass = require("gulp-sass"),
		postcss = require("gulp-postcss"),
		autoprefixer = require("autoprefixer"),
		mqpacker = require("css-mqpacker"), // склеивает все media-quires в одно место
		minify = require("gulp-csso"),
		rename = require("gulp-rename"), // переименовывает файлы
		imagemin = require("gulp-imagemin"), // оптимизация изображений
		svgmin = require("gulp-svgmin"), // минификация svg файла
		svgstore = require("gulp-svgstore"); // svg спрайт

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
				]}),
			mqpacker({
				sort: true
			})
		]))
		.pipe(gulp.dest("css"))
		.pipe(minify())
		.pipe(rename("main.min.css"))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());
});

gulp.task('images', function() {
	return gulp.src("img/**/*.{png,jpg,gif}")
		.pipe(imagemin([
				imagemin.optipng({optimizationLevel: 3}),
				imagemin.jpegtran({progressive: true})
			]))
		.pipe(gulp.dest("img"));
});

// Собираем svg sprite
gulp.task('symbols', function() {
	return gulp.src("img/icons/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({
				inlineSvg: true
		}))
		.pipe(rename("symbols.svg"))
		.pipe(gulp.dest("img"));
});

gulp.task ('default', ['browser-sync']);