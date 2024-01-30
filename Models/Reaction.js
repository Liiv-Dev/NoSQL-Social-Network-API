const { Schema, model } = require('mongoose');

// 
const reactionSchema = new Schema ({

    reactionId: {
        type: Schema.types.ObjectId,
        default: () => new types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        max: 280
    },

    username: {
        type: String,
        required: True
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => dateFormat(timeStamp)
    }
});

module.exports = reactionSchema;