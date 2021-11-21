import express from "express";
import config from "config";
import connect from "@utils/connect";
import logger from "@utils/logger";
import routes from "./routes";

const app = express();
const port = config.get<number>('port');
const host = config.get<number>('host');

app.listen(port, async () => {
    logger.info(`Server is listening at http://${host}:${port}`);
    //await connect(); Not connecting to database for now
    routes(app);
});
