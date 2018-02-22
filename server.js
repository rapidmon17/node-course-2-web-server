const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
var app = express('view engine', 'hbs');

app.set('',)
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
            if(err) {
                console.log('Unable to append to server log');
            }
    })


    next();
});

app.use((req, resp, next) =>{
    resp.render('maint.hbs');
});

app.get('/', (req, resp)=> {
    resp.send({
        name: 'Justin',
        likes:['things']
    });
});


app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        msg: 'Unable to send data',
        payload: 56
    });
});
app.listen(3000, ()=>{
    console.log('Server is up at port 3000');
});