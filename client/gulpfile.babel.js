// yarn add -D gulp gulp-nodemon gulp-run browser-sync
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const run = require('gulp-run');
const browserSync = require('browser-sync').create();
const serverConfig = require('./server/config');

gulp.task('compile', function() {
  return run('npm run build').exec();
});

gulp.task('default', gulp.series('compile', function(done) {
  browserSync.init({
    files: ['build/static/**'],
    proxy: `localhost:${serverConfig.PORT}`, // server running...
    host: 'localhost', // host: browser sync running...
    port: 3000, // port: browser sync port. Default: 3000
    open: false
  }, function() {
    nodemon({
      script: 'server/index.js',
      ext: 'js jsx css scss',
      watch: 'src',
      env: { NODE_ENV: 'production' },
      tasks: ['compile'],
      stdout: false
    }).on('readable', function pipe() {
      this.stdout.on('data', (chunk) => {
        if (/^The server is running at/.test(chunk)) {
          browserSync.reload({ stream: false });
        }
        process.stdout.write(`[app] ${chunk}`);
      });
      this.stderr.on('data', (chunk) => {
        process.stderr.write(`[app] ${chunk}`);
      });
    });
  });

  done();
}));
