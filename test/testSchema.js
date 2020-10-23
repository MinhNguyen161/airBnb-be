const mongoose = require("mongoose");
const User = require("../models/user");
const Review = require("../models/review");
const Exp = require("../models/experience")
const faker = require("faker");
const bcrypt = require("bcryptjs");

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cleanData = async (startTime) => {
    try {
        await User.collection.drop();
        await Exp.collection.drop();
        await Review.collection.drop();
        // OR: await mongoose.connection.dropDatabase();
        console.log("| Deleted all data");
        console.log("-------------------------------------------");
    } catch (error) {
        console.log(error);
    }
};


const generateData = async () => {
    try {
        await cleanData();
        let users = [];
        let exps = [];
        console.log("| Create 10 users:");
        console.log("-------------------------------------------");
        const userNum = 10;
        const otherNum = 3; // num of blog each user, reviews or reactions each blog
        const reviewNum = 5
        for (let i = 0; i < userNum; i++) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(process.env.JWT_SECRET_KEY, salt);
            await User.create({
                name: faker.name.findName(),
                email: faker.internet.email().toLowerCase(),
                avatarUrl: faker.image.avatar(),
                language: faker.random.locale(),

                password,
                location: faker.address.city(),
            }).then(function (user) {
                console.log("Created new user: " + user.name);
                users.push(user);
            });
        }
        console.log(`| Each user writes ${otherNum} exp`);
        console.log("-------------------------------------------");
        for (let i = 0; i < userNum; i++) {
            console.log(
                `| Each blog has ${reviewNum} reviews from ${otherNum} random users`
            );
            for (let j = 0; j < otherNum; j++) {
                await Exp.create({
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(),
                    pictureUrl: [
                        faker.image.imageUrl(400, 300),
                        faker.image.imageUrl(400, 300),
                    ],
                    author: users[i]._id,
                    whatToBring: [
                        faker.vehicle.type(),
                        faker.vehicle.type()
                    ]
                }).then(async (exp) => {
                    console.log("Created blog:" + exp.title);
                    exps.push(exp);

                    console.log("-------------------------------------------");
                    for (let k = 0; k < reviewNum; k++) {
                        await Review.create({
                            content: faker.lorem.sentence(),
                            user: users[getRandomInt(0, userNum - 1)]._id,
                            experience: exp._id,
                            rating: getRandomInt(0, 5)
                        });
                    }
                });
            }
        }
        console.log("| Generate Data Done");
        console.log("-------------------------------------------");
    } catch (error) {
        console.log(error);
    }
};

const getRandomBlogs = async (blogNum) => {
    console.log(`Get ${blogNum} random blogs`);
    const totalBlogNum = await Blog.countDocuments();
    for (let i = 0; i < blogNum; ++i) {
        const blog = await Blog.findOne()
            .skip(getRandomInt(0, totalBlogNum - 1))
            .populate("author");
        console.log(blog);
    }
};

const main = async (resetDB = false) => {
    if (resetDB) await generateData();
    // getRandomBlogs(1);
};

// remove true if you don't want to reset the DB
main();