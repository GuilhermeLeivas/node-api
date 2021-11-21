import mongoose from "mongoose";
import bcryptUtil from "@utils/bcryptUtil";

/**
 * Represents the user ts interface.
 */
export interface UserDocument extends mongoose.Document {
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(canditadePassword: string): Promise<Boolean>
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
    user.password = await bcryptUtil.passwordCryptor(user.password);
});

userSchema.methods.comparePassword = async function (canditadePassword: string): Promise<Boolean> {
    const user = this as UserDocument;
    return await bcryptUtil.compareEncryptedPassword(canditadePassword, user);
}

const User = mongoose.model("User", userSchema);

export default User;