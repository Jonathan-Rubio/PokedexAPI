// Importing frameworks
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Creating instance for express application, setting port and url
const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon-species";

// Serving static files and body-parser
app.use (express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Setting get request from express and axios to home page
// First it waits for axios to get the url without the limit pokemon number
// Then it catches that response data and it renders it to index.ejs
app.get("/", async(req, res) => {
    try {
        const response = await axios.get(API_URL + "?limit=100000&offset=0");
        const result = response.data;
        res.render("index.ejs", {pokedex: result});

    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message});
    }
});

// Setting post request from express
// It catches what pokemon the user clicks with queryPokemon and sets axios to get the dex entry, pokemon name and number
// It renders that response data into index.ejs
app.post("/", async(req, res) => {
    const queryPokemon = req.body.type;
    // console.log(queryPokemon);
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${queryPokemon}`);
        const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${queryPokemon}`)
        const result = response.data;
        const result2 = response2.data;
        // console.log(response.data);
        // console.log(result2);
        res.render("index.ejs", {
            pokemon: result,
            entry: result2
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message});
    }
});

// Setting express to listen port 3000
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
