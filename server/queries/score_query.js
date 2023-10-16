// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
module.exports = {
  select_score: `
    SELECT
        id
      , STRFTIME('%Y-%m-%d %H:%M:%S', DATETIME(started_at), '+9 hours') AS started_at
      , answered
      , corrected
      , CASE WHEN answered IS NULL OR answered = 0
          THEN 0
          ELSE COALESCE(corrected, 0) * 100 / answered
        END AS rate
    FROM
        scores
    WHERE
        id = ?
  `,
  select_grades: `
    SELECT
        A.seq AS seq
      , B.ja AS ja
      , A.result AS result
      , A.answer AS answer
    FROM
      grades A
      INNER JOIN sentences B
        ON B.no = A.sentence_no
    WHERE
      A.score_id = ?
    ORDER BY
      A.seq
  `,
};
