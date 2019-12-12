const path = require('path');
console.log('maddafakka')
const fs = require('fs');

const publicPath = path.resolve(__dirname, './public');
const buildPath = path.resolve(__dirname, './build');
const swPath = path.resolve(publicPath, './serviceWorker.js');
const swInBuildPath = path.resolve(buildPath, './serviceWorker.js');

// Removing service worker created by create-react-app
// and its precache-maniffest since we have our own
// service worker...
const filesInBuild = fs.readdirSync(buildPath);
filesInBuild.forEach(file => {
  if (
    file.indexOf('precache-manifest.') === 0 ||
    file.indexOf('service-worker.js') === 0
  ) {
    fs.unlinkSync(path.resolve(buildPath, file));
  }
});
console.log('Removed unnecessary files.');

// Changing this.version in the serviceWorker.js
let contents = fs.readFileSync(swPath, 'utf-8');
let version = contents.match(
  /this.version\s*=\s*([\d|\.]*)/
)[1] / 1;
version = Math.round(version * 100 + 1) / 100;
contents = contents.replace(
  /this.version\s*=\s*[\d|\.]*/,
  `this.version = ${version}`
);
fs.writeFileSync(swPath, contents, 'utf-8');
// Changing this.production in build/serviceWorker.js 
contents = contents.replace(
  /this.production\s*=\s*false/,
  'this.production = true'
);
fs.writeFileSync(swInBuildPath, contents, 'utf-8');
console.log('Changed this.version in serviceWorker.js');
console.log(`Current this.version is ${version}.`);
console.log('Changed this.production to true in serviceWorker.js');