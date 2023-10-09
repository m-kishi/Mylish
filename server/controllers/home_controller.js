// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
var express = require("express");
var router = express.Router();

// DB
var database = require("../repositories/database");
var query = require("../queries/home_queries");

// ==================================================
// スコア一覧を取得
// ==================================================
router.get("/get_scores", async (req, res) => {
	var db = database.open();
	db.all(query.select_scores, (err, rows) => {
		console.log(JSON.stringify(rows));
		db.close();
		res.json(rows);
	})
});

// ==================================================
// モジュール登録
// ==================================================
module.exports = router;
