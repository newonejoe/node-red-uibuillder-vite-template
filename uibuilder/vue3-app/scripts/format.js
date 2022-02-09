const fs = require('fs').promises;

let targetFile = './dist/index.html';
main(targetFile);
targetFile = './dist/index.js';
main(targetFile);

async function main(file){
  const data = await fs.readFile(file, 'utf8');

  let result = data.replace('/index.js', 'index.js');
  result = result.replace('/style.css', 'style.css');
  result = result.replace('/favicon.ico', 'favicon.ico');
  result = result.replace('/logo.png', 'logo.png');
  await fs.writeFile(file, result, 'utf8');
}
