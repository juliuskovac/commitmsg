const fs = require('fs');
const { request } = require('http');
const { release } = require('os');
const path = require('path');

const gitRootDir = __dirname + '/../';
const messageFile = path.normalize(gitRootDir + '/' + process.argv[2]);
const message = fs.readFileSync(messageFile, {encoding: 'utf-8'});

// allow exceptions
if (message.startsWith('Pull request') || message.startsWith('Merge pull request')) {
    process.exit(0);
}

if (message.startsWith('major release') || message.startsWith('minor release') || message.startsWith('patch release')) {
    process.exit(0);
}

const parts = message.split(" ")

if (parts.length < 2) {
    console.log('not enough')
    reportError()
}
const issue = parts[0]

// https://stackoverflow.com/questions/19322669/regular-expression-for-a-jira-identifier
const jiraFormat = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g

const issueReversed = reverse(issue)
const valid = jiraFormat.test(issueReversed)
if (!valid) { 
    reportError()
}

const messageStart = parts[1]
const messageFormat = /^[^\s].+$/
const validMessage = messageFormat.test(messageStart)
if (!validMessage) { 
    reportError()
}

function reverse(s) {
    return [...s].reverse().join("");
}

function reportError() {
    console.log('please use commit message in format "JIRA-nnnn commit description"')
    process.exit(1);
}