import User, { UserDocument } from '@model/user.model';
import { DocumentDefinition } from 'mongoose';

/**
 * This function uses our User model to create a new user in the database.
 * @param input New user input coming from a Request
 * @returns New user created
 */
export async function createUser(input: DocumentDefinition<UserDocument>): Promise<UserDocument> {
    const newUser: UserDocument = await User.create(input);
    return newUser;
}