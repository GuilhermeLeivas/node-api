import logger from "pino";
import dayjs from "dayjs";

/**
 * Function to build a custom logger object wich 
 * can be used across the app.
 */
const log = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `, "time:""${dayjs().format()}"`,
});


export default log;