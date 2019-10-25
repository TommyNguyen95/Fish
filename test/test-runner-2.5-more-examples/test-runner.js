// ironboy, Node Hill, 2019,
// version 2.5

const fs = require('fs');
const path = require('path');
const request = require('request-promise-native');
const chai = require('chai');
const open = require('open');
const { restBasePath } = require('./rest-base-path.json');
const store = {};

// Activate should
chai.should();

// Set a cookie jar
let cookieJar = request.jar();
 
// Read the queries from the rest-queries folder
const files = fs.readdirSync('./rest-queries');
let source = [];
let queries = files
  .filter(x => x.substr(-3) === '.js')
  .map(x => {
    source.push(fs.readFileSync('./rest-queries/' + x, 'utf-8'));
    return {
      name: x.split('.js')[0],
      data: require('./rest-queries/' + x)
    }
  });

// Run the queries
run();
async function run() {
  let all = [];
  let co = -1;
  for (let query of queries) {
    co++;
    let shouldRun = true;
    let run = -1;
    while (shouldRun) {
      shouldRun = false;
      run++;
      let response = [];
      let q = query.data({
        expect: chai.expect,
        assert: chai.assert,
        repeat: () => shouldRun = true,
        response,
        store,
        i: run
      });
      let req = {
        uri: restBasePath + q.path,
        method: q.method,
        'content-type': 'application/json',
        json: q.body,
        jar: cookieJar
      };
      let res = {error: 404};
      try {
        res = await request(req);
      }
      catch(e){}
      if (typeof res === 'string') {
        try {
          res = JSON.parse(res);
        }
        catch(e){
          res = {nonJSON: res};
        }
      }
      Object.assign(response, res);
      req.json && (req.body = req.json);
      delete req['content-type'];
      delete req.json;
      delete req.jar;
      let t = {
        name: query.name,
        request: {...req},
        response: res,
        tests: [],
        status: 'passed'
      };
      try {
        q.setup();
      }
      catch (e) {}
      let failedAt = -1;
      try {
        q.test();
      }
      catch (e) {
        t.status = 'failed';
        failedAt = (e.stack + '').split('.js:')[1].split(':')[0] / 1;
        t.error = e + '';
      }
      t.tests = source[co].split('\n').map(
        (x, i) => i + 1 === failedAt ? '*' + x.trim() : x
      ).filter((x, i) =>
        i + 1 === failedAt ||
        x.includes('.should.') ||
        x.match(/assert\s*[\(\.]/) ||
        x.match(/expect\s*\(/)
      ).map(x => x.slice(-1) === ';' ? x.slice(0, -1).trim() : x.trim());
      all.push(t);
    }
  }
  let niceDate = getNiceDate();
  let fileName = path.join(__dirname, 'logs', niceDate) + '.html';
  let jsonFileName = fileName.split('.html').join('.json')
  fs.writeFileSync(fileName, displayTemplate(niceDate, all), 'utf-8');
  fs.writeFileSync(jsonFileName, JSON.stringify(all, '', '  '), 'utf-8');
  open(fileName);
}

// A basic display template
function displayTemplate(niceDate, all) {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>${niceDate.split('.').join(':')}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i|Source+Code+Pro&display=swap" rel="stylesheet">
        <style>${fs.readFileSync('./test-runner.css', 'utf-8')}</style>
      </head>
      <body>
        <script>
          render('${niceDate.split('.').join(':')}', ${JSON.stringify(all, '', '  ')});
          ${render}
        </script>
      </body>
    </html>
  `
}

// Render the JSON data into the display template
function render(niceDate, all) {
  let html = `<h1>REST test run ${niceDate.replace(/_/g, ' ')}</h1>`;
  for (let t of all) {
    let failedOn, badError = t.error && !t.error.includes('AssertionError');
    for (let i in t) {
      if (i === 'error') { continue; }
      if (i === 'name') {
        let runs = all.filter(x => x.name === t[i]);
        let runInfo = runs.length < 2 ? '' : ', run ' +
          (runs.indexOf(t) + 1) + '/' + runs.length;
        html += `<hr><h2>${t[i]}${runInfo}</h2>`;
        continue;
      }
      let h3 = i[0].toUpperCase() + i.slice(1);
      if (i === 'status' && failedOn) {
        failedOn = badError ? 'non-test (other code)' : ' ' + failedOn;
        t[i] += ` on ${badError ? '' : 'test'}` + failedOn
      }
      if (i === 'tests') {
        let l = t[i].length - (badError ? 1 : 0);
        if (l === 0 && !badError) { continue; }
        if (l === 1 && badError) { h3 = '0 tests'; }
        else if (l === 1) { h3 = '1 test' }
        else { h3 = l + ' tests' }
        let _class = 'passed';
        t[i] = t[i].map((x, i) => {
          x[0] === '*' && (_class = 'failed');
          x[0] === '*' && (failedOn = i + 1);
          let r = `<pre class="a-test ${_class}">${x.slice(x[0] === '*')}`
            + `${x[0] === '*' ? '<hr>' + t.error : ''}</pre>`
          x[0] === '*' && (_class = 'undone');
          return r;
        }).join('');
      }
      html += `
        <h3>${h3}</h3>
        ${i === 'tests' ? '' : `<pre class="${i} ${t[i]}"
        >`}${t[i].substr ? t[i] : JSON.stringify(t[i], '', '  ')}${i === 'tests' ? '' : `</pre>`}
      `
    }
  }
  let div = document.createElement('div');
  let footer = document.createElement('footer');
  div.innerHTML = html;
  footer.innerHTML = `
    <a
      target="_blank"
      href="${location.pathname.split('.html').join('.json')}" 
      class="json"
    >Show test result as JSON</a>
  `;
  document.body.append(div);
  document.body.append(footer);
}

// old school nice date
// not depending on locale
function getNiceDate(){
  let d = new Date();
  let t = '';
  t += d.getFullYear();
  t += ((d.getMonth() + 1) + '').padStart(2, '0');
  t += (d.getDate() + '').padStart(2, '0');
  t += '_';
  t += (d.getHours() + '').padStart(2, '0') + '.';
  t += (d.getMinutes() + '').padStart(2, '0') + '.';
  t += (d.getSeconds() + '').padStart(2, '0');
  return t;
}