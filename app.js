
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/showthat');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//Thought will be like a review or comment 'thoughts on this show'
const Thought = mongoose.model('Thought', {
    show: String,
    content: String,
})

const Tvs = mongoose.model('Tvs', {
    title: String,
    description: String,
    beschdelTest: Boolean
})

const WatchlistItem = mongoose.model('WatchlistItem', {
    show: String
})

let TVS = [
    { title: "The Americans", genre: "action", description: "At the height of the Cold War two Russian agents pose as your average American couple, complete with family."},
    { title: "Ray Donovan", genre: "drama", description: "Ray Donovan, a professional fixer for the rich and famous in Los Angeles, can make anyone's problems disappear except those created by his own family."},
    { title: "The Marvelous Mrs. Mazel", genre: "comedy", description: "A housewife in the 1950s decides to become a stand-up comic."}
];

// let genreTVS = TVS.filter(function(TVS) {
//     return TVS.genre == "action";
// })

// console.log(genreTVS)

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

//Routes for creating a new Thought

app.get('/thoughts/new', (req, res) => {
    res.render('thoughts-new', {});
})

app.post('/thoughts', (req, res) => {
    Thought.create(req.body).then((thought) => {
        console.log(thought);
        res.redirect(`/thoughts/${thought._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/thoughts/:id', (req, res) => {
    Thought.findById(req.params.id).then((thought) => {
        res.render('thoughts-show', { thought: thought })
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/thoughts/:id/edit', (req, res) => {
    Thought.findById(req.params.id, function(err, thought) {
        res.render('thoughts-edit', {thought: thought});
    })
})

app.put('/thoughts/:id', (req, res) => {
    Thought.findByIdAndUpdate(req.params.id, req.body)
    .then(thought => {
        res.redirect(`/thoughts/${thought._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})

app.delete('/thoughts/:id', function (req, res) {
    console.log("DELETE thought")
    Thought.findByIdAndRemove(req.params.id).then((thought) => {
        res.redirect('/thoughts');
    }).catch((err) => {
        console.log(err.message);
    })
})

//Routes for CRUDing a new Show

app.get('/TVS/new', (req, res) => {
    res.render('TVS-new', {});
})

app.post('/TVS', (req, res) => {
    TVS.create(req.body).then((tvs) => {
        console.log(thought);
        res.redirect(`/TVS/${tvs._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

//Routes for CRUDing a new show to your Watchlist

app.get('/watchlist', (req, res) => {
    WatchlistItem.find()
        .then(watchlistItem => {
            res.render('watchlist-index', { watchlistItem: watchlistItem });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/watchlist/new', (req, res) => {
    res.render('watchlist-new', {});
})

app.post('/watchlist', (req, res) => {
    WatchlistItem.create(req.body).then((watchlistItem) => {
        console.log(watchlistItem);
        res.redirect(`/watchlist`);
    }).catch((err) => {
        console.log(err.message);
    })
})

//
app.get('/watchlist/:id', (req, res) => {
    WatchlistItem.findById(req.params.id).then((watchlistItem) => {
        res.render('watchlist-show', { watchlistItem: watchlistItem })
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/watchlist/:id/edit', (req, res) => {
    WatchlistItem.findById(req.params.id, function(err, watchlistItem) {
        res.render('watchlist-edit', {watchlistItem: watchlistItem});
    })
})

app.put('/watchlist/:id', (req, res) => {
    WatchlistItem.findByIdAndUpdate(req.params.id, req.body)
    .then(watchlistItem => {
        res.redirect(`/watchlist/${watchlistItem._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})

app.delete('/watchlist/:id', function (req, res) {
    console.log("DELETE watchlist item")
    WatchlistItem.findByIdAndRemove(req.params.id).then((watchlistItem) => {
        res.redirect('/watchlist');
    }).catch((err) => {
        console.log(err.message);
    })
})

//Other Routes
app.get('/TVS', (req, res) => {
    res.render('TVS-index', { TVS: TVS });
})

app.get('/genre', (req, res) => {
    res.render('genre-index', { TVS: TVS });
})

app.post('/',(req,res) =>{
    console.log(req.body)
})

// SEARCH PET
app.get('/search', (req, res) => {
  term = new RegExp(req.query.term, 'i')

  WatchlistItem.find({'name': term}).exec((err, TVS) => {
    res.render('TVS-index', { TVS: TVS });
  })
});

const port = process.env.PORT || 3000;
app.listen(port);

// app.listen(3000, () => {
//   console.log('App listening on port 3000!')
// })
