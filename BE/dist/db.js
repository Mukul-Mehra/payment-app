import mongoose from "mongoose";
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://Mukul:fRQc8NLbccqwkPmV@cluster0.nbxxwdx.mongodb.net/patym-db');
const User = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: {
        type: String,
        unique: true
    }
});
const Account = new Schema({
    //@ts-ignore
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
export const UserModel = mongoose.model("User", User);
export const AccountModel = mongoose.model("Account", Account);
//# sourceMappingURL=db.js.map