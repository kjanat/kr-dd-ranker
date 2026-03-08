import type { Case } from '../types.ts';

export const verwardheid: Case = {
	id: 'h69-verwardheid',
	chapter: 'H69-70',
	title: 'Verwardheid en vergeetachtigheid',
	patient: {
		age: 79,
		sex: 'M',
		chiefComplaint:
			'Twee nachten onrustig, door huis gedwaald, riep dat er "mensen in de tuin stonden." Overdag suf.',
	},
	steps: [
		{
			title: 'Presentatie',
			newInfo:
				'Een 79-jarige man wordt door zijn dochter naar de huisarts gebracht. Ze is erg geschrokken omdat haar vader de afgelopen twee nachten erg onrustig was, door het huis dwaalde en riep dat er "mensen in de tuin stonden". Overdag lijkt hij suf en is hij moeilijk aanspreekbaar.',
			diagnoses: [
				{
					id: 'delier',
					name: 'Delier',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Meest urgent! Acuut ontstaan + nachtelijke onrust + visuele hallucinaties + wisselend bewustzijn = klassiek delierbeeld. Somatische urgentie!',
				},
				{
					id: 'dementie',
					name: 'Dementie met gedragsproblemen',
					correctRank: 2,
					isRedFlag: false,
					explanation:
						'Op deze leeftijd frequent. Nachtelijke onrust en hallucinaties kunnen ook bij gevorderde dementie (bijv. Lewy-body) voorkomen.',
				},
				{
					id: 'delier-dementie',
					name: 'Delier bij onderliggende dementie',
					correctRank: 3,
					isRedFlag: true,
					explanation:
						'Dementie is de belangrijkste predisponerende factor voor delier. Vaak een combinatie.',
				},
				{
					id: 'depressie-psychose',
					name: 'Depressie met psychotische kenmerken',
					correctRank: 4,
					isRedFlag: false,
					explanation:
						'Ouderen kunnen psychotisch worden bij ernstige depressie. Vraag naar stemming.',
				},
				{
					id: 'intoxicatie',
					name: 'Middelenintoxicatie/-onthouding',
					correctRank: 5,
					isRedFlag: false,
					explanation:
						'Alcoholonthouding of medicatiebijwerking. Vraag naar middelen en recente wijzigingen.',
				},
				{
					id: 'psychose',
					name: 'Psychose (laat-onset)',
					correctRank: 6,
					isRedFlag: false,
					explanation:
						'Minder waarschijnlijk als eerste presentatie op 79 jaar. Visuele hallucinaties passen meer bij delier dan functionele psychose.',
				},
			],
		},
		{
			title: 'Na anamnese',
			newInfo:
				'Verwardheid bestaat 2 dagen. Daarvóór: maanden "wat vergeetachtiger" (vergat afspraken, moeite met nieuwe tv). Maar was helder, kon zichzelf redden. Nu: herkende dochter even niet, \'s nachts zeer onrustig, zag "mensen," overdag suf en nauwelijks aanspreekbaar. Medicatie: metoprolol 50mg, enalapril 10mg, en sinds 5 DAGEN oxycodon 10mg voor rugpijn (door waarnemer). Soms paracetamol. 1-2 glazen wijn/dag. VG: hypertensie, osteoartrose. Geen psychiatrische VG.',
			diagnoses: [
				{
					id: 'delier-opiaat',
					name: 'Delier (door oxycodon)',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Acuut (2 dagen) + fluctuerend bewustzijn + visuele hallucinaties + oxycodon 5 dagen geleden gestart = klassiek "weinig trigger bij veel predispositie" model.',
				},
				{
					id: 'delier-dementie',
					name: 'Delier bij onderliggende dementie',
					correctRank: 2,
					isRedFlag: true,
					explanation:
						'Maandenlange vergeetachtigheid = predisponerende factor. Dementie + opiaat = hoog risico delier.',
				},
				{
					id: 'delier-infectie',
					name: 'Delier door infectie',
					correctRank: 3,
					isRedFlag: true,
					explanation:
						'Niet uitgesloten. UWI en pneumonie zijn frequente uitlokkers bij ouderen.',
				},
				{
					id: 'dementie',
					name: 'Onderliggende dementie (MCI)',
					correctRank: 4,
					isRedFlag: false,
					explanation:
						'Maanden vergeetachtig wijst op pre-existente problemen. Maar: diagnose dementie niet stellen tijdens delier!',
				},
				{
					id: 'alcohol-onthouding',
					name: 'Alcoholonthouding',
					correctRank: 5,
					isRedFlag: false,
					explanation:
						'1-2 glazen/dag is matig. Maar: bij bedlegerigheid kan ongewild onthouding optreden.',
				},
				{
					id: 'psychose',
					name: 'Psychose',
					correctRank: 6,
					isRedFlag: false,
					explanation:
						'Geen psychiatrische VG, visuele hallucinaties passen meer bij delier dan bij functionele psychose.',
				},
				{
					id: 'depressie',
					name: 'Depressie met psychotische kenmerken',
					correctRank: 7,
					isRedFlag: false,
					explanation: 'Geen aanwijzingen voor somberheid of stemmingsklachten.',
				},
			],
		},
		{
			title: 'Na lichamelijk onderzoek',
			newInfo:
				'Magere, verwarde, matig gedehydreerde man. Suf maar wekbaar, periodes van onrust. Temp 37,2°C, pols 96/min, BD 105/65 liggend. Pupillen: beiderzijds NAUW (miotisch!), traag reagerend. Geen lateralisatie, geen meningeale prikkeling, geen parkinsonverschijnselen. Thorax: geen afwijkingen. Abdomen: opgezet, verminderde peristaltiek, drukpijn onderbuik. BLAAS STAAT HOOG (percutoir tot boven navel). Geen défense. Verminderde turgor, droge slijmvliezen. Al 4 dagen geen ontlasting, nauwelijks gegeten/gedronken.',
			diagnoses: [
				{
					id: 'delier-multifactorieel',
					name: 'Delier, multifactorieel',
					correctRank: 1,
					isRedFlag: true,
					explanation:
						'Miotische pupillen bevestigen opiaat-effect. Uitlokkende factoren: oxycodon + urineretentie + obstipatie + dehydratie. Predisponerend: hoge leeftijd + cognitieve problemen. STAP 1: oxycodon staken!',
				},
				{
					id: 'dementie-onderliggend',
					name: 'Onderliggende MCI/dementie',
					correctRank: 2,
					isRedFlag: false,
					explanation:
						'Vergeetachtigheid van vóór het delier wijst hierop. Pas na herstel evalueren met MMSE/MoCA.',
				},
				{
					id: 'uwi',
					name: 'UWI als bijkomende oorzaak',
					correctRank: 3,
					isRedFlag: false,
					explanation:
						'Bij urineretentie is UWI mogelijk. Urine testen. Ouderen kunnen afebriel zijn bij infectie.',
				},
			],
		},
	],
};
