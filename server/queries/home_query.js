// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
module.exports = {
  select_scores: `
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
    ORDER BY
        started_at DESC
  `,
  start: `
    INSERT INTO scores (
        started_at
      , answered
      , corrected
    ) VALUES (
        STRFTIME('%Y-%m-%d %H:%M:%S', CURRENT_TIMESTAMP)
      , NULL
      , NULL
    )
  `,
  delete_score: `
    DELETE FROM scores WHERE id = ?
  `,
  delete_grades: `
    DELETE FROM grades WHERE score_id = ?
  `,
};
