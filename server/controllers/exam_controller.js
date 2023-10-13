// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
var express = require("express");
var router = express.Router();

// DB
var database = require("../repositories/database");
var query = require("../queries/exam_query");

// ==================================================
// 文章を取得
// ==================================================
router.get("/get_sentence", async (req, res) => {
  const { id, is_random } = req.query;
  var db = database.open();
  console.log(is_random);
  db.all(query.select_sentence, [id], (err, rows) => {
    db.close();
    if (rows.length == 0) {
      res.json({ end: true });
      return
    }
    if (JSON.parse(is_random)) {
    } else {
      res.json({ end: false, sentence: rows[0] });
    }
  });
});

// ==================================================
// モジュール登録
// ==================================================
module.exports = router;
