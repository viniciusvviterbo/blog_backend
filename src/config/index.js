import * as dotenv from "dotenv";
import { setIndex } from '../services/database/index.js'

process.env.NODE_ENV = process.env.NODE_ENV || "dev";
dotenv.config();

await setIndex()

export default {
    port: parseInt(process.env.PORT + "", 10) || 8000,
    api: {
        prefix: "/",
    },
};
