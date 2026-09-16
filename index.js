import 'dotenv/config'
import express from "express";
import user from "./user.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());


// ==================== TEA API ====================

let teaData = [];
let nextId = 1;


// Add a new tea
app.post("/teas", (req, res) => {
    console.log("POST /teas received");
    console.log(req.body);

    const { name, price } = req.body;

    const newTea = {
        id: nextId++,
        name,
        price
    };

    teaData.push(newTea);

    res.status(201).send(newTea);
});


// Get all teas
app.get("/teas", (req, res) => {
    res.status(200).send(teaData);
});


// Get tea by ID
app.get("/teas/:id", (req, res) => {

    const tea = teaData.find(
        (tea) => tea.id === parseInt(req.params.id)
    );

    if (!tea) {
        return res.status(404).send("Tea Not Found");
    }

    res.status(200).send(tea);
});


// Update tea
app.put("/teas/:id", (req, res) => {

    const tea = teaData.find(
        (tea) => tea.id === parseInt(req.params.id)
    );

    if (!tea) {
        return res.status(404).send("Tea Not Found");
    }

    const { name, price } = req.body;

    tea.name = name;
    tea.price = price;

    res.status(200).send(tea);
});


// Delete tea
app.delete("/teas/:id", (req, res) => {

    const index = teaData.findIndex(
        (tea) => tea.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).send("Tea Not Found");
    }

    teaData.splice(index, 1);

    res.status(204).send();
});


// ==================== USER ROUTES ====================

// user.js ke routes ko /user ke andar mount karna
app.use("/user", user);


// ==================== START SERVER ====================

app.listen(port, () => {
    console.log(`SERVER STARTED: http://127.0.0.1:${port}`);
});