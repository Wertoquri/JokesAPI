import http, { get } from "http"
import fs from "fs"
import path from "path"
import { fileURLToPath, parse } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let dataPath = path.join(__dirname, "data")

const server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    if (req.url == "/jokes" && req.method == "GET") {
        getAllJokes(req, res)
    }
    else if (req.url == "/jokes" && req.method == "POST") {
        addNewJoke(req, res)
    }
    else if (req.url.startsWith("/like") && req.method == "GET") {
        like(req,res)
    }
    else if (req.url.startsWith("/dislike") && req.method == "GET") {
        dislike(req,res)
    }

    else {
        res.end("<h1>404</h1>")
    }
})

server.listen(3333);

function getAllJokes(req, res) {
    let dir = fs.readdirSync(dataPath)
    let allJokes = []
    for (let i = 0; i < dir.length; i++) {
        let file = fs.readFileSync(path.join(dataPath, i + ".json"), "utf8")
        let jokeJSON = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJSON)
        joke.id = i
        allJokes.push(joke)
    }
    res.end(JSON.stringify(allJokes))
}

function addNewJoke(req, res) {
    let data = ""
    req.on("data", function (chunk) {
        data += chunk;
    })
    req.on("end", function () {
        let joke = JSON.parse(data)
        joke.likes = 0;
        joke.dislikes = 0;
        let dir = fs.readdirSync(dataPath)
        let filename = dir.length + ".json";
        let filePath = path.join(dataPath, filename)
        fs.writeFileSync(filePath, JSON.stringify(joke))

        res.end()
    })
}

function like(req, res) {
    let params = parse(req.url, true).query
    let id = params.id
    if (id) {
        let filepath = path.join(dataPath, id + ".json")
        let file = fs.readFileSync(filepath)
        file = Buffer.from(file).toString()
        let joke = JSON.parse(file)
        joke.likes++;
        fs.writeFileSync(filepath, JSON.stringify(joke))
    }
    res.end()
}

function dislike(req, res) {
    let params = parse(req.url, true).query
    let id = params.id
    if (id) {
        let filepath = path.join(dataPath, id + ".json")
        let file = fs.readFileSync(filepath)
        file = Buffer.from(file).toString()
        let joke = JSON.parse(file)
        joke.dislikes++;
        fs.writeFileSync(filepath, JSON.stringify(joke))
    }
    res.end()
}