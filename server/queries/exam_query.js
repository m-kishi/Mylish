// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
module.exports = {
  select_grades: `
    SELECT
        A.sentence_no
    FROM
        grades A
    WHERE
        A.score_id = $1
  `,
  select_sentence: `
    SELECT
        A.no AS no
      , A.en AS en
      , A.ja AS ja
      , (SELECT COUNT(*) + 1 FROM grades X WHERE X.score_id = ?) AS count
    FROM
        sentences A
    WHERE
        NOT EXISTS (
          SELECT
              1
          FROM
              grades B
          WHERE
              B.score_id = ?
          AND B.sentence_no = A.no
        )
    ORDER BY
        A.no
  `,
  submit: `
    INSERT INTO grades (
        score_id
      , sentence_no
      , seq
      , result
      , answer
    ) VALUES (
        ?
      , ?
      , ?
      , ?
      , ?
    )
  `,
  select_idioms: `
    SELECT
        A.no  AS no
      , A.seq AS seq
      , A.en  AS en
      , A.ja  AS ja
    FROM
        idioms A
    WHERE
        A.no = ?
    ORDER BY
        A.no
      , A.seq
  `,
  exit: `
    UPDATE scores
    SET
        answered = (SELECT COUNT(*) FROM grades WHERE score_id = ?)
      , corrected = (SELECT COUNT(*) FROM grades WHERE score_id = ? AND result = 1)
    WHERE id = ?
  `,
};
