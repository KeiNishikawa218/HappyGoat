var express = require('express');
var router = express.Router();
const connection = require('../lib/mysql_module.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM letters',(error, results) => {
      console.log(results);
      res.render('index', { title: 'index',content: results });
    }
  );
  // res.render('index', { title: 'Express' });
});

// レターのテキスト入力画面
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'ハッピーゴート | 文章の入力' });
});

// レターのテキスト入力画面での送信処理
router.post('/new', function(req, res, next) {
  // console.log(req.body.sentence);
  const subject = req.body.subject;
  const body = req.body.body;
  const post_data = { id: null, subject: subject, body: body };

  // // const connection = mysql.createConnection(mysql_setting);

  connection.query('INSERT INTO letters SET ?', post_data, function (results, fields) {
      // if (error) throw error;
      console.log(post_data + "を投稿したよ！");
      // console.log('ID:', results.insertId);
  });
  res.redirect("/");
});

router.get('/showLetter', function(req, res, next) {
  res.render('showLetter');
});

module.exports = router;
