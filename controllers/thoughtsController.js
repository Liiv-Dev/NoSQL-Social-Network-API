const Thought = require('../models/Thoughts');
const Users = require('../models/Users');

module.exports = {
    // get all thoughts
    getThoughts: async (req,res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // find single thought by id
    getThoughtByid: async (req,res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Create a new Thought
    createThought: async (req,res) => {
        const { thoughtText, username } = req.body;
        try {
            const thoughtData = await Thought.create({ thoughtText, username });
            const user = await Users.findOneAndUpdate(
                { username },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a Thought by id
    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id }, // filter
            req.body, // update data
            { new: true } // options
            );

            if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a Thought by id
    deleteThought: async (req,res) => {
        try {
            const deleteThought = await Thought.findByIdAndDelete(req.params.id);
            if (!deleteThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            // remove thought id from user's `thoughts` field
            const user = await Users.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            );
            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to delete' });
        }
    },

    // Add Reaction to Thought
    addReaction: async (req,res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete Reaction from Thought
    deleteReaction: async (req,res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            )

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}