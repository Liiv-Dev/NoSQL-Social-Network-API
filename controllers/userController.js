const Users  = require('../models/Users');

module.exports = {
    // get all users
    getUsers: async (req, res) => {
        try {
            const users = await Users.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

     // find single user by id
    getSingleUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Create a new User
    createUser: async (req, res) => {
        try {
            const userData = await Users.create(req.body);
            res.json(userData)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a User by id
    updateUser: async (req, res) => {
        try {
            const user = await Users.findOneAndUpdate(
                { _id: req.params.id }, // filter
                req.body, // update data
                { new: true } // options
            ).select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a User by id
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete' });
        }
    }
};