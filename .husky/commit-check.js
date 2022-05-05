const fs = require("fs");
const path = require("path");

const gitRootDir = __dirname + "/../";
const messageFile = path.normalize(gitRootDir + "/" + process.argv[2]);
const message = fs.readFileSync(messageFile, { encoding: "utf-8" });

// allow exceptions
if (
  message.startsWith("Pull request") ||
  message.startsWith("Merge pull request")
) {
  process.exit(0);
}
if (
  message.startsWith("major release") ||
  message.startsWith("minor release") ||
  message.startsWith("patch release")
) {
  process.exit(0);
}

if (message.startsWith("release")) {
  process.exit(0);
}

const parts = message.split(" ");

if (parts.length < 2) {
  reportError("commit message needs to have at least two parts");
}

const issue = parts[0];

// https://stackoverflow.com/questions/19322669/regular-expression-for-a-jira-identifier
const jiraFormat = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;

const issueReversed = reverse(issue);
const valid = jiraFormat.test(issueReversed);
if (!valid) {
  reportError("invalid JIRA issue");
}

// message start with non whitespace character
// [^\s] match a single character not present in the list
const messageStart = parts[1];
const messageFormat = /^[^\s].*/;
const validMessage = messageFormat.test(messageStart);
if (!validMessage) {
  reportError("invalid commit description");
}

function reverse(s) {
  return [...s].reverse().join("");
}

function reportError(reason) {
  console.log(
    `please use commit message in format "JIRA-nnnn commit description" (${reason})`
  );
  process.exit(1);
}
