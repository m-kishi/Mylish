// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
const sqlite3 = require("sqlite3");
const query = require("./initialize");

// ==================================================
// DBオブジェクトの取得
// ==================================================
module.exports = {
  open: () => {
    const db = new sqlite3.Database("./Mylish.db", (err) => {
      if (err) {
        console.log("DB Error : " + err.message);
        return;
      }
      // テーブルの初期生成
      db.serialize(() => {
        db.run(query.create_scores);
        db.run(query.create_grades);
        db.run(query.create_idioms);
        db.run(query.create_sentences);
      });
    });
    return db;
  },
};
