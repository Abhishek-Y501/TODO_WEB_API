const express = require('express');
const db = require('./database/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const todoRoutes = require('./routes/todo');
const fileRoutes = require('./routes/file');
const productRoutes = require('./routes/products');
const Response = require('./lib/response');

const config = require('./config').get('local');

const app = express();
const swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:8080',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

//http://localhost:8080/swagger.json

app.use(bodyParser.json());
var myDate = new Date().toJSON().replace(new RegExp(':', 'g'), '.');
let currentFile;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files')
    },
    filename: (req, file, cb) => {
        currentFile = myDate + '-' + file.originalname;
        cb(null, myDate + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/octet-stream') {
        cb(null, true)
    } else if (file.mimetype === 'image/jpg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

app.use(
    multer({ storage: fileStorage }).single('file')
);


app.use((req, res, next) => {
    req.file = currentFile;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.use('/csvFile', express.static(path.join(__dirname, 'files')));
app.use('/image', express.static(path.join(__dirname, 'files')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', todoRoutes);
app.use('/api', fileRoutes);
app.use('/api', productRoutes);

app.use((error, req, res, next) => {
    console.log(error)
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json(Response(0, 'Error', 'Error!', 'displayMessage', null))
})

//console.log(process.env.NODE_ENV)
db.initDB((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(8080);
    }
})


