const CodeChallenge = require("./codeChallenge .js");
const ForumThread = require("./forumThread.js");

//Should we delete this file and keep all models in server/db/index.js?
module.exports = {
    User:require("./user.js"),
    Message:require("./message.js"),
    Inbox:require("./inbox.js"),
    MessageThread:require("./messageThread.js"),
    Profile:require("./profile.js"),
    ExternalLinks:require("./externalLinks.js"),
    Portfolio:require("./portfolio.js"),
    Project:require("./project.js"),
    Post:require("./post.js"),
    ForumThread:require("./forumThread.js"),
    Forum:require("./forum.js"),
    UserChallenge:require("./userChallenge.js"),
    CodeChallenge:require("./codeChallenge.js"),
    UserNotification:require("./userNotification.js"),
    Ranks:require("./ranks.js"),
    Rank:require("./rank.js"),

}

