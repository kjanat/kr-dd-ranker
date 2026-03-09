<script lang="ts">
import { allCases, getCaseById } from '$lib/data/cases.js';
import { evaluateStep, shuffle } from '$lib/scoring.js';
import type { Case, GamePhase, StepResult, UserDiagnosis } from '$lib/types.js';

// ---- Game state ----
let phase = $state<GamePhase>({ kind: 'selecting' });
let userDiagnoses = $state<UserDiagnosis[]>([]);
let stepResults = $state<StepResult[]>([]);
let dragIndex = $state<number | null>(null);
let dragOverIndex = $state<number | null>(null);

// ---- Derived ----
let activeCase = $derived(
	phase.kind !== 'selecting' ? getCaseById(phase.caseId) : undefined,
);
let activeStep = $derived(
	activeCase && phase.kind !== 'selecting' && phase.kind !== 'complete'
		? activeCase.steps[phase.stepIndex]
		: undefined,
);
let totalSteps = $derived(activeCase ? activeCase.steps.length : 0);
let currentStepIndex = $derived(
	phase.kind === 'ranking' || phase.kind === 'feedback' ? phase.stepIndex : -1,
);

// ---- Actions ----

function startCase(c: Case) {
	stepResults = [];
	initStep(c, 0);
}

function initStep(c: Case, stepIndex: number) {
	const step = c.steps[stepIndex];
	userDiagnoses = shuffle(step.diagnoses).map((d) => ({
		id: d.id,
		name: d.name,
		flaggedRedFlag: false,
	}));
	phase = {
		kind: 'ranking',
		caseId: c.id,
		stepIndex,
		startTime: Date.now(),
	};
}

function submitRanking() {
	if (phase.kind !== 'ranking' || !activeStep) return;
	const timeMs = Date.now() - phase.startTime;
	const result = evaluateStep(userDiagnoses, activeStep.diagnoses, timeMs);
	stepResults = [...stepResults, result];
	phase = {
		kind: 'feedback',
		caseId: phase.caseId,
		stepIndex: phase.stepIndex,
		result,
	};
}

function nextStep() {
	if (phase.kind !== 'feedback' || !activeCase) return;
	const next = phase.stepIndex + 1;
	if (next < activeCase.steps.length) {
		initStep(activeCase, next);
	} else {
		phase = {
			kind: 'complete',
			caseId: phase.caseId,
			results: stepResults,
		};
	}
}

function backToMenu() {
	phase = { kind: 'selecting' };
	stepResults = [];
	userDiagnoses = [];
}

// ---- Drag and drop ----

function handleDragStart(index: number) {
	dragIndex = index;
}

function handleDragOver(e: DragEvent, index: number) {
	e.preventDefault();
	dragOverIndex = index;
}

function handleDrop(index: number) {
	if (dragIndex === null || dragIndex === index) {
		dragIndex = null;
		dragOverIndex = null;
		return;
	}
	const updated = [...userDiagnoses];
	const [item] = updated.splice(dragIndex, 1);
	updated.splice(index, 0, item);
	userDiagnoses = updated;
	dragIndex = null;
	dragOverIndex = null;
}

function handleDragEnd() {
	dragIndex = null;
	dragOverIndex = null;
}

// ---- Arrow reorder ----

function moveUp(index: number) {
	if (index <= 0) return;
	const updated = [...userDiagnoses];
	[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
	userDiagnoses = updated;
}

function moveDown(index: number) {
	if (index >= userDiagnoses.length - 1) return;
	const updated = [...userDiagnoses];
	[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
	userDiagnoses = updated;
}

// ---- Red flag toggle ----

function toggleFlag(index: number) {
	const updated = [...userDiagnoses];
	updated[index] = {
		...updated[index],
		flaggedRedFlag: !updated[index].flaggedRedFlag,
	};
	userDiagnoses = updated;
}

// ---- Formatting ----

function formatTime(ms: number): string {
	const s = Math.floor(ms / 1000);
	const m = Math.floor(s / 60);
	const remainder = s % 60;
	return m > 0 ? `${m}m ${remainder}s` : `${s}s`;
}

function formatScore(n: number): string {
	return `${Math.round(n * 100)}%`;
}

function tauToPercent(tau: number): number {
	// tau ranges from -1 to 1, normalize to 0-100
	return Math.round(((tau + 1) / 2) * 100);
}

function scoreColor(score: number): string {
	return score === 1 ? 'var(--success)' : 'var(--danger)';
}
</script>

<!-- ====== CASE SELECTION ====== -->
{#if phase.kind === 'selecting'}
	<div class="stack stack-md" style="margin-top: 1rem">
		<p class="text-sm text-muted text-center">
			Kies een casus. Rank de diagnoses op waarschijnlijkheid en markeer de
			alarmsignalen.
		</p>

		<div class="case-grid" aria-label="Beschikbare casussen">
			{#each allCases as c (c.id)}
				<button class="case-card" onclick={() => startCase(c)}>
					<div class="case-chapter">{c.chapter}</div>
					<div class="case-info">
						<div class="case-title">{c.title}</div>
						<div class="case-patient">
							{c.patient.sex === 'M' ? 'Man' : 'Vrouw'}, {c.patient.age} jaar
							&middot;
							{c.steps.length} stappen
						</div>
					</div>
					<span style="color: var(--text-muted); font-size: 1.25rem"
					>&#8250;</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ====== RANKING PHASE ====== -->
{:else if phase.kind === 'ranking' && activeCase && activeStep}
	<div class="stack stack-md" style="margin-top: 1rem">
		<!-- Step progress -->
		<nav
			aria-label="Stap voortgang"
			class="row"
			style="justify-content: center"
		>
			{#each activeCase.steps as step, i (step.title)}
				{#if i > 0}
					<div
						class="step-connector"
						class:done={i <= currentStepIndex}
						aria-hidden="true"
					>
					</div>
				{/if}
				<div
					class="step-dot"
					class:active={i === currentStepIndex}
					class:done={i < currentStepIndex}
					aria-label="Stap {i + 1}{i === currentStepIndex ? ' (huidig)' : i < currentStepIndex ? ' (voltooid)' : ''}"
					aria-current={i === currentStepIndex ? 'step' : undefined}
				>
					{i + 1}
				</div>
			{/each}
		</nav>
		<span class="sr-only">Stap {currentStepIndex + 1} van {totalSteps}</span>

		<!-- Patient card -->
		<div class="card patient-card">
			<div class="row" style="gap: 1.5rem; flex-wrap: wrap">
				<div>
					<div class="label">Patient</div>
					<div class="value">
						{activeCase.patient.sex === 'M' ? 'Man' : 'Vrouw'}, {
							activeCase.patient.age
						} jaar
					</div>
				</div>
				<div style="flex: 1; min-width: 200px">
					<div class="label">Klacht</div>
					<div class="value" style="font-size: 1rem">
						{activeCase.patient.chiefComplaint}
					</div>
				</div>
			</div>
		</div>

		<!-- Clinical info -->
		<div>
			<div class="text-sm" style="font-weight: 600; margin-bottom: 0.375rem">
				Stap {phase.stepIndex + 1}: {activeStep.title}
			</div>
			<div class="clinical-info">{activeStep.newInfo}</div>
		</div>

		<!-- Instructions -->
		<div class="text-sm text-muted">
			Sleep de diagnoses in volgorde van waarschijnlijkheid (meest
			waarschijnlijk bovenaan). Markeer gevaarlijke diagnoses met de vlag.
		</div>

		<!-- Diagnosis list -->
		<div
			class="stack stack-xs"
			role="list"
			aria-label="Diagnoses rangschikking"
		>
			{#each userDiagnoses as dx, i (dx.id)}
				<div
					class="dx-item"
					class:dragging={dragIndex === i}
					class:drag-over={dragOverIndex === i && dragIndex !== i}
					draggable="true"
					role="listitem"
					aria-label="{dx.name}, positie {i + 1} van {userDiagnoses.length}"
					ondragstart={() => handleDragStart(i)}
					ondragover={(e: DragEvent) => handleDragOver(e, i)}
					ondrop={() => handleDrop(i)}
					ondragend={handleDragEnd}
				>
					<div class="dx-rank">{i + 1}</div>
					<div class="dx-name">{dx.name}</div>
					<div class="dx-arrows">
						<button
							onclick={() => moveUp(i)}
							disabled={i === 0}
							aria-label="Omhoog"
						>
							&#9650;
						</button>
						<button
							onclick={() => moveDown(i)}
							disabled={i === userDiagnoses.length - 1}
							aria-label="Omlaag"
						>
							&#9660;
						</button>
					</div>
					<button
						class="dx-flag"
						class:flagged={dx.flaggedRedFlag}
						onclick={() => toggleFlag(i)}
						aria-label={dx.flaggedRedFlag ? 'Alarmsignaal verwijderen' : 'Markeer als alarmsignaal'}
					>
						{#if dx.flaggedRedFlag}
							&#9873;
						{:else}
							&#9872;
						{/if}
					</button>
				</div>
			{/each}
		</div>

		<!-- Submit -->
		<button class="btn btn-primary" style="width: 100%" onclick={submitRanking}>
			Bevestig ranking
		</button>
	</div>

	<!-- ====== FEEDBACK PHASE ====== -->
{:else if phase.kind === 'feedback' && activeCase && activeStep}
	{@const result = phase.result}
	<div class="stack stack-md" style="margin-top: 1rem">
		<!-- Step progress -->
		<nav
			aria-label="Stap voortgang"
			class="row"
			style="justify-content: center"
		>
			{#each activeCase.steps as step, i (step.title)}
				{#if i > 0}
					<div
						class="step-connector"
						class:done={i <= phase.stepIndex}
						aria-hidden="true"
					>
					</div>
				{/if}
				<div
					class="step-dot"
					class:active={i === phase.stepIndex}
					class:done={i < phase.stepIndex}
					aria-label="Stap {i + 1}{i === phase.stepIndex ? ' (huidig)' : i < phase.stepIndex ? ' (voltooid)' : ''}"
					aria-current={i === phase.stepIndex ? 'step' : undefined}
				>
					{i + 1}
				</div>
			{/each}
		</nav>

		<!-- Scores -->
		<div class="score-grid" aria-live="polite">
			<div class="score-card">
				<div class="score-value" style="color: var(--primary)">
					{tauToPercent(result.kendallTau)}
				</div>
				<div class="score-label">Ranking (Kendall &tau;)</div>
				<div
					class="progress-bar"
					style="margin-top: 0.5rem"
					role="progressbar"
					aria-valuenow={tauToPercent(result.kendallTau)}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Ranking score"
				>
					<div
						class="progress-fill"
						style:width="{tauToPercent(result.kendallTau)}%"
						style:background="var(--primary)"
					>
					</div>
				</div>
			</div>
			<div class="score-card">
				<div class="score-value" style:color={scoreColor(result.redFlagScore)}>
					{formatScore(result.redFlagScore)}
				</div>
				<div class="score-label">Alarmsignalen</div>
				<div
					class="progress-bar"
					style="margin-top: 0.5rem"
					role="progressbar"
					aria-valuenow={Math.round(result.redFlagScore * 100)}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Alarmsignalen score"
				>
					<div
						class="progress-fill"
						style:width="{result.redFlagScore * 100}%"
						style:background={scoreColor(result.redFlagScore)}
					>
					</div>
				</div>
			</div>
			<div class="score-card">
				<div class="score-value" style="color: var(--text-muted)">
					{formatTime(result.timeMs)}
				</div>
				<div class="score-label">Tijd</div>
			</div>
		</div>

		<!-- Feedback list -->
		<div class="stack stack-xs" role="list" aria-label="Feedback per diagnose">
			{#each result.feedback as fb (fb.diagnosisId)}
				<div
					class="dx-item"
					class:fb-correct={fb.verdict === 'correct' && !fb.missedRedFlag}
					class:fb-too-high={fb.verdict === 'too-high' && !fb.missedRedFlag}
					class:fb-too-low={fb.verdict === 'too-low' && !fb.missedRedFlag}
					class:fb-missed={fb.missedRedFlag}
					style="cursor: default"
					role="listitem"
				>
					<div
						class="dx-rank"
						style="background: transparent; border: none; font-size: 0.75rem"
					>
						{fb.userRank} &#8594; {fb.correctRank}
					</div>
					<div class="stack stack-xs" style="flex: 1">
						<div class="dx-name">{fb.name}</div>
						<div class="text-sm text-muted">{fb.explanation}</div>
					</div>
					<div style="display: flex; gap: 0.375rem; flex-shrink: 0; flex-wrap: wrap">
						{#if fb.verdict === 'correct'}
							<span class="badge badge-green">Goed</span>
						{:else if fb.verdict === 'too-high'}
							<span class="badge badge-orange">Te hoog</span>
						{:else}
							<span class="badge badge-purple">Te laag</span>
						{/if}

						{#if fb.missedRedFlag}
							<span class="badge badge-red">Alarmsignaal gemist!</span>
						{:else if fb.isRedFlag && fb.userFlaggedRedFlag}
							<span class="badge badge-green">Alarm gevlagd</span>
						{:else if !fb.isRedFlag && fb.userFlaggedRedFlag}
							<span class="badge badge-orange">Vals alarm</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Next step / complete -->
		<div class="row" style="gap: 0.5rem">
			{#if phase.stepIndex + 1 < totalSteps}
				<button class="btn btn-primary" style="flex: 1" onclick={nextStep}>
					Volgende stap &#8594;
				</button>
			{:else}
				<button class="btn btn-primary" style="flex: 1" onclick={nextStep}>
					Bekijk eindresultaat
				</button>
			{/if}
			<button class="btn btn-outline" onclick={backToMenu}>Stop</button>
		</div>
	</div>

	<!-- ====== COMPLETE PHASE ====== -->
{:else if phase.kind === 'complete' && activeCase}
	{@const avgTau = stepResults.reduce((sum, r) => sum + r.kendallTau, 0)
	/ stepResults.length}
	{@const avgRedFlag = stepResults.reduce((sum, r) => sum + r.redFlagScore, 0)
	/ stepResults.length}
	{@const totalTime = stepResults.reduce((sum, r) => sum + r.timeMs, 0)}

	<div class="stack stack-lg" style="margin-top: 1rem">
		<div class="text-center">
			<h2 style="font-size: 1.25rem; font-weight: 700">
				Casus voltooid: {activeCase.title}
			</h2>
			<p class="text-sm text-muted">
				{activeCase.patient.sex === 'M' ? 'Man' : 'Vrouw'}, {
					activeCase.patient.age
				} jaar
			</p>
		</div>

		<!-- Overall scores -->
		<div class="score-grid">
			<div class="score-card" style="border-color: var(--primary)">
				<div class="score-value" style="color: var(--primary)">
					{tauToPercent(avgTau)}
				</div>
				<div class="score-label">Gem. ranking</div>
			</div>
			<div class="score-card" style:border-color={scoreColor(avgRedFlag)}>
				<div class="score-value" style:color={scoreColor(avgRedFlag)}>
					{formatScore(avgRedFlag)}
				</div>
				<div class="score-label">Alarmsignalen</div>
			</div>
			<div class="score-card">
				<div class="score-value" style="color: var(--text-muted)">
					{formatTime(totalTime)}
				</div>
				<div class="score-label">Totale tijd</div>
			</div>
		</div>

		<!-- Per-step breakdown -->
		<div class="stack stack-sm">
			<h3 class="text-sm" style="font-weight: 600">Per stap</h3>
			{#each stepResults as sr, i (i)}
				<div class="card" style="padding: 0.75rem 1rem">
					<div class="row row-between" style="flex-wrap: wrap; gap: 0.5rem">
						<div>
							<span style="font-weight: 600">Stap {i + 1}</span>
							<span class="text-sm text-muted" style="margin-left: 0.5rem">
								{activeCase.steps[i].title}
							</span>
						</div>
						<div class="row" style="gap: 0.5rem">
							<span class="badge badge-purple"
							>Ranking: {tauToPercent(sr.kendallTau)}%</span>
							<span
								class="badge"
								class:badge-green={sr.redFlagScore === 1}
								class:badge-red={sr.redFlagScore < 1}
							>
								Alarm: {formatScore(sr.redFlagScore)}
							</span>
							<span class="text-sm text-muted">{formatTime(sr.timeMs)}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="row" style="gap: 0.5rem">
			{#if activeCase}
				<button
					class="btn btn-primary"
					style="flex: 1"
					onclick={() => startCase(activeCase)}
				>
					Opnieuw spelen
				</button>
			{/if}
			<button class="btn btn-outline" style="flex: 1" onclick={backToMenu}>
				Terug naar overzicht
			</button>
		</div>
	</div>
{/if}
