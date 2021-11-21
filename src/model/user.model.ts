import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

/**
 * Represents the user ts interface.
 */
export interface UserDocument extends mongoose.Document {
    email: String,
    name: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
}

/**
 * Represents the user Schema in mongodb.
 */
const userSchema = new mongoose
    .Schema(
        {
            email: { type: String, required: true },
            name: { type: String, required: true },
            password: { type: String, required: true }
        },
        {
            // This propertie tells mongodb to keep track of
            // createdAt and updatedAt values of the schema Documents. 
            timestamps: true
        });

userSchema.pre("save", async function (next: any) {
    let user = this as UserDocument;

});

const User = mongoose.model("User", userSchema);

export default User;