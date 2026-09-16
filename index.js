import 'dotenv/config'
import express from "express";
import user from "./user.js";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;
const morganFormat = ":method :url :status :response-time ms";
// Middleware
app.use(express.json());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


// ==================== TEA API ====================

let teaData = [];
let nextId = 1;
app.get("/home",(req,res)=>{
    res.send("hello world!")
})

// Add a new tea
app.post("/teas", (req, res) => {
    console.log("POST /teas received");
    console.log(req.body);
logger.info("post a new data");
logger.error("some error hai");
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