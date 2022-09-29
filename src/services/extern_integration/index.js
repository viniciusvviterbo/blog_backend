import { response } from "express";
import {
    getRandomUserId,
    setManyArticles,
    setManyUsers,
    setUser,
} from "../database/index.js";

const fetchConfig = {
    url: process.env.INTEGRATION_URL,
    options: {
        method: "GET",
        headers: {
            "User-Agent": process.env.INTEGRATION_USER_AGENT,
        },
    },
};

function generateRandomNumber(max, min = 0) {
    return Math.round(Math.random() * (max - min) + min);
}

export async function createRandomUsers() {
    const url = `${fetchConfig.url}/users`;
    const options = { ...fetchConfig.options };

    return fetch(url, options)
        .then((response) => response.json())
        .then((users) => {
            const newUsers = [];
            for (let i = 0; i < users.length; i++) {
                const name = users[generateRandomNumber(users.length - 1)].name;
                const email =
                    users[generateRandomNumber(users.length - 1)].email;
                const image_url = `https://via.placeholder.com/${
                    users[generateRandomNumber(users.length - 1)].name.length
                }/`;
                const street =
                    users[generateRandomNumber(users.length - 1)].address
                        .street;
                const city =
                    users[generateRandomNumber(users.length - 1)].address.city;

                const newUser = {
                    name,
                    email,
                    image_url,
                    address: {
                        street,
                        city,
                    },
                };
                newUsers.push(newUser);
            }
            return setManyUsers(newUsers);
        });
}

export async function createRandomArticles() {
    const url = `${fetchConfig.url}/posts`;
    const options = { ...fetchConfig.options };

    return fetch(url, options)
        .then((response) => response.json())
        .then(async (articles) => {
            const newArticles = [];
            for (let i = 0; i < 10; i++) {
                const title =
                    articles[generateRandomNumber(articles.length - 1)].title;
                const body =
                    articles[generateRandomNumber(articles.length - 1)].body;
                const author_id = await getRandomUserId();

                const newArticle = {
                    title,
                    body,
                    author_id,
                };
                newArticles.push(newArticle);
            }
            return setManyArticles(newArticles);
        });
}
