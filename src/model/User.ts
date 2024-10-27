import mongoose, {Schema, Document, mongo } from "mongoose"

export interface Message extends Document{
    content: string
    createdAt: Date
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export interface User extends Document{
    username: string
    email: string
    password: string
    VerificationCode: string
    VerificationCodeExpiry: Date
    isVerified: boolean
    isAcceptingMessages: boolean
    messages: Message[]
}
const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        match: [/.+\@.+\..+/,"Enter valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
    VerificationCode: {
        type: String,
        required: [true, "Verification code required"],
    },
    VerificationCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry date required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

export default UserModel;