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
		db.close();
		res.json(rows);
	})
});

// ==================================================
// スコアを削除
// ==================================================
router.post('/delete_score', async (req, res) => {
	const { id } = req.body;

	var db = database.open();
	var stmt = db.prepare(query.delete_score);
	stmt.run(id, (err, result) => {
		if (err) {
			res.status(500).json({
				message: err.message,
			});
		} else {
			res.status(200).json({
				message: "OK",
			});
		}
		stmt.finalize();
		db.close();
	});
});

// ==================================================
// モジュール登録
// ==================================================
module.exports = router;
