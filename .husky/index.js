const fs = require('fs');
const path = require('path');

const gitRootDir = __dirname + '/../';
const messageFile = path.normalize(gitRootDir + '/' + process.argv[2]);
const message = fs.readFileSync(messageFile, {encoding: 'utf-8'});

const parts = message.split(" ")
console.log(parts.length)
if (parts.length < 2) {
    reportError()
}
const issue = parts[0]

// https://stackoverflow.com/questions/19322669/regular-expression-for-a-jira-identifier
var jira_matcher = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g

const issueReversed = reverse(issue)
const valid = jira_matcher.test(issueReversed)
if (!valid) { 
    reportError()
}

function reverse(s) {
    return [...s].reverse().join("");
}

function reportError() {
    console.log('please use commit message in format "JIRA-nnnn your message"')
    process.exit(1);
}