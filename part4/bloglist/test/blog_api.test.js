const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const initialBlogs = [
    {
        title: "Mia Sommer",
        author: "Mia Sommer",
        url: "www.miasommer.dk",
        likes: 9
    },
    {
        title: "Månebarnet",
        author: "Et månebarn",
        url: "www.maanebarnet.dk",
        likes: 92
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = await new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = await new Blog(initialBlogs[1]);
    await blogObject.save();
})

test("blogs are returned in JSON format and have the correct length", async () => {
    const user = new User({
        name: "Test",
        username: "tester",
        password: 1234
    })
    await user.save();

    const token = jwt.sign(user.toJSON(), process.env.SECRET);
    const response = await api.get("/api/blogs").set({Authorization: `Bearer ${token}`}).expect(200).expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
})

test("returned blogs have an 'id' property", async () => {
    const returnedBlog = await Blog.findOne({});
    expect(returnedBlog.id).toBeDefined();
})

test("POST requests successfully creates new blogs", async () => {
    const user = new User({
        name: "Test",
        username: "tester",
        password: 1234
    })
    await user.save();

    const token = jwt.sign(user.toJSON(), process.env.SECRET);

    await api.post("/api/blogs")
    .send({title: "Test", author: "Test", url: "Test.dk", likes: 12})
    .set({Authorization: `Bearer ${token}`}).expect(201);
    const blogs = await Blog.find({});
    expect(blogs).toHaveLength(initialBlogs.length + 1);
})

test("when 'likes' is not provided, it will default to 0", async () => {
    const user = new User({
        name: "Test",
        username: "tester",
        password: 1234
    })
    await user.save();

    const token = jwt.sign(user.toJSON(), process.env.SECRET);

    await api.post("/api/blogs")
    .send({title: "Test", author: "Test", url: "Test.dk"})
    .set({Authorization: `Bearer ${token}`}).expect(201);
    const blogs = await Blog.find({});
    expect(blogs[2].likes).toBe(0);
})

test("POST requests without a 'title' and 'url' returns a 400-error", async () => {
    const user = new User({
        name: "Test",
        username: "tester",
        password: 1234
    })
    await user.save();

    const token = jwt.sign(user.toJSON(), process.env.SECRET);

    await api.post("/api/blogs").set({Authorization: `Bearer ${token}`}).expect(400);
})

test("blogs can be updated", async () => {
    const user = new User({
        name: "Test",
        username: "tester",
        password: 1234
    })
    await user.save();

    const token = jwt.sign(user.toJSON(), process.env.SECRET);

    const one = await Blog.findOne({});
    const {id} = one;
    await api.put(`/api/blogs/${id}`).send({title: "AnotherONe", url: "Anotherurl"}).set({Authorization: `Bearer ${token}`}).expect(201);
})

test("blogs can be deleted", async () => {
    const user = new User({
        name: "Test",
        username: "tester",
        password: 1234
    })
    await user.save();

    const token = jwt.sign(user.toJSON(), process.env.SECRET);

    const one = await Blog.findOne({});
    const {id} = one;
    await api.delete(`/api/blogs/${id}`).set({Authorization: `Bearer ${token}`}).expect(202);
})

test("a token is needed when making new blogs", async () => {
    await api.post("/api/blogs")
    .send({title: "Test", author: "Test", url: "Test.dk", likes: 12}).set({Authorization: `Bearer `}).expect(401);
})



afterAll(() => {
    mongoose.connection.close();
})