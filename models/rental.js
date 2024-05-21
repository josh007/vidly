const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            isGold: {
                type: Boolean,
                deafult: false
            },
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 12
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                min: 0
            },
        }),
        required:true
    },
    dateOut:{
        type: Date,
        default: Date.now,
        required:true
    },
    dateReturned:{
        type: Date,
    },
    rentalFee:{
        type:Number,
        min:0
    }
}));


function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;