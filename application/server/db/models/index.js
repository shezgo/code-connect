//Should we delete this file and keep all models in server/db/index.js?
module.exports = {
    User:require("./user.js"),
    Post:require("./post.js"),
    Message:require("./message.js"),
    Inbox:require("./inbox.js"),
    MessageThread:require("./messageThread.js"),
    Profile:require("./profile.js"),
    ExternalLinks:require("./externalLinks.js"),
    Portfolio:require("./portfolio.js"),
}

