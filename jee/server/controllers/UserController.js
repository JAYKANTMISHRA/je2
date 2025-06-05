const user = require("../models/signupModel");
const problem = require("../models/contributerModel");
const bcrypt = require('bcrypt');

exports.getUserData = async (req, res) => {
    try {
        const urlId = req.query.urlId;
        const userId = req.query.userId;

        const userX = await user.findOne({ _id: urlId });
        const solvedProb = userX.solvedQuestion || [];
        const totalProbSolved = solvedProb.length;
        let tagsCount = {};

        // Using for...of loop to handle async/await properly
        for (const probId of solvedProb) {
            let prob = await problem.findOne({ _id: probId });
            prob.tags.forEach(tag => {
                if (tagsCount[tag]) {
                    tagsCount[tag]++;
                } else {
                    tagsCount[tag] = 1;
                }
            });
        }

        const name = userX.name;
        const email = userX.email;
        const friendCount = userX.friendCount;

        const userY = await user.findOne({_id: userId});
        
        const list = userY.friends;
        const friend = list.indexOf(urlId) !== -1;

        res.status(200).json({
            success: true,
            data: {
                name: name,
                email: email,
                friendCount: friendCount,
                totalProbSolved: totalProbSolved,
                tagsCount: tagsCount,
                friend: friend
            },
            message: "User data retrieved successfully!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failed to send the user data!!!"
        });
    }
};

exports.removeFriend = async (req, res) => {
    try {
        const userId = req.query.userId;
        const friendId = req.query.friendId; 

        const userX = await user.findOne({_id: userId});
        
        const arr = userX.friends;
        const id = arr.indexOf(friendId);
        arr.splice(id, 1);
        userX.friends = arr;
        
        const friendX = await user.findOne({_id: friendId});
        friendX.friendCount--;

        await friendX.save();
        await userX.save();

        userX.password = undefined;
        res.status(200).json({
            success: true,
            data: userX,
            message: "Friend managed successfully!!!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failed to manage friend!!!"
        });
    }
};

exports.addFriend = async (req, res) => {
    try {
        const userId = req.query.userId;
        const friendId = req.query.friendId; 

        const userX = await user.findOne({_id: userId});
        const friendX = await user.findOne({_id: friendId});
        friendX.friendCount++;

        userX.friends.push(friendId);
        await userX.save();
        await friendX.save();

        userX.password=undefined;
        res.status(200).json({
            success: true,
            data: userX,
            message: "Friend managed successfully!!!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failed to manage friend!!!"
        });
    }
};

exports.manageFriend = async (req, res) => {
    try {
        const userId = req.query.userId;
        const friendId = req.query.friendId; 
        const state = req.query.state; 

        const userX = await user.findOne({_id: userId});
        if(state){
            userX.friends.push(friendId);
        }
        else{
            const arr = userX.friends;
            const id = arr.indexOf(friendId);
            arr.splice(id, 1);
            userX.friends = arr;
        }
        await userX.save();

        userX.password=undefined;
        res.status(200).json({
            success: true,
            data: userX,
            message: "Friend managed successfully!!!"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failed to manage friend!!!"
        });
    }
};

exports.getFriendList = async (req, res) => {
    try {
        const userId = req.query.userId;
        const userX = await user.findOne({ _id: userId });

        const list = userX.friends || [];
        let friendList = [];
        if(list.length){
            friendList = await Promise.all(
                list.map(element => user.findOne({ _id: element }))
            );
        }
        // console.log(friendList);
        res.status(200).json({
            success: true,
            data: friendList || [],
            message: "Friend list sent successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Failed to send friend list!!!"
        });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { email, userEmail, oldPassword, newPassword, cnfPassword, school } = req.body;
        if (email === "" || oldPassword === "" || newPassword === "" || cnfPassword==="") {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully'
            });
        }
        if (email !== userEmail) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect email'
            });
        }

        if(newPassword !== cnfPassword){
            return res.status(400).json({
                success: false,
                message: 'check the confirm password again!!!'
            })
        }

        const userX = await user.findOne({ email: userEmail });
        if (!userX) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, userX.password);
        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            userX.password = hashedPassword;
            userX.school = school;
            await userX.save();
            userX.password=undefined;
            return res.status(200).json({
                success: true,
                data: userX,
                message: 'Changes updated successfully!'
            });
        } catch (hashingError) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update the changes',
            error: err.message
        });
    }
};