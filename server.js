const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about')
});

app.listen(port, () => {
    console.log('Server is UP! on port ', port);
});