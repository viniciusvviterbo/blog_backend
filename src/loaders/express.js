import bodyParser from "body-parser";
import cors from "cors";
import config from "../config/index.js";
import routes from "../api/index.js";

export default ({ app }) => {
    // Health Check
    app.get("/status", (_, res) => {
        res.status(200).end();
    });
    app.head("/status", (_, res) => {
        res.status(200).end();
    });

    app.use(cors());
    app.use(bodyParser.json());
    app.use(config.api.prefix, routes());

    // Error handling
    app.use((err, req, res, next) => {
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
        next(err);
    });
};
