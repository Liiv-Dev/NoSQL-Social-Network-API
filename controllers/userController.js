const Users  = require('../models/Users');

module.exports = {
    // get all users
    async getUsers (req, res) {
        try {
            const users = await Users.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // find single user by id
    async getSingleUser (req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.userId })
        .select('-__v'); // exclude the __v field

        if(!user) {
            return res.status(404).json({ message: 'No user with that id!..'});
        }

        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new User
    async createUser (req, res) {
        try {
            const userData = await Users.create(req.body);
            res.json(userData)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a User by id
    async updateUser (req, res) {
        try {
            const userData = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            if(!userData) {
                return res.status(404).json({ message: 'No user with that id!..'});
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a User by id
    async deleteUser (res, req) {
        try {
            const userData = await Users.findOneAndDelete({ _id: req.params.userId });

        if (!userData) {
            return res.status(404).json({ message: 'No user with that id!..'});
        } 
        } catch (err) {
            res.status(500).json(err);
        }
    }
};