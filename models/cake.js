const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 200,
    },
    baker: {
        type: String,
        required: true,
        minn: 8,
        max: 300,
    },
    ingredients: {
        type: [String],
        required: true,
        min: 1,
        enum: ["chocolate", "flour", "gluten free floour", "eggs", "milk", "strawberry", "vanilla", "sugar"],
    },
    stock: {
        type: Number,
        required: true,
        min: 1
    },
    expirationDate: {
        type: Date,
        default: Date.now()
    },
    isGlutenFree: {
        type: Boolean,
        default: false
    }
});

// model
const Cake = mongoose.model('Cake', cakeSchema);

// export
module.exports = Cake