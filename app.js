
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/showthat');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//Thought will be like a review or comment 'thoughts on this show'
const Thought = mongoose.model('Thought', {
    show: String,
    content: String,
})

let TVS = [
    { title: "The Americans", genre: "action"},
    { title: "Ray Donovan", genre: "drama"},
    { title: "The Marvelous Mrs. Mazel", genre: "comedy"}
];

let genreTVS = TVS.filter(function(TVS) {
    return TVS.genre == "action";
})

console.log(genreTVS)

app.get('/', (req, res) => {
  res.render('layouts/home', { msg: 'heyooo' })
})

app.get('/thoughts', (req, res) => {
    Thought.find()
        .then(thoughts => {
            res.render('thoughts-index', { thoughts: thoughts });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/TVS', (req, res) => {
    res.render('TVS-index', { TVS: TVS });
})

app.get('/genre', (req, res) => {
    res.render('genre-index', { TVS: TVS });
})

app.post('/',(req,res) =>{
    console.log(req.body)
})

const port = process.env.PORT || 3000;
app.listen(port);

// app.listen(3000, () => {
//   console.log('App listening on port 3000!')
// })
