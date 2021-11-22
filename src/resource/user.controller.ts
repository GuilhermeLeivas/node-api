import { Request, Response } from 'express';
import logger from '@utils/logger';
import { createUser } from 'src/service/user.service';
export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (error) {
        const errorLog: string = `Failed to create new user: ${error}`;
        logger.error(errorLog);
        res.status(500).send(errorLog);
    }
}