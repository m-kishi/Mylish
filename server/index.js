// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
var express = require("express");

// アプリケーション
var app = express();

// JSONオブジェクトの認識
app.use(express.json());

// POSTパラメタを簡単に受け取るための設定
app.use(express.urlencoded({ extended: true }));

// production環境のフロントエンドの設定
app.use('/img', express.static(__dirname + '/dist/img/'));
app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));
app.use('/voices', express.static(__dirname + '/dist/voices/'));
app.use('/favicon.ico', express.static(__dirname + '/dist/favicon.ico'));
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

// Homeコントローラー
var home_controller = require("./controllers/home_controller");
app.use("/", home_controller);

// Examコントローラー
var exam_controller = require("./controllers/exam_controller");
app.use("/", exam_controller);

// Scoreコントローラー
var score_controller = require("./controllers/score_controller");
app.use("/", score_controller);

// 3000番ポートで起動(本番：3001)
app.listen(3001, () => console.log('Mylish Server is running on port 3001.'));
