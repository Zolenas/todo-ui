import * as del from "del";
import * as gulp from "gulp";
import * as nodemon from "gulp-nodemon";
import * as sourcemaps from "gulp-sourcemaps";
import * as ts from "gulp-typescript";
import * as runSequence from "run-sequence";
import * as tslint from "tslint";
import * as buffer from "vinyl-buffer";
import gulpTslint from "gulp-tslint";

/**
 * TypeScript project reference.
 */
const tsProject: ts.Project = ts.createProject("tsconfig.json");

/**
 * Global paths used by Gulp tasks.
 */
const paths = {
    base: "src",
    dist: tsProject.config.compilerOptions.outDir,
    js: `${tsProject.config.compilerOptions.outDir}/**/*.js`,
    resources: [
        "**/*.json"
    ],
    ts: tsProject.config.include,
    www: "bin/www.js"
};


/**
 * Cleans build directory.
 */
gulp.task("clean", dist =>
    del(paths.dist, dist));

/**
 * Copies resources into build directory.
 */
gulp.task("resources", () => {
    gulp
        .src(paths.resources, { base: `./${paths.base}` })
        .pipe(gulp.dest(paths.dist));
});

/**
 * Compiles TypeScript files into build directory.
 */
gulp.task("compile:js", () => {
    const tsResult = tsProject
        .src()
        .pipe(tsProject());

    return tsResult.js
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("./", {}))
        .pipe(gulp.dest(paths.dist));
});

/**
 * Compiles typings files into build directory.
 */
gulp.task("compile:dts", () => {
    const tsResult = tsProject
        .src()
        .pipe(tsProject());

    return tsResult.dts
        .pipe(buffer())
        .pipe(gulp.dest(paths.dist));
});

/**
 * Verifies code quality, using TSLint.
 */
gulp.task("lint", () =>
    gulp
        .src(paths.ts)
        .pipe(gulpTslint({
            formatter: "stylish",
            program: tslint.Linter.createProgram("tsconfig.json")
        }))
        .pipe(gulpTslint.report({
            allowWarnings: false
        })));

/**
 * Watches for changes and re-compiles.
 */
gulp.task("watch", () => {
    gulp.watch(paths.ts, ["compile:js"]);
});

/**
 * Launches www.js through Nodemon.
 */
gulp.task("server", () =>
    nodemon({
        script: `${paths.dist}/${paths.www}`
    }));

/**
 * Builds application by compiling it and assessing code"s quality.
 */
gulp.task("build", done =>
    runSequence(
        "clean",
        "resources",
        "compile:js",
        "compile:dts",
        done
    )
);

/**
 * Launches a live server and watches for file changes.
 */
gulp.task("serve", done =>
    runSequence(
        "build",
        "server",
        "watch",
        done
    ));

/**
 * Defaults to serve task.
 */
gulp.task("default", ["serve"]);
