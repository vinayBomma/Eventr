const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

let app = express();

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

app.listen(3000, () => {
    console.log('Server is UP!')
});