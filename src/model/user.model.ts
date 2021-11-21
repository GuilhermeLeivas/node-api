import mongoose from "mongoose";
import passwordCryptor from "@utils/bcryptUtil";

/**
 * Represents the user ts interface.
 */
export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
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

/**This is triggred right before every save on an user document. 
 * Here, we are using to keep track every time a user changes his
 * password so we can encrypt it for safety.
*/
userSchema.pre("save", async function (next: any) {
    let user = this as UserDocument;
    if (!user.isModified('password')) {
        return next();
    }
    user.password = await passwordCryptor(user.password);
});

const User = mongoose.model("User", userSchema);

export default User;