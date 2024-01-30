const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(routes); // turn on routes

// turn on connection to db and server
db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    });
});