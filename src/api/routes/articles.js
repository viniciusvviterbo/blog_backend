import { Router } from "express";
import {
    articleIsValid,
    getArticle,
    getArticleByTitle,
    setArticle,
    editArticle,
    deleteArticle,
    deleteAllArticles,
} from "../../services/database/index.js";
import { createRandomArticles } from "../../services/extern_integration/index.js";

const route = Router();

export default (app) => {
    app.use("/articles", route);

    route.get("/search/:title", async (req, res) => {
        // Get params
        const title = req.params.title;
        // Use databases service
        const response = await getArticleByTitle(title);
        // Return response
        return res.json(response).status(200);
    });

    route.get("/random", async (req, res) => {
        // Use databases service
        const response = await createRandomArticles();
        // Return response
        return res.json(response).status(200);
    });

    route.get("/:id", async (req, res) => {
        // Get params
        const id = req.params.id;
        // Use databases service
        const response = await getArticle(id);
        // Return response
        return res.json(response).status(200);
    });

    route.post("/", async (req, res) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "An article description object is required",
                },
            });

        if (!articleIsValid(req.body))
            return res.status(400).json({
                errors: {
                    message: `The article description object must follow the following structure: {"title", "body", "author_id"}`,
                },
            });

        const newArticle = req.body;
        // Use databases service
        const response = await setArticle(newArticle);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.put("/:id", async (req, res) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "An article description object is required",
                },
            });

        if (!articleIsValid(req.body))
            return res.status(400).json({
                errors: {
                    message: `The article description object must follow the following structure: {"title", "body", "author_id"}`,
                },
            });

        const editedArticle = req.body;
        const articleId = req.params.id;
        // Use databases service
        const response = await editArticle(articleId, editedArticle);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.patch("/:id", async (req, res) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "An article description object is required",
                },
            });

        const editedArticle = req.body;
        const articleId = req.params.id;
        // Use databases service
        const response = await editArticle(articleId, editedArticle);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.delete("/:id", async (req, res) => {
        const id = req.params.id;
        // Use databases service
        const response =
            id !== "0" ? await deleteArticle(id) : await deleteAllArticles();
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });
};
