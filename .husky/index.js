const fs = require('fs');
const path = require('path');

const gitRootDir = __dirname + '/../';

console.log(__dirname);

console.log('index in root')
console.log(process.argv);
//console.log(process.env.HUSKY_GIT_PARAMS.split(' ')[0])