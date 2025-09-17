const mongoose = require('mongoose');
const caregiverSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },

    specialties: {
        type: [String],
        enum: [
            'Elderly Care',
            'Dementia Care',
            'Alzheimers Care',
            'Physical Therapy',
            'Occupational Therapy',
            'Speech Therapy',
            'Home Health Aide',
            'Companionship Care',
            'Live-In Care',
            'Respite Care'
        ],
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    imageUrl: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    locationOnMap: {
        type: {
            type: String,
            enum: 'Point'
        },
        coordinates: {
            type: [Number]
        }
    },
    description: {
        type: String,
        maxLength: 1000
    },
    availability: {
        type: [String],
        enum: [
            'Daily',
            'All Day',
            'Mornings',
            'Evenings',
            'Weekdays',
            'Weekends'
        ],
        default: []
    },
    reviews: {
        type: [{
            rating: {
                type: Number,
                min: 0,
                max: 5
            },
            comment: {
                type: String,
                maxLength: 500
            }
        }],
        default: []
    }
});

const Caregiver = mongoose.model('Caregiver', caregiverSchema);

module.exports = Caregiver