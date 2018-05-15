const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');

require('./models/event');
const Event = mongoose.model('events');

const port = process.env.PORT || 3000;

let app = express();

// const events = require('./routes/events');

mongoose.connect('mongodb://localhost:27017/since')
    .then(() => console.log('MongoDB connected!'))
    .catch((e) => console.log("MongoDB couldn't connect" , e));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    Event.find({})
        .then((event) => {
            res.render('index', {
                event,
            });
        });
});

app.post('/', (req, res) => {
    const newEvent = {
        title: req.body.eventName,
        date: (req.body.date + ' ' + req.body.time + ':00'),
    };

    new Event(newEvent).save()
        .then(() => {
            res.redirect('/');
        }).catch((err) => {
            res.status(400).send(err)
    })
});

app.get('/about', (req, res) => {
    res.render('about')
});

// app.use('/past', events);

app.listen(port, () => {
    console.log('Server is UP! on port', port);
});