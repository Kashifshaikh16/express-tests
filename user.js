
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";
const user = express.Router();

let users = [];
let uId = 1;






// ==================== USER API ====================


// Add new user
user.post("/", (req, res) => {

    const { name, email, phoneno } = req.body;

    const newUser = {
        id: uId++,
        name,
        email,
        phoneno
    };

    users.push(newUser);

    res.status(201).send(newUser);
    res.send("hello world!")
});


// Get all users
user.get("/", (req, res) => {

    res.status(200).send(users);

});


// Get user by ID
user.get("/:id", (req, res) => {

    const userData = users.find(
        (user) => user.id === parseInt(req.params.id)
    );

    if (!userData) {
        return res.status(404).send("User Not Found");
    }

    res.status(200).send(userData);

});


// Update user
user.put("/:id", (req, res) => {

    const userData = users.find(
        (user) => user.id === parseInt(req.params.id)
    );

    if (!userData) {
        return res.status(404).send("User Not Found");
    }

    const { name, email, phoneno } = req.body;

    userData.name = name;
    userData.email = email;
    userData.phoneno = phoneno;

    res.status(200).send(userData);

});


// Delete user
user.delete("/:id", (req, res) => {

    const index = users.findIndex(
        (user) => user.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).send("User Not Found");
    }

    users.splice(index, 1);

    res.status(204).send();

});


// Export router
export default user;