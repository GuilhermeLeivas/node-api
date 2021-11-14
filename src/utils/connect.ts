import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

/**
 * Function to connect with MongoDB
 */
async function connect(): Promise<any> {
    const dbUrl = config.get<string>('dbUrl');
    try {
        await mongoose.connect(dbUrl);
        logger.info('Connected to database');
    } catch (err) {
        logger.fatal(`Could not connect to database ${err}`);
        process.exit(1);
    }
}

export default connect;