/* Подключение функций */
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

/* даём задание галпу
назвали сервер */
gulp.task('server', function() {
    /* функция за обновление браузера, как го лайв */
    browserSync({
        server: {
            baseDir: "dist" /* где находится проект */
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload); /* задача чтобы галп смотрел и вовремя обновлял */
});

/* задание стилей */
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") /* подключили сасс */
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* это с сайта взяли */
        .pipe(rename({suffix: '.min', prefix: ''})) /* чтобы переделывал в файл css c суфиксом min style.min.css */
        .pipe(autoprefixer({
			cascade: false
		}))/*  для подключения автопрефикса */
        .pipe(cleanCSS({compatibility: 'ie8'})) /* очищает от ненужных вектор. */
        .pipe(gulp.dest("dist/css")) /* складирует сюда */
        .pipe(browserSync.stream()); /* обновляет */
});

/* в этих двух функциях - что все измения будут передаваться в папку dist */
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
}) /* следить за изменениями в стилях */

gulp.task('html', function(){
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
})

gulp.task('scripts', function(){
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
})

gulp.task('fonts', function(){
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
})

gulp.task('icons', function(){
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
})

gulp.task('mailer', function(){
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"))
})

gulp.task('images', function(){
    return gulp.src("src/img/**/*")
        .pipe(imagemin())/*  для сжатия картинок */
        .pipe(gulp.dest("dist/img"))
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images')); /* чтобы запускалось поумолчанию */