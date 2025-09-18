const { v4 } = require("uuid");
const Caregiver = require('../Model/careGiver')

exports.createCaregiver = async (req, res) => {
    try {
        const { name, age, experience, specialties, hourlyRate, location, languages, imageUrl, phoneNumber, email, description, availability } = req.body;

        const caregiver = new Caregiver({
            _id: v4(),
            name,
            age,
            experience,
            specialties,
            hourlyRate,
            location,
            languages,
            imageUrl,
            phoneNumber,
            email,
            description,
            availability,

        });


        await caregiver.save();

        res.status(201).json({
            message: "Caregiver created successfully",
            caregiver
        });


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

exports.searchCaregivers = async (req, res) => {
    try {
        const {
            specialties,
            maxHourlyRate,
            languages,
            availability,
            location
        } = req.body;

        y
        let query = {};

        if (specialties && specialties.length > 0) {
            query.specialties = { $in: specialties };
        }

        // Filter by maximum hourly rate
        if (maxHourlyRate) {
            query.hourlyRate = { $lte: parseInt(maxHourlyRate) };
        }

        // Filter by languages (if any are selected)
        if (languages && languages.length > 0) {
            query.languages = { $in: languages };
        }

        // Filter by availability (if any are selected)
        if (availability && availability.length > 0) {
            query.availability = { $in: availability };
        }

        // Filter by location (case-insensitive partial match)
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        console.log("Search query:", query);

        const caregivers = await Caregiver.find(query);

        res.status(200).json({
            success: true,
            count: caregivers.length,
            caregivers
        });

    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find();

        res.status(200).json({
            success: true,
            count: caregivers.length,
            caregivers
        });

    } catch (err) {
        console.error("Error fetching caregivers:", err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};