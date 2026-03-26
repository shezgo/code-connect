const { UserForum, Forum, Thread, Reply, User } = require('../db/models');

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
        const { title, topic} = req.body;

        if (!title) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new forum 
        const newForum = await Forum.create({
            title,
            topic
        });

        res.json({forum: newForum});
    } catch (error) {
        next(error);
    }
};


exports.addThread = async (req, res, next) => {
    try {
        const {title, content, topic} = req.body;

        if (!title || !content || !topic) {
            return res.status(400).json({ error: 'Fill missing fields' });
        }

        const user = await User.findByPk(req.userID);

        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];

        // Create a new forum thread
        const newThread = await Thread.create({
            title,
            content,
            topic,
            userName: user ? user.userName : 'Anonymous',
            date,
            time
        });

        res.json({thread: newThread});
    } catch (error) {
        next(error);
    }
};

exports.addReply = async (req, res, next) => {
    try {
        const { body, threadID } = req.body;

        if (!body) {
            return res.status(400).json({ error: 'Fill missing fields' });
        }

        const user = await User.findByPk(req.userID);

        const newReply = await Reply.create({
            body,
            threadID,
            userName: user ? user.userName : 'Anonymous'
        });

        res.json({reply: newReply});
    } catch (error) {
        next(error);
    }
};

exports.listThread = async (req, res, next) => {
    const topic = req.query.topic;
    let filter = null;
    if(topic){
       filter = {topic:topic};
    }
    const threads = await Thread.findAll({
        where: filter,
        include: [{ model: Reply, separate: true, order: [['replyID', 'ASC']] }]
    });
    res.json({ records: threads });
}

exports.updateVote = async (req, res, next) => {
    try {
        const { threadID } = req.params;
        const { delta } = req.body;
        const thread = await Thread.findByPk(threadID);
        if (!thread) return res.status(404).json({ error: 'Thread not found' });
        thread.likes = (thread.likes || 0) + delta;
        await thread.save();
        res.json({ likes: thread.likes });
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userID);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ userName: user.userName });
    } catch (error) {
        next(error);
    }
};

exports.updateReplyVote = async (req, res, next) => {
    try {
        const { replyID } = req.params;
        const { delta } = req.body;
        const reply = await Reply.findByPk(replyID);
        if (!reply) return res.status(404).json({ error: 'Reply not found' });
        reply.likes = (reply.likes || 0) + delta;
        await reply.save();
        res.json({ likes: reply.likes });
    } catch (error) {
        next(error);
    }
};

exports.deleteReply = async (req, res, next) => {
    try {
        const { replyID } = req.params;
        const reply = await Reply.findByPk(replyID);
        if (!reply) return res.status(404).json({ error: 'Reply not found' });

        const user = await User.findByPk(req.userID);
        if (!user || reply.userName !== user.userName) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await reply.destroy();
        res.json({ message: 'Reply deleted' });
    } catch (error) {
        next(error);
    }
};

exports.deleteThread = async (req, res, next) => {
    try {
        const { threadID } = req.params;
        const thread = await Thread.findByPk(threadID);
        if (!thread) return res.status(404).json({ error: 'Thread not found' });

        const user = await User.findByPk(req.userID);
        if (!user || thread.userName !== user.userName) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await Reply.destroy({ where: { threadID } });
        await thread.destroy();
        res.json({ message: 'Thread deleted' });
    } catch (error) {
        next(error);
    }
};