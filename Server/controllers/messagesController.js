const Messages = require('../models/messageModel');


module.exports.addMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from
        });
        if (data) {      
            res.status(200).json({
                message: "Message sent successfully",
            });
        } else {
            res.status(400).json({
                message: "Message not sent",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Registration failed",
            status: false
        });

    }
}

module.exports.getAllMessage = async (req, res) => {
    try {
        
        const { from, to } = req.body;
        const data = await Messages.find({ users: { $all: [from, to] } }).sort({ createdAt: 1 });
        if (data) {
            const projectMessages = data.map((message) => {
                return {
                    fromSelf: message.sender.toString() === from,
                    message: message.message.text,
                }
            })
            res.status(200).json(projectMessages);
        } else {
            res.status(400).json({
                message: "No messages found",
            });
        }

    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            status: false
        });

    }
}

