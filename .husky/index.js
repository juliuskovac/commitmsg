const fs = require('fs');
const path = require('path');

const gitRootDir = __dirname + '/../';
const messageFile = path.normalize(gitRootDir + '/' + process.argv[2]);
const message = fs.readFileSync(messageFile, {encoding: 'utf-8'});

const issue = message.split(" ")[0]

// https://stackoverflow.com/questions/19322669/regular-expression-for-a-jira-identifier
var jira_matcher = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g

function reverse(s) {
    return [...s].reverse().join("");
}

const issueReversed = reverse(issue)

const valid = jira_matcher.test(issueReversed)

if (valid) { 
    console.log('valid JIRA issue format')
} else {
    console.log('invalid JIRA issue format')
    process.exit(1);
}