import express from "express";
import loaders from "./loaders/index.js";
import config from "./config/index.js";

function startServer() {
    const app = express();
    loaders({ expressApp: app });
    app.listen(config.port, () => {
        console.log(`Node API running on port ${config.port}`);
    }).on("error", (err) => {
        console.log(err);
        process.exit(1);
    });
}

startServer();
