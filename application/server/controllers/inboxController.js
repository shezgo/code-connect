const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { User } = require("../db/models/index");
const { Message } = require("../db/models/index");
const { Op } = require("sequelize");


exports.inbox_message_post = asyncHandler(async (req, res) => {
    const { sendingUserID, receivingUserID, content } = req.body;

    const sendingUser = await User.findOne({
        //parse string into first and last name
        where: {
            userID: sendingUserID
        }
    });

    const receivingUser = await User.findOne({
        where: {
            userID: receivingUserID
        }
    });

    //Verify both sender and receiver are real users in the DB.
    if (!sendingUser || !receivingUser) {
        throw boom.unauthorized("Sending or Receiving User not found");
    }

    console.log('Sending User:', sendingUser);
    console.log('Receiving User:', receivingUser);

    const newMessage = await Message.create({
        userID: sendingUser.userID,
        sendingUser: `${sendingUser.firstName} ${sendingUser.lastName}`,
        receivingUser: `${receivingUser.firstName} ${receivingUser.lastName}`,
        time: new Date().toISOString().split('T')[1].split('.')[0],
        date: new Date().toISOString().split('T')[0],
        content: content
    });

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
});

exports.inbox_message_get = asyncHandler(async (req, res) => {
    const { sendingUserID, receivingUserID } = req.query;

    const sendingUser = await User.findOne({
        //parse string into first and last name
        where: {
            userID: sendingUserID
        }
    });

    const receivingUser = await User.findOne({
        //parse string into first and last name
        where: {
            userID: receivingUserID
        }
    });

    if (!sendingUser || !receivingUser) {
        throw boom.unauthorized("Sending or Receiving User not found");
    }

    const messages = await Message.findAll({
        where: {
            [Op.or]: [
                {
                    sendingUser: `${sendingUser.firstName} ${sendingUser.lastName}`,
                    receivingUser: `${receivingUser.firstName} ${receivingUser.lastName}`
                },
                {
                    sendingUser: `${receivingUser.firstName} ${receivingUser.lastName}`,
                    receivingUser: `${sendingUser.firstName} ${sendingUser.lastName}`
                }
            ]
        },
        order: [['date', 'ASC'], ['time', 'ASC']] // Optional: Sort by date and time
    });

    res.status(200).json({ messages });
});