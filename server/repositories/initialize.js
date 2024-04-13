// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
module.exports = {
  create_scores: `
    CREATE TABLE IF NOT EXISTS scores (
        id         INTEGER PRIMARY KEY AUTOINCREMENT --ID
      , started_at DATE --日時
      , answered   INT  --回答数
      , corrected  INT  --正答数
    )
  `,
  create_grades: `
    CREATE TABLE IF NOT EXISTS grades (
        score_id    INT  --スコアID
      , sentence_no INT  --文章番号
      , seq         INT  --出題順序
      , result      INT  --0:誤り/1:正解
      , answer      TEXT --入力文章
      , PRIMARY KEY (score_id, sentence_no)
    )
  `,
  create_sentences: `
    CREATE TABLE IF NOT EXISTS sentences (
        no INT  --番号
      , en TEXT --英文
      , ja TEXT --和訳
      , PRIMARY KEY (no)
    )
  `,
};
