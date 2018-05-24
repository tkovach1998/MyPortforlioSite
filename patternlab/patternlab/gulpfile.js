
var pkg   = require('./package.json');
var gulp  = require('gulp');
var path  = require('path');
var eol   = require('os').EOL;
var del   = require('del');
var header        = require('gulp-header');
var nodeunit      = require('gulp-nodeunit');
var inject        = require('gulp-inject');
var sass          = require('gulp-sass');
var sassGlob      = require('gulp-sass-glob');
var postcss       = require('gulp-postcss');
var autoprefixer  = require('autoprefixer');
var svgstore      = require('gulp-svgstore');
var svgmin        = require('gulp-svgmin');
var browserSync   = require('browser-sync').create();



/**
 * Bootsrap Patternlab
 */

// Load the gulp builder
require('gulp-load')(gulp);

var banner = [ '/** ',
  ' * <%= pkg.name %> - v<%= pkg.version %> - <%= today %>',
  ' * ',
  ' * <%= pkg.author %>, and the web community.',
  ' * Licensed under the <%= pkg.license %> license.',
  ' * ',
  ' * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice.',
  ' * ', ' **/'].join(eol);

gulp.loadTasks( __dirname + '/builder/patternlab_gulp.js' );

// Clean the public project
gulp.task('clean', function (cb) {
  del.sync(['./public/patterns/*'], {force: true});
  cb();
});

// Build
gulp.task('banner', function () {
  return gulp.src([
    './builder/patternlab.js',
    './builder/object_factory.js',
    './builder/lineage_hunter.js',
    './builder/media_hunter.js',
    './builder/patternlab_grunt.js',
    './builder/patternlab_gulp.js',
    './builder/parameter_hunter.js',
    './builder/pattern_exporter.js',
    './builder/pattern_assembler.js',
    './builder/pseudopattern_hunter.js',
    './builder/list_item_hunter.js',
    './builder/style_modifier_hunter.js'
  ])
    .pipe( header( banner, {
      pkg   : pkg,
      today : new Date().getFullYear()
    }))
    .pipe(gulp.dest('./builder'));
});



/**
 * Setup Public Dirs
 */

gulp.task('cp:js', function () {
  return gulp.src( '**/*.js', { cwd: './source/js' })
    .pipe(gulp.dest('./public/js'));
});

gulp.task('cp:img', function () {
  return gulp.src(
    [ '**/*.gif', '**/*.png', '**/*.jpg', '**/*.jpeg' ],
    { cwd: './source/images' }
  )
    .pipe(gulp.dest('./public/images'));
});

gulp.task('cp:font', function () {
  return gulp.src( '*', { cwd:'./source/fonts' })
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('cp:data', function () {
  return gulp.src( 'annotations.js', { cwd:'./source/_data' })
    .pipe(gulp.dest('./public/data'));
});

gulp.task('cp:css', function () {
  return gulp.src('./source/css/style.css')
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('cp:svg', function () {
  return gulp.src( '**/*.svg', { cwd: './source/svg' })
    .pipe(gulp.dest('./public/svg'));
});



/**
 * Serve and Watch
 */

gulp.task('connect', ['lab'], function () {
  browserSync.init({
    server: { baseDir: './public/' }, port : 3200
  });

  gulp.watch('./source/css/style.css', ['cp:css']);
  gulp.watch('./source/css/**/*.scss', ['sass:style']);
  gulp.watch('./public/styleguide/*.scss', ['sass:styleguide']);

  gulp.watch('./source/svg/**/*.svg', ['svg', 'cp:svg']);

  gulp.watch('./source/js/**/*.js', ['cp:js']);

  gulp.watch([
    './source/_patterns/**/*.mustache',
    './source/_patterns/**/*.json',
    './source/_data/*.json'
  ], ['lab-pipe'], function () {
    browserSync.reload();
  });
});



/**
 * Sass
 * ----
 * [https://github.com/dlmanning/gulp-sass]
 * [https://www.npmjs.com/package/gulp-postcss]
 * [https://github.com/sindresorhus/gulp-autoprefixer]
 *
 * Plugins (Breakpoints, Susy, Singularity) are installed
 * via Bower and loaded through libsass' `includePaths` option
 */

// Supported browsers
var browserslist = [
  //'> 1%',
  'Last 3 versions'
  //'IE 8'
];

// PostCSS processors
var processors = [
  autoprefixer({ browsers: browserslist })
];

gulp.task('sass:style', function () {
  return gulp.src('./source/css/style.scss')
    .pipe( sassGlob() )
    .pipe( sass({
      includePaths: [
        './bower_components/compass-breakpoint/stylesheets/',
        './bower_components/singularity/stylesheets/'
      ],
      outputStyle: 'expanded',
      precision: 8
    }).on( 'error', sass.logError ))
    .pipe( postcss( processors ))
    .pipe( gulp.dest( './public/css' ))
    .pipe( browserSync.stream());
});

gulp.task('sass:styleguide', function () {
  return gulp.src('./source/styleguide/css/*.scss')
    .pipe( sass({
      includePaths: [
        './bower_components/compass-breakpoint/stylesheets/',
        './bower_components/singularity/stylesheets/'
      ],
      outputStyle: 'expanded',
      precision: 8
    }).on( 'error', sass.logError ))
    .pipe( postcss( processors ))
    .pipe( gulp.dest( './public/styleguide/css' ))
    .pipe( browserSync.stream());
});



/**
 * SVG
 * [https://github.com/w0rm/gulp-svgstore]
 * [https://www.npmjs.com/package/gulp-svgmin]
 */

gulp.task('svg', function () {
  var svgs = gulp.src('./source/svg/**/*.svg')
    .pipe( svgmin( function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe( svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp.src([
    './source/_patternlab-files/**/*.html',
    './source/_patternlab-files/**/*.mustache'
  ])
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('./source/_patternlab-files'))
    .pipe( browserSync.stream());
});


// gulp.task('js', function () {
//
// });



/**
 * Unit Testing
 */

gulp.task('nodeunit', function () {
  return gulp.src('./test/**/*_tests.js')
    .pipe(nodeunit());
});



/**
 * Tasks
 */

gulp.task('lab-pipe', ['lab'], function (cb) {
  cb();
  browserSync.reload();
});

gulp.task('default',  [ 'lab' ]);
gulp.task('assets',   [ 'cp:js', 'cp:img', 'cp:font', 'cp:data', 'sass:style', 'sass:styleguide' ]);
gulp.task('prelab',   [ 'clean', 'assets' ]);
gulp.task('lab',      [ 'prelab', 'patternlab' ], function(cb){cb();});
gulp.task('patterns', [ 'patternlab:only_patterns' ]);
gulp.task('serve',    [ 'lab', 'connect' ]);
gulp.task('travis',   [ 'lab', 'nodeunit' ]);
gulp.task('version',  ['patternlab:version' ]);
gulp.task('help',     ['patternlab:help' ]);
