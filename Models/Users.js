const { Schema, model } = require('mongoose');

// Schema to create a new user
const userSchema = new Schema({

    username: {
        type: String,
        unnqiue: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: { $regex: /@mongodb\.com$/ },
    },

    thoughts: [{
        type: Schema.Types.objectId,
        ref: 'Thought'
    }],

    friends: [{
        type: Schema.Types.objectId,
        ref: 'User'
    }],

    toJSON: {
        virtuals: true,
        },
        id: false,
    }
);

// Virtual to count the number of friends a user has
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('user, userSchema');

module.exports = User;