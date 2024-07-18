

const express = require("express")
const path = require("path")
const routes = require("./routes")
const initialize = require("./db/index.js")
const boom = require("@hapi/boom")
const dotenv = require('dotenv');

dotenv.config()

const frontendPath = "../verticalPrototype/folder/"

const port = parseInt(process.env.PORT);
const start = async () => {
    await initialize();

    const app = express();
    app.use(express.json());
    app.use(routes);
    app.use(express.static(process.env.FRONTEND_PATH));

    app.get("/index", (req, res) => {
        res.sendFile(path.join(__dirname, frontendPath + "frontend-html/index.html"))
    });
    
    app.get("/frontend-html/:member", (req, res) => {
        try {
            res.sendFile(path.join(__dirname, (frontendPath + "frontend-html/" + req.params.member)));
        }
        catch (err) {
            console.log(err);
        }

    });

    app.get("/searchUser/:searchTerm", (req, res) =>{
        try {
            res.console("we are here");
        }
        catch (err) {
            console.log(err);
        }
    });

    app.use((err, req, res, next) => {
        if (!err.isBoom) err = boom.badImplementation(err)
        if (err.isServer) console.log(err)
        return res.status(err.output.statusCode).json(err.output.payload)
    });
    //This should forward any unknown pages to index once it is implemented
    app.all('/**', function (req, res) {
        res.status(301).redirect('/index');
    });

    app.listen(port, () => {
        console.log("Server is running on port ", port);
    });
}
start();