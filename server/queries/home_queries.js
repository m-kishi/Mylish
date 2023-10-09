// ==================================================
// ©2023 https://github.com/m-kishi
// ==================================================
module.exports = {
	select_scores: `
		SELECT
		    id
		  , started_at
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
};
