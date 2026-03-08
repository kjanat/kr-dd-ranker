import type { Case } from '../types.ts';

export const hartkloppingen: Case = {
	id: 'h30-hartkloppingen',
	chapter: 'H30',
	title: 'Hartkloppingen',
	patient: {
		age: 68,
		sex: 'M',
		chiefComplaint: 'Aanvalsgewijze hartkloppingen sinds enkele weken, onregelmatig',
	},
	steps: [
		{
			title: 'Presentatie',
			newInfo:
				'Een 68-jarige man komt op het spreekuur. Hij klaagt over aanvalsgewijze hartkloppingen die hij sinds enkele weken heeft. Zijn hart "slaat op hol" en dat voelt onregelmatig.',
			diagnoses: [
				{
					id: 'af',
					name: 'Boezemfibrilleren',
					correctRank: 1,
					isRedFlag: false,
					explanation:
						'Hoge a-priori kans bij 68-jarige man. Kans op AF verdubbelt per decennium. "Onregelmatig" past bij volkomen irregulair ritme.',
				},
				{
					id: 'extrasystolen',
					name: 'Extrasystolie',
					correctRank: 2,
					isRedFlag: false,
					explanation: 'Enkele irregulaire slagen bij een regulair basisritme. Frequent en meestal onschuldig.',
				},
				{
					id: 'svt',
					name: 'Paroxismale SVT (AVNRT)',
					correctRank: 3,
					isRedFlag: false,
					explanation:
						'Plotseling begin en einde, regelmatig snel ritme. Minder waarschijnlijk bij "onregelmatig" als beschrijving.',
				},
				{
					id: 'flutter',
					name: 'Boezemflutter',
					correctRank: 4,
					isRedFlag: false,
					explanation:
						'Meestal regelmatig snel ritme (2:1 blok geeft ~150/min). Minder waarschijnlijk bij onregelmatige beschrijving.',
				},
				{
					id: 'vt',
					name: 'Kamertachycardie',
					correctRank: 5,
					isRedFlag: true,
					explanation:
						'Bij oudere met mogelijk structurele hartschade: gevaarlijk! Tachycardie bij beschadigd hart = urgentie.',
				},
				{
					id: 'hyperthyreoidie',
					name: 'Hyperthyreoïdie',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Extracardiale oorzaak. Afvallen, zweten, tremor als begeleidende klachten.',
				},
				{
					id: 'anemie',
					name: 'Anemie',
					correctRank: 7,
					isRedFlag: false,
					explanation: 'Kan palpitaties veroorzaken via compensatoir verhoogde hartfrequentie.',
				},
				{
					id: 'medicatie',
					name: 'Medicatie-/middelengebruik',
					correctRank: 8,
					isRedFlag: false,
					explanation: 'Koffie, alcohol, drugs kunnen ritmestoornissen uitlokken.',
				},
				{
					id: 'angst',
					name: 'Angst-/paniekstoornis',
					correctRank: 9,
					isRedFlag: false,
					explanation:
						'Bij 68-jarige man zonder psychiatrische VG minder waarschijnlijk. Eerst cardiale oorzaak uitsluiten.',
				},
			],
		},
		{
			title: 'Na anamnese',
			newInfo:
				'Hart "onregelmatig op hol," aanvallen een paar keer per week, duren soms een halfuur tot enkele uren. Begin en einde vrij plotseling. "Heel snel en wild," kan ritme niet tikken door onregelmatigheid. Hypertensie (amlodipine 5mg). TIA 3 jaar geleden. Gestopt met roken 10 jaar geleden. 2-3 glazen wijn/avond, 3-4 koffie/dag. Vader overleed op 72 aan beroerte.',
			diagnoses: [
				{
					id: 'af',
					name: 'Boezemfibrilleren',
					correctRank: 1,
					isRedFlag: false,
					explanation:
						'Volkomen onregelmatig + snel + aanvalsgewijs met abrupt begin/einde + 68 jaar + hypertensie + TIA in VG = paroxismaal AF is nu de meest waarschijnlijke diagnose.',
				},
				{
					id: 'vt',
					name: 'Kamertachycardie',
					correctRank: 2,
					isRedFlag: true,
					explanation:
						'Bij hypertensie kan structurele hartschade bestaan. VT niet uitsluiten. VT is ook regelmatig, maar bij beschadigd hart moet je hierop bedacht zijn.',
				},
				{
					id: 'extrasystolen',
					name: 'Extrasystolie',
					correctRank: 3,
					isRedFlag: false,
					explanation:
						'Extrasystolen geven korte irregulaire slagen bij een regulair basisritme, niet "wild en onregelmatig" gedurende uren.',
				},
				{
					id: 'flutter',
					name: 'Boezemflutter',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Flutter geeft meestal een regelmatig snel ritme (2:1 blok). Minder waarschijnlijk.',
				},
				{
					id: 'svt',
					name: 'AVNRT/SVT',
					correctRank: 5,
					isRedFlag: false,
					explanation: 'SVT is regelmatig en snel, niet onregelmatig. Daalt in de DD.',
				},
				{
					id: 'hyperthyreoidie',
					name: 'Hyperthyreoïdie',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Nog niet uitgesloten, maar geen aanwijzingen in anamnese.',
				},
				{
					id: 'angst',
					name: 'Angst/paniek',
					correctRank: 7,
					isRedFlag: false,
					explanation:
						'68 jaar, geen psychiatrische VG, objectief onregelmatig ritme beschreven. Zeer onwaarschijnlijk als primaire oorzaak.',
				},
			],
		},
		{
			title: 'Na lichamelijk onderzoek',
			newInfo:
				'Niet-acuut zieke man. BD 148/88 mmHg. Pols: irregulair, inaequaal, ~110/min. Polsdeficit: 124 slagen bij auscultatie vs. 108 bij palpatie. Geen cannon waves. Onregelmatige hartactie, wisselende luidheid S1, geen souffles. Geen crepitaties. Schildklier niet vergroot. Geen perifeer oedeem. Na 10 kniebuigingen blijft pols volledig irregulair.',
			diagnoses: [
				{
					id: 'af',
					name: 'Boezemfibrilleren',
					correctRank: 1,
					isRedFlag: false,
					explanation:
						'Volledig irregulair + inaequaal (spec 99%) + polsdeficit + wisselende S1 + irregulariteit blijft na inspanning = klassiek AF-beeld.',
				},
				{
					id: 'flutter-wisselend',
					name: 'Boezemflutter met wisselend blok',
					correctRank: 2,
					isRedFlag: false,
					explanation:
						'Kan soms irregulair lijken bij wisselend AV-blok. Minder waarschijnlijk dan AF maar klein restrisico.',
				},
				{
					id: 'extrasystolen',
					name: 'Extrasystolie',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Irregulariteit verdwijnt NIET na inspanning. Dit spreekt sterk tegen extrasystolen.',
				},
				{
					id: 'vt',
					name: 'Kamertachycardie',
					correctRank: 4,
					isRedFlag: true,
					explanation:
						'Geen cannon waves, geen wisselende S1 bij regulair ritme. VT is regelmatig. Zeer onwaarschijnlijk.',
				},
			],
		},
	],
};
