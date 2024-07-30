const { Post, ForumThread, Forum, UserForum } = require('../../db/models');

// Controller to get selected forums for the user who is logged in
exports.getUserForums = async (req, res, next) => {
    try {
        // Fetch forums related to the logged-in user
        const userID = req.userID; // Extract userID from the authenticated request

        // Find the forums associated with the user frm the UserForum table
        const userForums = await UserForum.findAll({
            where: { userID: userID },
            include: [{ model: Forum }] // Join the Forum model to get forum details
        });

        // Get all the forums only from the associative table
        const forums = userForums.map(userForum => userForum.Forum);

        // Send the forums back in the response. Frontend will need to parse this 
        // and organize depending on flags for isPrivateForum, isMentorForum, isPublicForum.
        res.json({ forums });
    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
};

exports.addForum = async (req, res, next) => {
    try {
        const { threadTitle, threadContent, isPublicForum, isPrivateForum, isMentorForum } = req.body;

        if (!threadContent || !threadTitle) {
            return res.status(400).json({ error: 'All fields are required' });
        }

    
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();

        // Create a new forum 
        const newForum = await Forum.create({
            threadTitle,
            date,
            time,
            threadContent,
            isPublicForum,
            isPrivateForum,
            isMentorForum
        });

        res.json({forum: newForum});
    } catch (error) {
        next(error);
    }
};

exports.addForumThread = async (req, res, next) => {
    try {
        const { threadID, threadTitle, codeBlock, forumID } = req.body;

        if (!threadID || !threadTitle || !codeBlock || !forumID) {
            return res.status(400).json({ error: 'All fields are required' });
        }


        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();

        // Create a new forum thread
        const newForumThread = await ForumThread.create({
            threadID,
            date,
            time,
            threadTitle,
            codeBlock,
            forumID
        });

        res.json({forumThread: newForumThread});
    } catch (error) {
        next(error);
    }
};

exports.addPost = async (req, res, next) => {
    try {
        const {threadID, content} = req.body;


        if (!post || !threadID) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Get current date and time
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();

        const userID = req.userID;
        likes = 0;



        // Create a new post
        const newPost = await Post.create({
            threadID,
            date,
            time,
            threadTitle,
            codeBlock,
            forumID,
            userID,
            likes
        });

        res.json({post: newPost});
    } catch (error) {
        next(error);
    }
};