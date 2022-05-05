const fs = require('fs');
const path = require('path');

const gitRootDir = __dirname + '/../';

console.log(__dirname);

const messageFile = path.normalize(gitRootDir + '/' + process.argv[2]);

const message = fs.readFileSync(messageFile, {encoding: 'utf-8'});

console.log('message', message);

console.log('index in root')
console.log(process.argv);
//console.log(process.env.HUSKY_GIT_PARAMS.split(' ')[0])