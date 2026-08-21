const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://2025mohammeds_db_user:Saad%402000@saad.0lg2ggs.mongodb.net/hospitalDB?retryWrites=true&w=majority&appName=Saad');
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;