const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.status(400).json({
                message: "Username already exists",
                status: false
            });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({
                message: "Email already exists",
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        delete user.password

        res.status(200).json({
            message: "Registration successful",
            user: user,
            status: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Registration failed",
            status: false
        });

    }
}

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userData = await User.findOne({ username });
        if (!userData) {
            return res.status(404).json({
                message: "Incorrect Username Or Password",
                status: false
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({
                message: "Incorrect Username Or Password",
                status: false
            });
        }
        delete userData.password
        res.status(200).json({
            message: "Login Successful",
            user: userData,
            status: true
        });

    } catch (error) {

        res.status(500).json({
            message: "Login failed",
            status: false
        });

    }
}


module.exports.setAvatar = async (req, res) => {
 
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        });
        const userData = await User.findById(userId);
        return res.status(200).json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })
    } catch (error) {
        res.status(500).json({
            message: "Set Avatar failed",
            status: false
        });

    }
}

module.exports.getAllUsers = async (req, res) => {
 
    try {
        const userId = req.params.id;
        const userData = await User.find({ _id: { $ne: userId } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.status(200).json(userData)
    } catch (error) {
        return res.status(500).json({
            message: "Get All User Failed",
            status: false
        });

    }
}