// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
var express = require("express");
var router = express.Router();

// DB
var database = require("../repositories/database");
var query = require("../queries/score_query");

// ==================================================
// スコアを取得
// ==================================================
router.get("/get_score", async (req, res) => {
  const { id } = req.query;
  var db = database.open();
  db.get(query.select_score, [id], (err, row) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      db.close();
    } else {
      db.all(query.select_grades, [id], (err, rows) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          res.status(200).json({
            score: row,
            grades: rows,
          });
        }
        db.close();
      });
    }
  })
});

// ==================================================
// モジュール登録
// ==================================================
module.exports = router;
