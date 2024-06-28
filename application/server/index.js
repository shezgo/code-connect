require("dotenv").config()

const express = require("express")
const path = require("path")
const routes = require("./routes")
const initialize = require("./db/index.js")
const boom = require("@hapi/boom")

const port = parseInt(process.env.PORT);
const start = async () => {
    await initialize();

    const app = express();
    app.use(express.json());
    // app.use(express.urlencoded());
    app.use(routes);
    app.use(express.static(process.env.FRONTEND_PATH));

    app.get("/about", (req, res) => {
        res.sendFile(path.join(__dirname, "../about/about_us.html"))
    });

    app.get("/about/:member", (req, res) => {
        try {
            res.sendFile(path.join(__dirname, ("../about/" + req.params.member)));
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

    app.listen(port, () => {
        console.log("Server is running on port ", port)
    });
}
start();