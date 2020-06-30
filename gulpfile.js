var es = require('event-stream');
var gulp = require("gulp");
var rename = require("gulp-rename");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var OUT_DIR = "dist";
var IN_DIR = "lambda";

// compile typescript
gulp.task("compile", function ()
{
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(OUT_DIR));
});

// copy json files (e.g. localization json)
gulp.task("json", function ()
{
    return gulp
        .src(IN_DIR + "/**/*.json")
        .pipe(rename(function (path)
        {
            path.dirname = path.dirname.replace('custom', '');
        }))
        .pipe(gulp.dest(OUT_DIR));
});


gulp.task("package", () =>
{
    return gulp
        .src(`./package.json`)
        .pipe(updatePackage())
        .pipe(gulp.dest(OUT_DIR));
})

gulp.task("default", gulp.parallel(["compile", "json", "package"]));

function updatePackage()
{
    return es.map(function (file, cb)
    {
        const excludedProp = ["scripts", "jest", "devDependencies"];

        // get content of json file
        const rawJSON = file.contents.toString();

        // parse raw json into javscript object
        const parsed = JSON.parse(rawJSON, (key, value) =>
        {
            if (!excludedProp.some(exc => exc === key)) {
                return value;
            }
        });

        // make string from javascript obj
        const stringified = JSON.stringify(parsed, null, 2);

        // make bufer from string and attach it as current file content
        file.contents = Buffer.from(stringified);

        // pass transformed file into next gulp pipe
        cb(null, file);
    });
}
