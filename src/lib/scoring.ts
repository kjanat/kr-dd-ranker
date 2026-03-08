import type { DiagnosisFeedback, StepDiagnosis, StepResult, UserDiagnosis } from './types.ts';

/**
 * Kendall tau-b rank correlation coefficient.
 * Compares user ranking (position in array) to correct ranking.
 * Returns value in [-1, 1] where 1 = perfect agreement.
 */
export function kendallTau(
	userOrder: readonly { id: string }[],
	correctRanks: ReadonlyMap<string, number>,
): number {
	const n = userOrder.length;
	if (n < 2) return 1;

	// Build pairs of (userRank, correctRank)
	const pairs: { user: number; correct: number }[] = [];
	for (let i = 0; i < n; i++) {
		const id = userOrder[i].id;
		const correct = correctRanks.get(id);
		if (correct === undefined) continue;
		pairs.push({ user: i + 1, correct });
	}

	let concordant = 0;
	let discordant = 0;

	for (let i = 0; i < pairs.length; i++) {
		for (let j = i + 1; j < pairs.length; j++) {
			const userDiff = pairs[i].user - pairs[j].user;
			const correctDiff = pairs[i].correct - pairs[j].correct;
			const product = userDiff * correctDiff;
			if (product > 0) concordant++;
			else if (product < 0) discordant++;
			// ties (product === 0) are ignored in tau-b simplified
		}
	}

	const totalPairs = (n * (n - 1)) / 2;
	if (totalPairs === 0) return 1;

	return (concordant - discordant) / totalPairs;
}

/**
 * Score red flag detection: fraction of actual red flags the user correctly flagged.
 * Returns 1.0 if there are no red flags in this step.
 */
export function redFlagScore(
	userDiagnoses: readonly UserDiagnosis[],
	stepDiagnoses: readonly StepDiagnosis[],
): number {
	const redFlagIds = new Set(stepDiagnoses.filter((d) => d.isRedFlag).map((d) => d.id));
	if (redFlagIds.size === 0) return 1;

	const flagged = userDiagnoses.filter((d) => d.flaggedRedFlag && redFlagIds.has(d.id));
	return flagged.length / redFlagIds.size;
}

/** Build per-diagnosis feedback */
export function buildFeedback(
	userDiagnoses: readonly UserDiagnosis[],
	stepDiagnoses: readonly StepDiagnosis[],
): DiagnosisFeedback[] {
	const correctMap = new Map(stepDiagnoses.map((d) => [d.id, d]));

	return userDiagnoses.map((ud, idx) => {
		const userRank = idx + 1;
		const correct = correctMap.get(ud.id);
		if (!correct) {
			throw new Error(`Unknown diagnosis id: ${ud.id}`);
		}

		const diff = userRank - correct.correctRank;
		let verdict: DiagnosisFeedback['verdict'];
		if (diff === 0) verdict = 'correct';
		else if (diff < 0) verdict = 'too-high';
		else verdict = 'too-low';

		return {
			diagnosisId: ud.id,
			name: ud.name,
			userRank,
			correctRank: correct.correctRank,
			isRedFlag: correct.isRedFlag,
			userFlaggedRedFlag: ud.flaggedRedFlag,
			verdict,
			missedRedFlag: correct.isRedFlag && !ud.flaggedRedFlag,
			explanation: correct.explanation,
		};
	});
}

/** Evaluate a complete step submission */
export function evaluateStep(
	userDiagnoses: readonly UserDiagnosis[],
	stepDiagnoses: readonly StepDiagnosis[],
	timeMs: number,
): StepResult {
	const correctRanks = new Map(stepDiagnoses.map((d) => [d.id, d.correctRank]));

	return {
		kendallTau: kendallTau(userDiagnoses, correctRanks),
		redFlagScore: redFlagScore(userDiagnoses, stepDiagnoses),
		timeMs,
		feedback: buildFeedback(userDiagnoses, stepDiagnoses),
	};
}

/** Shuffle array (Fisher-Yates) — returns new array */
export function shuffle<T>(arr: readonly T[]): T[] {
	const result = [...arr];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
