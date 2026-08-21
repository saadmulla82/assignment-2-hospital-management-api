const Hospital = require('../models/Hospital');

exports.getAllHospitals = async (request, response) => {
    try {
        const hospitals = await Hospital.find();
        response.status(200).json(hospitals);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.getAvailableHospitals = async (request, response) => {
    try {
        const hospitals = await Hospital.find({ availableBeds: { $gt: 0 } });
        response.status(200).json(hospitals);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.getHospitalById = async (request, response) => {
    try {
        const hospital = await Hospital.findById(request.params.id);
        if (!hospital) {
            return response.status(404).json({ message: 'Hospital not found' });
        }
        response.status(200).json(hospital);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.createHospital = async (request, response) => {
    try {
        const { name, city, totalBeds, availableBeds } = request.body;

        if (!name || !city || !totalBeds || !availableBeds) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        const newHospital = new Hospital({ name, city, totalBeds, availableBeds });
        await newHospital.save();

        response.status(201).json({ message: 'Hospital added successfully', hospital: newHospital });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.updateHospital = async (request, response) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!hospital) {
            return response.status(404).json({ message: 'Hospital not found' });
        }
        response.status(200).json({ message: 'Hospital updated successfully', hospital });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.deleteHospital = async (request, response) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(request.params.id);
        if (!hospital) {
            return response.status(404).json({ message: 'Hospital not found' });
        }
        response.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
