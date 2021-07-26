require('dotenv').config();

const express = require('express');
const router = express.Router();
const letters = require('../lib/letters.js');
const ogpGenerator = require('../lib/ogpGenerator');
const uploadImageToS3 = require('../lib/uploadImageToS3');
const fetchImageUrlFromS3 = require('../lib/fetchImageUrlFromS3');


/* GET home page. */
router.get('/', function (req, res, next) {
  letters.findAll().then(results=> {
      res.render('letters/index', { title: 'index', letters: results }); 
    }
  );
});

// 新規投稿画面の表示
router.get('/letters/new', function(req, res, next) {
  res.render('letters/new', { title: 'ハッピーゴート | 文章の入力' });
});

// 新規投稿機能
router.post('/letters/new', function(req, res, next) {
  // 画像の生成　返り値で'画像のDataURI'が帰ってくる
  const imageAsDataURI = ogpGenerator.generate(
    req.body.subject,
    req.body.body
  );

  // Data URI形式で画像をS3にupload
  uploadImageToS3.uploadFile(imageAsDataURI).then(
    response => {
      // S3にアップして生成されたURLを`uploadedImage`に格納
      const uploadedImageURL = process.env.BUCKET_URL + fetchImageUrlFromS3.fetchImageUrl(response);
      // S3にアップロードされた画像をimageパラメータに付与
      const post_data = { id: null, subject: req.body.subject, body: req.body.body,image: uploadedImageURL };

      letters.createLetter(post_data).then(
          res.redirect("/")
      );
    }
  );
});

// 詳細画面
router.get('/letters/:id(\\d+)', function (req, res, next) {
  letters.findById(req.params.id).then(results => {
      res.render('letters/show', { title: results[0].subject, letter: results[0] }); 
    }
  );
});

module.exports = router;
