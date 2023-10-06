// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
var express = require("express");

// アプリケーション
var app = express();

// JSONオブジェクトの認識
app.use(express.json());

// production環境のフロントエンドの設定
// app.use('/img', express.static(__dirname + '/dist/img/'));
// app.use('/css', express.static(__dirname + '/dist/css/'));
// app.use('/js', express.static(__dirname + '/dist/js/'));
// app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

// 3000番ポートで起動
app.listen(3000, () => console.log('Mylish Server is running on port 3000.'));
