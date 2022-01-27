const fs = require('fs').promises;

const targetFile = './dist/index.html';

main(targetFile)

async function main(file) {
  const data = await fs.readFile(file, 'utf8');
  let result =  data.replace('/index.js', 'index.js');
  result =  result.replace('/style.css', 'style.css');
  result =  result.replace('/favicon.svg', 'favicon.svg');
  await fs.writeFile(file, result, 'utf8');
}


