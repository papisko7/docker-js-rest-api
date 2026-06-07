const mongoose = require('mongoose');
const Book = require("./models/book");

var mongoDB = 'mongodb://127.0.0.1:27017/people_db';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console,
    'MongoDB connection error:'));

const express = require("express");
const swaggerJsDoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express'); 
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API do zarządzania książkami - Laboratorium 5-6',
            servers: [{ url: 'http://localhost:8000' }]
        }
    },
    apis: ['./routes/bookRoutes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/books', bookRoutes);

app.get("/", async (req, res) => {
    const books = await Book.find();
    res.render("index", { books: books });
});

app.post("/add", async (req, res) => {
    const title = req.body.title || "unknown";
    const author = req.body.author || "unknown";

    await new Book({ title, author }).save();

    res.redirect("/");
});

app.post("/edit/:id", async (req, res) => {
    const update = {};

    if (req.body.title) update.title = req.body.title;
    if (req.body.author) update.author = req.body.author;

    await Book.findByIdAndUpdate(req.params.id, update);

    res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);

    res.redirect("/");
});

const port = 8000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});
