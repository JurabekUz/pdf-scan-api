const mongoose = require('mongoose');
const { UserSchema } = require('./dist/database/user.scema.js');
const { connection } = require('./dist/database/connection.js');

async function test() {
    await connection();
    const user = await UserSchema.findOne({}, {}, { populate: { path: "file", select: "-is_delete -__v" } });
    console.log("File type:", typeof user.file, user.file);
    process.exit(0);
}
test().catch(console.error);
