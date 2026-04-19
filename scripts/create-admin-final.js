const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Bcrypt'ni o'zimiz shu yerda chaqiramiz
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/qr-code";

async function run() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("MongoDB ga ulandi.");

        // 1. Parolni o'zimiz shu yerda shifrlaymiz
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("parol2026", salt);

        // 2. Yoziladigan tayyor ma'lumot (Model aralashuvisiz)
        const adminData = {
            username: "admin",
            name: "Asosiy Admin",
            password: hashedPassword, // Shifrlangan parol
            role: 0,
            is_delete: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // 3. To'g'ridan-to'g'ri 'users' jadvaliga ulanamiz
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        // 4. Tekshiramiz va yozamiz
        const existing = await usersCollection.findOne({ username: adminData.username });
        
        if (existing) {
            console.log("Bu foydalanuvchi allaqachon yaratilgan.");
        } else {
            await usersCollection.insertOne(adminData);
            console.log("Muvaffaqiyat: Admin to'g'ridan-to'g'ri bazaga yozildi!");
        }

    } catch (error) {
        console.error("Xatolik yuz berdi:", error.message);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
}

run();
