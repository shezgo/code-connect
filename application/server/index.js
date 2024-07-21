const express = require("express")
const path = require("path")
const routes = require("./routes")
const { initialize, sequelize } = require("./db/index");
const boom = require("@hapi/boom")
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const loginController = require('./controllers/loginController');

dotenv.config()

const frontendPath = "../verticalPrototype/folder/"

const port = parseInt(process.env.PORT);
const start = async () => {
    await initialize();

    const app = express();

    // Session store configuration
    const store = new SequelizeStore({
        db: sequelize,
    });

    // Session middleware configuration
    app.use(session({
        secret: process.env.SESSION_SECRET, // Use a secure secret
        store: store,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 } // 1 hour
    }));

    // Sync the session store
    store.sync();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Ensure session middleware is applied before the routes
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

 /*   app.get("/searchUser/:searchTerm", (req, res) =>{
        try {
            console.log("we are here");
            res.send({ "index": { "_index": "movies", "_id": "2" } });
        }
        catch (err) {
            console.log(err);
        }
    });
*/
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