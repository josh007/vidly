const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 100
    },
    dailyRentalRate: {
        type: Number,
        min: 0
    },
    genre: {
        type: genreSchema,
        required: true
    }
}));


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        numberInStock: Joi.number().min(0).max(100),
        dailyRentalRate: Joi.number().min(0),
        genreId: Joi.string().required()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;