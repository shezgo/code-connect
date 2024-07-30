const asyncHandler = require("express-async-handler");
const { User, Leaderboard } = require("../db/models/index")

exports.retrieve_leaderboard_get = asyncHandler(async (req, res) => {
    try {
        const leaderboardData = await Leaderboard.findAll({
            include: [{
                model: User, as: 'user'
                }]
        });
        res.json(leaderboardData);
    } catch (error){
        console.error(log);
        res.status(500).send("Internal server error.");
    }
});