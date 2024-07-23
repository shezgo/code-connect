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

<<<<<<< Updated upstream
<<<<<<< HEAD

// Frontend files path
const static_path = path.join(__dirname, '../verticalPrototype/folder/frontend-html');
=======
const frontendPath = "../verticalPrototype/folder/"

>>>>>>> shez-backend-dev
=======

// Frontend files path
const static_path = path.join(__dirname, '../verticalPrototype/folder/frontend-html');
>>>>>>> Stashed changes
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

    // Check if path starts with api
    // If not append html if it is not there
    app.use((req, res, next)=>{
        let url = req.url;
        // Check if path is for api using Regular Expression
        if(url.search(/\/api.*/) === -1){
            // Check if path ends with file type (letters/numbers after a .) using Regular Expression
            if(url.search(/\.{1}[A-Za-z]*$/) === -1){
                url = url + ".html"
            }
        }
        req.url = url;
        next();
    })
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Ensure session middleware is applied before the routes
    app.use(routes);
    // Serve Frontend Static Files
    app.use(express.static(static_path));

<<<<<<< Updated upstream
<<<<<<< HEAD
    // app.get("/about", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../about/about_us.html"))
    // });
    
    // app.get("/about/:member", (req, res) => {
    //     try {
    //         res.sendFile(path.join(__dirname, ("../about/" + req.params.member)));
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
=======
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
>>>>>>> shez-backend-dev

    // });

    app.get("/searchUser/:searchTerm", (req, res) =>{
        try {
            console.log("we are here");
            res.send({ "index": { "_index": "movies", "_id": "2" } });
        }
        catch (err) {
            console.log(err);
        }
    });
=======
    // app.get("/about", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../about/about_us.html"))
    // });
    
    // app.get("/about/:member", (req, res) => {
    //     try {
    //         res.sendFile(path.join(__dirname, ("../about/" + req.params.member)));
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }

    // });
>>>>>>> Stashed changes

    app.use((err, req, res, next) => {
        if (!err.isBoom) err = boom.badImplementation(err)
        if (err.isServer) console.log(err)
        return res.status(err.output.statusCode).json(err.output.payload)
    });
    //This should forward any unknown pages to login
    app.all('/**', function (req, res) {
<<<<<<< Updated upstream
<<<<<<< HEAD
        res.status(301).redirect('/login');
=======
        res.status(301).redirect('/index');
>>>>>>> shez-backend-dev
=======
        res.status(301).redirect('/login');
>>>>>>> Stashed changes
    });

    app.listen(port, () => {
        console.log("Server is running on port ", port);
    });
}
start();