import { MongoClient, ObjectId } from "mongodb";

const uri =
    process.env.NODE_ENV === "prod"
        ? process.env.DB_MONGO_URI_PROD
        : process.env.DB_MONGO_URI_DEV;

const client = new MongoClient(uri);
const database = client.db(process.env.DB_NAME ?? "example");

export async function setIndex() {
    try {
        await client.connect();

        await database.collection(process.env.DB_COLLECTION_ARTICLE).createIndex('title')
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

export function userIsValid(userObject) {
    let validUserProps = ["name", "email", "image_url", "address"];
    let validAddressProps = ["street", "city"];

    const isValid = validUserProps.every(
        (userProp) =>
            userObject.hasOwnProperty(userProp) &&
            (userProp === "address"
                ? validAddressProps.every((addressProp) =>
                      userObject[userProp].hasOwnProperty(addressProp)
                  )
                : true)
    );

    return isValid;
}
export function articleIsValid(articleObject) {
    let validArticleProps = ["title", "body"];

    const isValid = validArticleProps.every((articleProp) =>
        articleObject.hasOwnProperty(articleProp)
    );

    return isValid;
}

export async function getUser(id) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .findOne({ _id: new ObjectId(id) });

        return result ?? `No listings found with the id '${id}'`;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function getRandomUserId() {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .aggregate([{ $sample: { size: 1 } }])
            .toArray();

        return new ObjectId(result[0]._id) ?? `No listings found`;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function getArticleByTitle(title) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .find({ title: { $regex: new RegExp(title) } })
            .toArray();

        return result ?? `No listings found with the title '${title}'`;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function getArticle(id) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .findOne({ _id: new ObjectId(id) });

        return result ?? `No listings found with the id '${id}'`;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

export async function setUser(userObject) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .insertOne(userObject);

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function setArticle(articleObject) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .insertOne(articleObject);

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function setManyUsers(userObjects) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .insertMany(userObjects);

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function setManyArticles(articleObjects) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .insertMany(articleObjects);

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

export async function editUser(id, userObject) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .updateOne({ _id: new ObjectId(id) }, { $set: userObject });

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function editArticle(id, articleObject) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .updateOne({ _id: new ObjectId(id) }, { $set: articleObject });

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

export async function deleteUser(id) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .deleteOne({ _id: new ObjectId(id) });

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function deleteArticle(id) {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .deleteOne({ _id: new ObjectId(id) });

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

export async function deleteAllUsers() {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_USER)
            .deleteMany({});

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
export async function deleteAllArticles() {
    try {
        await client.connect();

        const result = await database
            .collection(process.env.DB_COLLECTION_ARTICLE)
            .deleteMany({});

        return result;
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}
