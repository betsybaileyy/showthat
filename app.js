
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

let TVS = [
    { title: "The Americans"},
    { title: "Ray Donovan"},
    { title: "The Marvelous Mrs. Mazel"}
]

app.get('/', (req, res) => {
  res.render('layouts/home', { msg: 'heyooo' })
})

app.get('/TVS', (req, res) => {
    res.render('TVS-index', { TVS: TVS });
})

app.post('/',(req,res) =>{
    console.log(req.body)
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
