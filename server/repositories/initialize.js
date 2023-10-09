// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
module.exports = {
	create_scores: `
		CREATE TABLE IF NOT EXISTS scores (
		    id         TEXT --ID
		  , started_at DATE --日時
		  , answered   INT  --回答数
		  , corrected  INT  --正答数
		  , PRIMARY KEY (id)
		)
	`,
	create_details: `
		CREATE TABLE IF NOT EXISTS details (
		    score_id    TEXT --スコアID
		  , sentence_no INT  --文章番号
		  , seq         INT  --出題順序
		  , result      INT  --0:誤り/1:正解
		  , answer      TEXT --入力文章
		  , PRIMARY KEY (score_id)
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
