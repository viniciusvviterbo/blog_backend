import { Router } from "express";
import {
    userIsValid,
    getUser,
    setUser,
    editUser,
    deleteUser,
    deleteAllUsers,
} from "../../services/database/index.js";
import { createRandomUsers } from "../../services/extern_integration/index.js";

const route = Router();

export default (app) => {
    app.use("/users", route);

    route.get("/random", async (req, res) => {
        // Use databases service
        const response = await createRandomUsers();
        // Return response
        return res.json(response).status(200);
    });

    route.get("/:id", async (req, res) => {
        // Get params
        const id = req.params.id;
        // Use databases service
        const response = await getUser(id);
        // Return response
        return res.json(response).status(200);
    });

    route.post("/", async (req, res) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "A user description object is required",
                },
            });

        if (!userIsValid(req.body))
            return res.status(400).json({
                errors: {
                    message: `The user description object must follow the following structure: {"name", "email", "image_url", "address": {"street", "city"}}`,
                },
            });

        const newUser = req.body;
        // Use databases service
        const response = await setUser(newUser);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.put("/:id", async (req, res) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "A user description object is required",
                },
            });

        if (!userIsValid(req.body))
            return res.status(400).json({
                errors: {
                    message: `The user description object must follow the following structure: {"name", "email", "image_url", "address": {"street", "city"}}`,
                },
            });

        const editedUser = req.body;
        const userId = req.params.id;
        // Use databases service
        const response = await editUser(userId, editedUser);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.patch("/:id", async (req, res) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "A user description object is required",
                },
            });

        const editedUser = req.body;
        const userId = req.params.id;
        // Use databases service
        const response = await editUser(userId, editedUser);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.delete("/:id", async (req, res) => {
        const id = req.params.id;
        // Use databases service
        const response =
            id !== "0" ? await deleteUser(id) : await deleteAllUsers();
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });
};
