const express = require("express");
const port = 3000;

const app = express()

const db = require("./connections")

app.use(express.json())

const infoRouter = require("./info");

app.use("/information",infoRouter);

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);
