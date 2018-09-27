const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('./models/event');
mongoose.model('events');

const port = process.env.PORT || 3000;

let app = express();

const events = require('./routes/events');
const misc = require('./routes/misc');

// mongoose.connect('mongodb://localhost:27017/since')
mongoose.connect("mongodb://vinayBomma:CzC981ipjnp0@ds233320.mlab.com:33320/since")
    .then(() => console.log('MongoDB connected!'))
    .catch((e) => console.log("MongoDB couldn't connect", e));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// app.delete('/:id', (req, res) => {
//     Event.remove({_id: req.params.id})
//         .then(() => {
//             res.redirect('/');
//         }).catch((err) => {
//         res.status(400).send('Error', err)
//     });
// });

app.use('/', events);
app.use('/', misc);

app.listen(port, () => {
    console.log('Server is UP! on port', port);
});
