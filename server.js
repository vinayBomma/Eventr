const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const enforce = require('express-sslify');
const passport = require('passport');
const passportSetup = require('./config/passport');
const events = require('./routes/events');
const users = require('./routes/users');
const auth = require('./routes/auth');
const misc = require('./routes/misc');

const port = process.env.PORT || 1000;

let app = express();

app.use(enforce.HTTPS({trustProtoHeader: true}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((e) => console.log("MongoDB couldn't connect", e));

app.use(methodOverride('_method'));

app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
// app.set('view engine', 'ejs');

app.use('/', events);
app.use('/', users);
app.use('/', auth);
app.use('/', misc);

app.listen(port, () => {
    console.log('Server is UP! on port', port);
});
