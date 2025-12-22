import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon";

app.use (express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
    try {
        const response = await axios.get(API_URL + "-species?limit=100000&offset=0");
        const items = response.data;

        res.render("index.ejs", {pokedex: items});
    } catch (error) {
        console.error(`error`, {message: `Failed to load data`});
    }
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
