import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    personal_code: String,
    first_name: String,
    last_name: String,
    location: String,
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;