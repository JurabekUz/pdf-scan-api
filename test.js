const mongoose = require('mongoose');

// Parolni O'ZINGIZNING PAROLINGIZGA almashtiring
const url = "mongodb+srv://jurabekdev:Urf9MCxxa9oh5chx@cluster0.cdwde13.mongodb.net/pdf-scan-api?retryWrites=true&w=majority";

console.log("Bazaga ulanish boshlandi (IPv4 rejimida)...");

mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000, // 30 soniya kutmaslik uchun 5 soniyaga tushirdik
    family: 4 // MUHIM: Faqat IPv4 orqali ulanishga majburlash
})
.then(() => {
    console.log("✅ TABRIKLAYMAN! Baza bilan aloqa muvaffaqiyatli o'rnatildi!");
    process.exit(0);
})
.catch(err => {
    console.error("❌ XATOLIK CHIQDI:");
    console.error(err.message);
    process.exit(1);
});
