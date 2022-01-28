const fs = require('fs').promises;

let targetFile = './dist/index.html';
// format index.html
main(targetFile)

// format index.js
targetFile = './dist/index.js';
main(targetFile)

async function main(file) {
  const data = await fs.readFile(file, 'utf8');
  let result =  data.replace('/index.js', 'index.js');
  result =  result.replace('/style.css', 'style.css');
  result =  result.replace('/favicon.svg', 'favicon.svg');
  result =  result.replace('/logo.svg', 'logo.svg');
  await fs.writeFile(file, result, 'utf8');
}


