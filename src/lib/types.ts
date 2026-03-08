/** Patient demographics shown at case start */
export interface Patient {
	readonly age: number;
	readonly sex: 'M' | 'V';
	readonly chiefComplaint: string;
}

/** A diagnosis option within a single step */
export interface StepDiagnosis {
	readonly id: string;
	readonly name: string;
	/** 1-based; 1 = most likely */
	readonly correctRank: number;
	/** Dangerous diagnosis that must not be missed */
	readonly isRedFlag: boolean;
	readonly explanation: string;
}

/** One ranking round within a case */
export interface CaseStep {
	readonly title: string;
	/** Clinical info revealed at this step */
	readonly newInfo: string;
	readonly diagnoses: readonly StepDiagnosis[];
}

/** A full clinical case with multiple ranking rounds */
export interface Case {
	readonly id: string;
	readonly chapter: string;
	readonly title: string;
	readonly patient: Patient;
	readonly steps: readonly CaseStep[];
}

// --------------- Game state ---------------

/** User's placement of a single diagnosis */
export interface UserDiagnosis {
	id: string;
	name: string;
	flaggedRedFlag: boolean;
}

/** Feedback for a single diagnosis after submission */
export interface DiagnosisFeedback {
	readonly diagnosisId: string;
	readonly name: string;
	readonly userRank: number;
	readonly correctRank: number;
	readonly isRedFlag: boolean;
	readonly userFlaggedRedFlag: boolean;
	readonly verdict: 'correct' | 'too-high' | 'too-low';
	readonly missedRedFlag: boolean;
	readonly explanation: string;
}

/** Result of a single ranking step */
export interface StepResult {
	/** Kendall tau-b correlation, -1 to 1 (1 = perfect) */
	readonly kendallTau: number;
	/** 0-1, fraction of red flags correctly flagged */
	readonly redFlagScore: number;
	readonly timeMs: number;
	readonly feedback: readonly DiagnosisFeedback[];
}

/** Discriminated union for game phase */
export type GamePhase =
	| { readonly kind: 'selecting' }
	| {
		readonly kind: 'ranking';
		readonly caseId: string;
		readonly stepIndex: number;
		readonly startTime: number;
	}
	| {
		readonly kind: 'feedback';
		readonly caseId: string;
		readonly stepIndex: number;
		readonly result: StepResult;
	}
	| {
		readonly kind: 'complete';
		readonly caseId: string;
		readonly results: readonly StepResult[];
	};
