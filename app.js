
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
app.get('/', (req, res) => {
  res.render('layouts/home', { msg: 'heyooo' })
})
app.post('/',(req,res) =>{
    console.log(req.body)
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
