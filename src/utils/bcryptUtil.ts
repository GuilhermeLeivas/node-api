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

export default passwordCryptor;