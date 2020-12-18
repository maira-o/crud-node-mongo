var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('index', { title: 'Lista de Filmes', docs: docs });
  })
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"name":"","origin":"","year":"","director":"","genre":"","language":"","status":""}, action: '/new' });
});
router.post('/new', function(req, res) {
  var name = req.body.name;
  var origin = req.body.origin;
  var year = req.body.year;
  var director = req.body.director;
  var genre = req.body.genre;
  var language = req.body.language;
  var status = req.body.status;
  global.db.insert({name, origin, year, director, genre, language, status}, (err, result) => {
    if(err) { return console.log(err); }
    res.redirect('/');
  })
})

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Filme', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})
router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var origin = req.body.origin;
  var year = req.body.year;
  var director = req.body.director;
  var genre = req.body.genre;
  var language = req.body.language;
  var status = req.body.status;
  global.db.update(id, {name, origin, year, director, genre, language, status}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
