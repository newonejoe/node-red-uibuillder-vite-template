const fs = require('fs').promises;

const targetFile = './dist/index.html';

main(targetFile);

async function main(file){
  const data = await fs.readFile(file, 'utf8');

  let result = data.replace('/index.js', 'index.js');

  result = result.replace('/index.css', 'index.css');

  await fs.writeFile(file, result, 'utf8');
}
