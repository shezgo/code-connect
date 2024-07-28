const asyncHandler = require("express-async-handler");
const boom = require("@hapi/boom");
const { User } = require("../db/models/index");
const { Message } = require("../db/models/index");
const { MessageThread } = require("../db/models/index");

exports.inbox_message_post = asyncHandler(async (req, res) => {
    const { sendingUserFirstName, sendingUserLastName, receivingUserFirstName, receivingUserLastName, content } = req.body;

    const sendingUser = await User.findOne({
        where: {
            firstName: sendingUserFirstName,
            lastName: sendingUserLastName
        }
    });

    const receivingUser = await User.findOne({
        where: {
            firstName: receivingUserFirstName,
            lastName: receivingUserLastName
        }
    });

    //Verify both sender and receiver are real users in the DB.
    if (!sendingUser || !receivingUser) {
        throw boom.unauthorized("Sending or Receiving User not found");
    }

    const newMessage = await Message.create({
        userID: sendingUser.userID,
        sendingUser: `${sendingUser.firstName} ${sendingUser.lastName}`,
        receivingUser: `${receivingUser.firstName} ${receivingUser.lastName}`,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        content: content
    });

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
});

exports.inbox_message_get = asyncHandler(async (req, res) => {
    const { sendingUserFirstName, sendingUserLastName, receivingUserFirstName, receivingUserLastName } = req.body;

    const sendingUser = await User.findOne({
        where: {
            firstName: sendingUserFirstName,
            lastName: sendingUserLastName
        }
    });

    const receivingUser = await User.findOne({
        where: {
            firstName: receivingUserFirstName,
            lastName: receivingUserLastName
        }
    });

    if (!sendingUser || !receivingUser) {
        throw boom.unauthorized("Sending or Receiving User not found");
    }

    const messages = await Message.findAll({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { sendingUser: `${sendingUserFirstName} ${sendingUserLastName}` },
                        { receivingUser: `${receivingUserFirstName} ${receivingUserLastName}` }
                    ]
                },
                {
                    [Op.and]: [
                        { sendingUser: `${receivingUserFirstName} ${receivingUserLastName}` },
                        { receivingUser: `${sendingUserFirstName} ${sendingUserLastName}` }
                    ]
                }
            ]
        },
        order: [['date', 'ASC'], ['time', 'ASC']] // Optional: Sort by date and time
    });

    res.status(200).json({ messages });
});