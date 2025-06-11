import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    events: {
        type: [],
    }
});

const UserModel = model('User', UserSchema);
export default UserModel;