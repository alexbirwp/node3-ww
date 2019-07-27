const path = require('path');
const express = require('express');
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const app = express();
//paths for express
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const prtialsPath = path.join(__dirname, '../templates/partials');
//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(prtialsPath);
//setup static dir
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "wheather app",
        name: "Alex",
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Alex",
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Alex",
        message: "This is a help message",
    });
});

//Отслеживание запросов

app.get("/wheather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "There is no address",
        });
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, info) => {
            if (error) {
                return res.send({error});
            }
            return res.send({
                location,
                info,
                address: req.query.address,});
        }); 
    }); 
});



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "need search term",
        });
    }
    console.log(req.query);
    return res.send({
        product: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        name: "Alex",
        message: "help article not found",
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Help",
        name: "Alex",
        message: "My 404 page",
    });
});

//Запуск сервака
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});