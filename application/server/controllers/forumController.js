const { UserForum, Forum, Thread, Reply } = require('../../db/models');

// Controller to get selected forums for the user who is logged in by checking associative table
exports.getUserForums = async (req, res, next) => {
    try {
       //Grab the user's ID from the request
        const userID = req.userID; 

        // Find the forums associated with the user frm the UserForum table
        // Find the threads associated with each forum
        // Find the replies associated with each thread
        const userForums = await UserForum.findAll({
            where: { userID: userID },
            include: [{
                model: Forum,
                include: [{
                    model: Thread,
                    include: [Reply] 
                }]
            }]
        });

        // Get all the forums only from the associative table
        const forums = userForums.map(userForum => userForum.Forum);

        // Send the forums back in the response. Frontend will need to parse this 
        // and organize depending on flags for isPrivateForum, isMentorForum, isPublicForum.
        res.json({ forums });
    } catch (error) {
        next(error); // Pass errors to the middleware
    }
};

exports.addForum = async (req, res, next) => {
    try {
        const { title, link, isPublicForum, isPrivateForum} = req.body;

        if (!title || !link) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new forum 
        const newForum = await Forum.create({
            title,
            link,
            isPublicForum,
            isPrivateForum,
        });

        res.json({forum: newForum});
    } catch (error) {
        next(error);
    }
};


exports.addThread = async (req, res, next) => {
    try {
        const {forumID, originalPoster, threadTitle, username } = req.body;

        if (!forumID || !originalPoster || !threadTitle) {
            return res.status(400).json({ error: 'Fill missing fields' });
        }


        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();

        // Create a new forum thread
        const newThread = await ForumThread.create({
            threadID,
            date,
            time,
            threadTitle,
            forumID,
            originalPoster,
            username
        });

        res.json({thread: newThread});
    } catch (error) {
        next(error);
    }
};

exports.addReply = async (req, res, next) => {
    try {
        const {threadID, body, username} = req.body;


        if (!threadID || !body) {
            return res.status(400).json({ error: 'Fill missing fields' });
        }


        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();

        const userID = req.userID;

        // Create a new reply to a thread
        const newReply = await Reply.create({
            threadID,
            date,
            time,
            body,
            userID
        });

        res.json({reply: newReply});
    } catch (error) {
        next(error);
    }
};