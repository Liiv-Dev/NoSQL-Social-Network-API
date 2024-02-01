const { Schema, model } = require('mongoose');

// Schema to create a new reaction
const reactionSchema = new Schema ({

    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => dateFormat(timeStamp)
    }
});

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