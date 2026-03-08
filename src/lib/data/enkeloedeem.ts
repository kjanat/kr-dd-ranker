import type { Case } from '../types.ts';

export const enkeloedeem: Case = {
	id: 'h59-enkeloedeem',
	chapter: 'H59',
	title: 'Enkeloedeem',
	patient: {
		age: 68,
		sex: 'M',
		chiefComplaint: 'Al een paar weken dikke enkels, schoenen passen niet meer',
	},
	steps: [
		{
			title: 'Presentatie',
			newInfo:
				'Een 68-jarige man komt op het spreekuur omdat hij al een paar weken dikke enkels heeft. Zijn schoenen passen niet meer goed.',
			diagnoses: [
				{
					id: 'cvi',
					name: 'Veneuze insufficiëntie',
					correctRank: 1,
					isRedFlag: false,
					explanation: 'Meest voorkomende oorzaak van enkeloedeem (~7% prevalentie).',
				},
				{
					id: 'hartfalen',
					name: 'Hartfalen',
					correctRank: 2,
					isRedFlag: true,
					explanation: 'A-priori kans ~3x hoger bij man dan bij vrouw. Bij 68 jaar: serieus overwegen.',
				},
				{
					id: 'medicamenteus',
					name: 'Medicamenteus oedeem',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Ca-antagonisten, NSAIDs, corticosteroïden kunnen oedeem veroorzaken (~5%).',
				},
				{
					id: 'dvt',
					name: 'DVT (diep-veneuze trombose)',
					correctRank: 4,
					isRedFlag: true,
					explanation: 'Eenzijdig, acuut, pijnlijk oedeem is alarmsignaal. Bij tweezijdig minder waarschijnlijk.',
				},
				{
					id: 'nefrotisch',
					name: 'Nefrotisch syndroom',
					correctRank: 5,
					isRedFlag: false,
					explanation: 'Verlaagde colloïd-osmotische druk door proteïnurie. Vraag naar schuimende urine.',
				},
				{
					id: 'levercirrose',
					name: 'Levercirrose',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Hypoalbuminemie. Vraag naar alcoholgebruik, spider naevi, icterus.',
				},
				{
					id: 'lymfoedeem',
					name: 'Lymfoedeem',
					correctRank: 7,
					isRedFlag: false,
					explanation: 'Non-pitting oedeem dat niet verdwijnt bij horizontale positie. Kaposi-Stemmer teken.',
				},
				{
					id: 'idiopathisch',
					name: 'Idiopathisch oedeem',
					correctRank: 8,
					isRedFlag: false,
					explanation: '65% van enkeloedeem in de huisartsenpraktijk heeft geen specifieke diagnose.',
				},
			],
		},
		{
			title: 'Na anamnese',
			newInfo:
				"Oedeem beide enkels, rechts > links. Geleidelijk ontstaan over weken, 's avonds erger, 's ochtends weer dunner. Geen pijn. Sneller moe bij traplopen. Moet met twee kussens slapen (anders benauwd). Plast 's nachts vaker. VG: myocardinfarct (5 jaar geleden), hypertensie. Gestopt met roken na infarct. 2 glazen wijn/dag. Medicatie: metoprolol 50mg 2dd, ASA 80mg, atorvastatine 40mg, amlodipine 10mg.",
			diagnoses: [
				{
					id: 'hartfalen',
					name: 'Hartfalen',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Myocardinfarct in VG (OR 3,8) + hypertensie (OR 2,6) + dyspneu bij inspanning (OR 2,3) + orthopneu (spec. 81%) + nycturie = sterk verdacht voor hartfalen.',
				},
				{
					id: 'medicamenteus',
					name: 'Medicamenteus oedeem (amlodipine)',
					correctRank: 2,
					isRedFlag: false,
					explanation:
						'Amlodipine 10mg is hoge dosis Ca-antagonist, bekende bijwerking. Maar dyspneu + orthopneu + nycturie wijst op meer dan alleen medicatie-effect!',
				},
				{
					id: 'cvi',
					name: 'Veneuze insufficiëntie',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Blijft in DD maar minder waarschijnlijk: geen pijn, geen zwaar gevoel benen.',
				},
				{
					id: 'nefrotisch',
					name: 'Nefrotisch syndroom',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Moet nog worden uitgesloten. Vraag naar dik gezicht, schuimende urine.',
				},
				{
					id: 'dvt',
					name: 'DVT',
					correctRank: 5,
					isRedFlag: false,
					explanation: 'Tweezijdig, geleidelijk, geen pijn. Zeer onwaarschijnlijk voor DVT.',
				},
				{
					id: 'lymfoedeem',
					name: 'Lymfoedeem',
					correctRank: 6,
					isRedFlag: false,
					explanation:
						"Oedeem verdwijnt deels 's nachts, dus waarschijnlijk pitting oedeem. Lymfoedeem minder waarschijnlijk.",
				},
			],
		},
		{
			title: 'Na lichamelijk onderzoek',
			newInfo:
				'Niet-acuut zieke, licht adipeuze man. BD 152/88 mmHg. Pols 88/min, regulair. Ademfrequentie 18/min. Benen: tweezijdig pitting oedeem tot halverwege onderbenen. Geen pigmentaties, varices, eczeem. Kaposi-Stemmer negatief. CVD VERHOOGD (boven 2e rib). S3 galopritme (!). Geen souffles. Posterobasale fijne crepitaties beiderzijds. Demping rechts basaal. Geen ascites, lever net palpabel. Abdominojugulaire test POSITIEF. Geen spider naevi, geen icterus.',
			diagnoses: [
				{
					id: 'hartfalen',
					name: 'Hartfalen (links- en rechtszijdig)',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Verhoogde CVD (spec. 97%) + S3 (spec. 95%) + crepitaties + oedeem = specificiteit 100% voor hartfalen. Positieve abdominojugulaire test bevestigt rechtszijdig HF.',
				},
				{
					id: 'medicamenteus',
					name: 'Medicamenteus oedeem',
					correctRank: 2,
					isRedFlag: false,
					explanation:
						'Amlodipine kan bijdragen aan het oedeem, maar verklaart niet de CVD + S3 + crepitaties. Valkuil: alleen amlodipine staken en hartfalen missen!',
				},
				{
					id: 'cvi',
					name: 'Veneuze insufficiëntie',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Geen varices, geen pigmentaties, geen eczeem. Zeer onwaarschijnlijk.',
				},
				{
					id: 'nefrotisch',
					name: 'Nefrotisch syndroom',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Geen tekenen. Urineonderzoek ter bevestiging.',
				},
			],
		},
	],
};
