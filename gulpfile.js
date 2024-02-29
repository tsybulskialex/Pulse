/* Подключение функций */
const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

/* даём задание галпу
назвали сервер */
gulp.task('server', function() {
    /* функция за обновление браузера, как го лайв */
    browserSync({
        server: {
            baseDir: "src" /* где находится проект */
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
        .pipe(gulp.dest("src/css")) /* складирует сюда */
        .pipe(browserSync.stream()); /* обновляет */
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
}) /* следить за изменениями в стилях */

gulp.task('default', gulp.parallel('watch', 'server', 'styles')); /* чтобы запускалось поумолчанию */