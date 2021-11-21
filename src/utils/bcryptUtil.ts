import { UserDocument } from "@model/user.model";
import bcrypt from "bcrypt";
import config from "config";

/**
 * Encrypt any password
 * @param password Password to be encrypted
 * @returns Password encrypted
 */
const passwordCryptor = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}
/**
 * Compares two encrypted passwords
 * @param canditadePassword Password to be compare with user password
 * @param user User in database
 * @returns If password are equal
 */
const compareEncryptedPassword = async function (canditadePassword: string,
    user: UserDocument): Promise<Boolean> {
    return await bcrypt
        .compare(canditadePassword, user.password)
        .catch((ex) => false);
}

const bcryptUtil = {
    passwordCryptor,
    compareEncryptedPassword
}

export default bcryptUtil;