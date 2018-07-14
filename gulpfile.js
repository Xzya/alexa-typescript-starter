var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var OUT_DIR = "dist";
var IN_DIR = "lambda";

// compile typescript
gulp.task("compile", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(OUT_DIR));
});

// copy json files (e.g. localization json)
gulp.task("json", function () {
    return gulp.src(IN_DIR + "/**/*.json").pipe(gulp.dest(OUT_DIR));
});

gulp.task("default", ["compile", "json"]);