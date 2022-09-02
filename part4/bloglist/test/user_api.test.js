const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

const initialUsers = [
    {
        name: "Peter Nielsen",
        username: "peter1967",
        password: "peter-er-sej"
    },
    {
        name: "Jytte Jensen",
        username: "mormor",
        password: "skattemusen1234"
    }
];

beforeEach(async () => {
    await User.deleteMany({});
    let userObject = new User(initialUsers[0]);
    await userObject.save();
    userObject = new User(initialUsers[1]);
    await userObject.save();
})

describe("validation-errors occurs", () => {
    test("when a username is already taken", async () => {
        await api.post("/api/users").send(initialUsers[0])
        .expect(400);
    });
    test("when username is less than 3 characters long", async () => {
        await api.post("/api/users").send({name: "somerk", username: "b2", password: "nfjwng"})
        .expect(400);
    });
    test("when password is less than 3 characters long", async () => {
        await api.post("/api/users").send({name: "somerk", username: "b4tf2", password: "nf"})
        .expect(400);
    })
})

afterAll(() => {
    mongoose.connection.close();
})