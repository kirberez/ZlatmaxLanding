export const html = () => {
  return app.gulp.src(`${app.path.build.html}*.html`)
    .pipe(app.lp.plumber(
      app.lp.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(
      app.lp.if(
        app.isWebP,
        app.lp.if(
          app.isBuild,
          app.lp.webpHtmlNosvg()
        )
      )
    )
    .pipe(app.lp.versionNumber({
      'value': '%DT%',
      'replaces': [
        '#{VERSION_REPlACE}#',
        [/#{VERSION_REPlACE}#/g, '%TS%']
      ],
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          ['image', '%TS%'],
          {
            'type': 'js',
            'attr': ['src', 'custom-src'], // String or Array, undefined this will use default. css: "href", js: ...
            'key': '_v',
            'value': '%DT%',
            'cover': 1,
            'files': ['script.min.js'] // Array [{String|Regex}] of explicit files to append to
          }
        ]
      },
      'output': {
        'file': 'version.json'
      }
    }))
    .pipe(app.gulp.dest(app.path.build.html));
  }


  // src(path.src.html) // 1. Берём путь src(path.src.html)
  //   .pipe(fileinclude()) // 1.1 
  //   .pipe(webphtml()) // Сокращаем HTML-код для webp (обычным <img> теперь)
  //   .pipe(dest(path.build.html)) // 2. Несём в path.build.html
  //   .pipe(browsersync.stream()) // 3. Запускаем параллельно browsersync.stream()