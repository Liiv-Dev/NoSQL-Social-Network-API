const { Schema, model } = require('mongoose');

// Schema to create user Model
const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        min: 4
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            }
        }
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
    }
);

// Virtual to count the number of friends a user has
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;