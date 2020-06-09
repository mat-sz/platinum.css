#!/usr/bin/env node
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const postcss = require('postcss');

const { homepage, version } = require('./package.json');

function buildCSS() {
  const input =
    `/*! platinum.css v${version} - ${homepage} */\n` +
    fs.readFileSync('src/index.scss');

  return postcss()
    .use(require('postcss-inline-svg'))
    .use(require('postcss-css-variables'))
    .use(require('postcss-calc'))
    .use(require('postcss-copy')({ dest: 'build', template: '[name].[ext]' }))
    .use(require('cssnano'))
    .process(input, {
      syntax: require('postcss-scss'),
      from: 'src/index.scss',
      to: 'build/platinum.css',
      map: { inline: false },
    })
    .then(result => {
      mkdirp.sync('build');
      fs.writeFileSync('build/platinum.css', result.css);
      fs.writeFileSync('build/platinum.css.map', result.map.toString());
    });
}

function build() {
  buildCSS().catch(err => console.log(err));
}
module.exports = build;

build();
