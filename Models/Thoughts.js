const { Schema, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a new thought
const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },

    createdAt: {
        type: Date, // Default value is a timestamp
        default: Date.now, // Use a getter method to format the timestamp on query
        // Use a getter method to format the timestamp on query
        get: timeStamp => dateFormat(timeStamp)
    },

    username: { // The user that created this thought
        type: String,
        required: true
    },

     // array of nested documents created with the reactionSchema
    reactions: [reactionSchema],

})

// A virtual that retrieves the length of the thought's reactions array field on query

thoughtSchema.virtual('reactionSchema').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;