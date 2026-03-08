import { describe, expect, it } from 'vitest';
import { buildFeedback, evaluateStep, kendallTau, redFlagScore, shuffle } from './scoring.ts';
import type { StepDiagnosis, UserDiagnosis } from './types.ts';

describe('kendallTau', () => {
	it('returns 1 for perfect agreement', () => {
		const userOrder = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
		const correctRanks = new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]);
		expect(kendallTau(userOrder, correctRanks)).toBe(1);
	});

	it('returns -1 for perfect reversal', () => {
		const userOrder = [{ id: 'c' }, { id: 'b' }, { id: 'a' }];
		const correctRanks = new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]);
		expect(kendallTau(userOrder, correctRanks)).toBe(-1);
	});

	it('returns 0 for one swap in 3 items', () => {
		// user: a=1, c=2, b=3 vs correct: a=1, b=2, c=3
		// pairs: (a,c) concordant, (a,b) concordant, (c,b) discordant
		// tau = (2 - 1) / 3 = 1/3
		const userOrder = [{ id: 'a' }, { id: 'c' }, { id: 'b' }];
		const correctRanks = new Map([
			['a', 1],
			['b', 2],
			['c', 3],
		]);
		expect(kendallTau(userOrder, correctRanks)).toBeCloseTo(1 / 3, 5);
	});

	it('returns 1 for single item', () => {
		const userOrder = [{ id: 'a' }];
		const correctRanks = new Map([['a', 1]]);
		expect(kendallTau(userOrder, correctRanks)).toBe(1);
	});
});

describe('redFlagScore', () => {
	const step: StepDiagnosis[] = [
		{ id: 'a', name: 'A', correctRank: 1, isRedFlag: true, explanation: '' },
		{ id: 'b', name: 'B', correctRank: 2, isRedFlag: false, explanation: '' },
		{ id: 'c', name: 'C', correctRank: 3, isRedFlag: true, explanation: '' },
	];

	it('returns 1 when all red flags are flagged', () => {
		const user: UserDiagnosis[] = [
			{ id: 'a', name: 'A', flaggedRedFlag: true },
			{ id: 'b', name: 'B', flaggedRedFlag: false },
			{ id: 'c', name: 'C', flaggedRedFlag: true },
		];
		expect(redFlagScore(user, step)).toBe(1);
	});

	it('returns 0.5 when half of red flags are flagged', () => {
		const user: UserDiagnosis[] = [
			{ id: 'a', name: 'A', flaggedRedFlag: true },
			{ id: 'b', name: 'B', flaggedRedFlag: false },
			{ id: 'c', name: 'C', flaggedRedFlag: false },
		];
		expect(redFlagScore(user, step)).toBe(0.5);
	});

	it('returns 0 when no red flags are flagged', () => {
		const user: UserDiagnosis[] = [
			{ id: 'a', name: 'A', flaggedRedFlag: false },
			{ id: 'b', name: 'B', flaggedRedFlag: false },
			{ id: 'c', name: 'C', flaggedRedFlag: false },
		];
		expect(redFlagScore(user, step)).toBe(0);
	});

	it('returns 1 when there are no red flags', () => {
		const noFlags: StepDiagnosis[] = [
			{ id: 'a', name: 'A', correctRank: 1, isRedFlag: false, explanation: '' },
		];
		const user: UserDiagnosis[] = [{ id: 'a', name: 'A', flaggedRedFlag: false }];
		expect(redFlagScore(user, noFlags)).toBe(1);
	});
});

describe('buildFeedback', () => {
	const step: StepDiagnosis[] = [
		{ id: 'a', name: 'A', correctRank: 1, isRedFlag: false, explanation: 'Most likely' },
		{ id: 'b', name: 'B', correctRank: 2, isRedFlag: true, explanation: 'Dangerous' },
		{ id: 'c', name: 'C', correctRank: 3, isRedFlag: false, explanation: 'Unlikely' },
	];

	it('marks correct, too-high, too-low, and missed red flags', () => {
		// User order: b(rank 1), a(rank 2), c(rank 3)
		// Correct:    a=1, b=2, c=3
		// b: userRank=1, correct=2 → too-high
		// a: userRank=2, correct=1 → too-low
		// c: userRank=3, correct=3 → correct
		const user: UserDiagnosis[] = [
			{ id: 'b', name: 'B', flaggedRedFlag: false },
			{ id: 'a', name: 'A', flaggedRedFlag: false },
			{ id: 'c', name: 'C', flaggedRedFlag: false },
		];
		const fb = buildFeedback(user, step);

		expect(fb[0].verdict).toBe('too-high');
		expect(fb[0].missedRedFlag).toBe(true); // b is red flag, not flagged
		expect(fb[1].verdict).toBe('too-low');
		expect(fb[2].verdict).toBe('correct');
	});
});

describe('evaluateStep', () => {
	it('produces a complete StepResult', () => {
		const step: StepDiagnosis[] = [
			{ id: 'a', name: 'A', correctRank: 1, isRedFlag: false, explanation: '' },
			{ id: 'b', name: 'B', correctRank: 2, isRedFlag: false, explanation: '' },
		];
		const user: UserDiagnosis[] = [
			{ id: 'a', name: 'A', flaggedRedFlag: false },
			{ id: 'b', name: 'B', flaggedRedFlag: false },
		];
		const result = evaluateStep(user, step, 5000);

		expect(result.kendallTau).toBe(1);
		expect(result.redFlagScore).toBe(1);
		expect(result.timeMs).toBe(5000);
		expect(result.feedback).toHaveLength(2);
	});
});

describe('shuffle', () => {
	it('returns array of same length with same elements', () => {
		const input = [1, 2, 3, 4, 5];
		const result = shuffle(input);
		expect(result).toHaveLength(5);
		expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
	});

	it('does not mutate original', () => {
		const input = [1, 2, 3];
		shuffle(input);
		expect(input).toEqual([1, 2, 3]);
	});
});
