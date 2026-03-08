import type { Case } from '../types.ts';

export const hoofdpijn: Case = {
	id: 'h13-hoofdpijn',
	chapter: 'H13',
	title: 'Hoofdpijn',
	patient: {
		age: 54,
		sex: 'V',
		chiefComplaint: 'Sinds 3 weken toenemende hoofdpijn',
	},
	steps: [
		{
			title: 'Presentatie',
			newInfo: 'Een 54-jarige vrouw komt op het spreekuur bij de huisarts met sinds 3 weken toenemende hoofdpijn.',
			diagnoses: [
				{
					id: 'spanningshp',
					name: 'Spanningshoofdpijn',
					correctRank: 1,
					isRedFlag: false,
					explanation: 'Meest voorkomende oorzaak, komt 1,5-2x vaker voor bij vrouwen.',
				},
				{
					id: 'migraine',
					name: 'Migraine',
					correctRank: 2,
					isRedFlag: false,
					explanation: 'Frequent bij vrouwen. Vraag naar aanvalsgewijs patroon en begeleidende klachten.',
				},
				{
					id: 'arteriitis',
					name: 'Arteriitis temporalis',
					correctRank: 3,
					isRedFlag: true,
					explanation:
						'Vrouw >50 jaar + nieuwe hoofdpijn: altijd overwegen! Risico op permanent visusverlies als gemist.',
				},
				{
					id: 'med-overgebruik',
					name: 'Medicatieovergebruikshoofdpijn',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Vraag naar frequentie pijnstillergebruik (>15 dagen/maand).',
				},
				{
					id: 'bijwerking',
					name: 'Bijwerking geneesmiddelen',
					correctRank: 5,
					isRedFlag: false,
					explanation: 'Diverse medicijnen kunnen hoofdpijn als bijwerking geven.',
				},
				{
					id: 'sinusitis',
					name: 'Sinusitis',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Bovensteluchtweginfectie met hoofdpijn. Meestal self-limiting.',
				},
				{
					id: 'hersentumor',
					name: 'Hersentumor/hersenmetastasen',
					correctRank: 7,
					isRedFlag: true,
					explanation:
						'Progressief beloop + nieuwe hoofdpijn >50 jaar: secundaire oorzaak overwegen. Vraag naar focale uitval.',
				},
				{
					id: 'sab',
					name: 'Subarachnoïdale bloeding (SAB)',
					correctRank: 8,
					isRedFlag: true,
					explanation:
						'Peracuut ontstane hevige hoofdpijn. Hier minder waarschijnlijk (geleidelijk begin), maar niet missen!',
				},
				{
					id: 'subduraal',
					name: 'Subduraal hematoom',
					correctRank: 9,
					isRedFlag: true,
					explanation: 'Vraag naar recent hoofdtrauma (<6 weken).',
				},
				{
					id: 'meningitis',
					name: 'Meningitis/encefalitis',
					correctRank: 10,
					isRedFlag: true,
					explanation: 'Koorts + nekstijfheid + gedaald bewustzijn. Acute presentatie.',
				},
			],
		},
		{
			title: 'Na anamnese',
			newInfo:
				'Geleidelijk ontstaan, 3 weken geleden begonnen en erger geworden. Pijn links temporaal, stekend/bonzend, VAS 7/10. Geen misselijkheid/braken, geen foto-/fonofobie, geen koorts. Kaakpijn bij lang kauwen ("na biefstuk doet kaak zeer"). Geen eerder bekende hoofdpijn. VG: polymyalgia rheumatica (2 jaar, nu prednison 5mg) + hypertensie (amlodipine 5mg). Geen maligniteit. Paracetamol max 2x/week. Moeder had migraine.',
			diagnoses: [
				{
					id: 'arteriitis',
					name: 'Arteriitis temporalis',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Kaakclaudicatie + leeftijd >50 + temporale pijn + PMR in VG = klassieke combinatie! PMR en arteriitis temporalis zijn manifestaties van dezelfde ziekte. Kaakclaudicatie is heel specifiek.',
				},
				{
					id: 'spanningshp',
					name: 'Spanningshoofdpijn',
					correctRank: 2,
					isRedFlag: false,
					explanation:
						'Nog mogelijk maar minder waarschijnlijk gezien het progressieve karakter en temporale lokalisatie.',
				},
				{
					id: 'bijwerking',
					name: 'Bijwerking amlodipine',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Ca-antagonisten kunnen hoofdpijn als bijwerking geven.',
				},
				{
					id: 'migraine',
					name: 'Migraine',
					correctRank: 4,
					isRedFlag: false,
					explanation:
						'Geen misselijkheid, geen fotofobie, geleidelijk toenemend i.p.v. aanvalsgewijs. Minder waarschijnlijk.',
				},
				{
					id: 'hersentumor',
					name: 'Hersentumor',
					correctRank: 5,
					isRedFlag: true,
					explanation:
						'Geen focale neurologische uitval, maar nog niet volledig uitgesloten bij progressieve klachten.',
				},
				{
					id: 'sab',
					name: 'SAB',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Geen acuut begin. Zeer onwaarschijnlijk bij geleidelijk progressief beloop.',
				},
				{
					id: 'meningitis',
					name: 'Meningitis',
					correctRank: 7,
					isRedFlag: false,
					explanation: 'Geen koorts, geen acuut begin. Zeer onwaarschijnlijk.',
				},
			],
		},
		{
			title: 'Na lichamelijk onderzoek',
			newInfo:
				'Temp 37,4°C. BD 148/88 mmHg. Pols 78/min regulair. Linker a. temporalis: licht gezwollen, kronkelig, drukpijnlijk, verhard, verminderde pulsatie. Rechts niet-afwijkend. Visus R 1,0 — L 0,8 (vorig jaar 1,0 beiderzijds). Gezichtsvelden niet afwijkend. Fundoscopie: links licht bleke papil. Pupilreacties normaal. Geen focale neurologische uitval. Patiënte had ook "wazig zien" L (als gordijn dat optrekt), hoofdhuidgevoeligheid, vermoeidheid, 2kg afgevallen.',
			diagnoses: [
				{
					id: 'arteriitis',
					name: 'Arteriitis temporalis',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Verharde, pijnlijke a. temporalis + verminderde pulsatie + visusdaling + bleke papil + kaakclaudicatie + PMR = vrijwel zeker. URGENT: start direct hoge dosis prednison, niet wachten op biopt!',
				},
				{
					id: 'spanningshp',
					name: 'Spanningshoofdpijn',
					correctRank: 2,
					isRedFlag: false,
					explanation: 'Past niet bij de LO-bevindingen (abnormale a. temporalis). Zeer onwaarschijnlijk.',
				},
				{
					id: 'migraine',
					name: 'Migraine',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Geen aanvalsgewijs patroon, geen begeleidende klachten. Zeer onwaarschijnlijk.',
				},
				{
					id: 'hersentumor',
					name: 'Hersentumor',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Geen focale uitval, geen papiloedeem. Onwaarschijnlijk.',
				},
			],
		},
	],
};
