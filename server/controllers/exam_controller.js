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
  db.all(query.select_sentence, [id], (err, rows) => {
    db.close();
    if (rows.length == 0) {
      res.json({ end_flg: true });
      return
    }
    if (JSON.parse(is_random)) {
      var min = 0;
      var max = rows.length - 1;
      var idx = Math.floor(Math.random() * (max + 1 - min)) + min;
      res.json({ end_flg: false, sentence: rows[idx]});
    } else {
      res.json({ end_flg: false, sentence: rows[0] });
    }
  });
});

// ==================================================
// 解答
// ==================================================
router.post("/submit", async (req, res) => {
  const grade = req.body;
  var db = database.open();
  var stmt = db.prepare(query.submit);
  stmt.run([
    grade.score_id,
    grade.sentence_no,
    grade.seq,
    grade.result,
    grade.answer_fixed
  ], (err, result) => {
    stmt.finalize();
    if (err) {
      res.status(500).json({
        message: err.message,
      });
      db.close();
    } else {
      db.all(query.select_sentence, [grade.score_id], (err, rows) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          res.json({ end_flg: rows.length == 0 });
        }
        db.close();
      });
    }
  });
});

// ==================================================
// 解答
// ==================================================
router.post("/exit", async (req, res) => {
  const { id } = req.body;
  var db = database.open();
  var stmt = db.prepare(query.exit);
  stmt.run([id, id, id], (err, result) => {
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
