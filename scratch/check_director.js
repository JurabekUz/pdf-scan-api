const mongoose = require('mongoose');
require('dotenv').config();

async function check() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected");
        
        const User = mongoose.model('User', new mongoose.Schema({
            name: String,
            role: Number,
            file: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }
        }));
        
        const director = await User.findOne({ role: 1 }).populate('file');
        if (director) {
            console.log("Director Found:", JSON.stringify(director, null, 2));
        } else {
            console.log("No Director found with role 1");
        }
        
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

check();
