import type { Case } from '../types.ts';

export const buikpijn: Case = {
	id: 'h33-acute-buikpijn',
	chapter: 'H33',
	title: 'Acute buikpijn',
	patient: {
		age: 28,
		sex: 'V',
		chiefComplaint: 'Sinds vanmiddag toenemende buikpijn, begonnen rond de navel, nu rechtsonder',
	},
	steps: [
		{
			title: 'Presentatie',
			newInfo:
				'Een 28-jarige vrouw komt op de huisartsenpost op zaterdagavond met sinds vanmiddag toenemende buikpijn. De pijn begon rond de navel en zit nu meer rechtsonder.',
			diagnoses: [
				{
					id: 'appendicitis',
					name: 'Acute appendicitis',
					correctRank: 1,
					isRedFlag: false,
					explanation: 'Klassieke pijnverschuiving van periumbilicaal naar rechter onderbuik (ROK).',
				},
				{
					id: 'eug',
					name: 'Extra-uteriene graviditeit (EUG)',
					correctRank: 2,
					isRedFlag: true,
					explanation: 'Vrouw in fertiele leeftijd: altijd overwegen! Kan levensbedreigend zijn bij ruptuur.',
				},
				{
					id: 'ovarium',
					name: 'Ovariumcyste/-torsie',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Acute onderbuikpijn bij jonge vrouw. Torsie is urgent.',
				},
				{
					id: 'pid',
					name: 'Pelvic inflammatory disease (PID)',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Salpingitis/endometritis. Vraag naar fluor en SOA-risico.',
				},
				{
					id: 'urolithiasis',
					name: 'Urolithiasis',
					correctRank: 5,
					isRedFlag: false,
					explanation: 'Kan flankpijn geven met uitstraling naar ROK/lies.',
				},
				{
					id: 'uwi',
					name: 'Urineweginfectie',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Veel voorkomend bij vrouwen. Vraag naar mictiekelachten.',
				},
				{
					id: 'gastro',
					name: 'Gastro-enteritis',
					correctRank: 7,
					isRedFlag: false,
					explanation: 'Frequent, maar meestal ook braken/diarree vroeg in het beloop.',
				},
				{
					id: 'diverticulitis',
					name: 'Diverticulitis',
					correctRank: 8,
					isRedFlag: false,
					explanation: 'Minder waarschijnlijk bij 28 jaar en typisch links (LOK), maar niet uitsluiten.',
				},
				{
					id: 'obstipatie',
					name: 'Obstipatie',
					correctRank: 9,
					isRedFlag: false,
					explanation: 'Veelvoorkomende oorzaak van buikpijn.',
				},
				{
					id: 'pds',
					name: 'PDS (prikkelbare darm)',
					correctRank: 10,
					isRedFlag: false,
					explanation: 'Meest voorkomende oorzaak van buikpijn in de huisartsenpraktijk, maar is uitsluitingsdiagnose.',
				},
			],
		},
		{
			title: 'Na anamnese',
			newInfo:
				'Pijn begon vanmiddag 14:00 als vaag, krampend rond de navel. Nu verschoven naar ROK: continu, scherp, erger bij bewegen. Ligt het liefst stil. Geen eetlust, eenmaal gebraakt. Geen diarree, vanmorgen normale ontlasting. Geen mictiekelachten. LM 3 weken geleden (normaal, op tijd). Seksueel actief, orale anticonceptie, vaste partner. Geen abnormale fluor. Temperatuur 37,8 °C. Geen eerdere buikoperaties.',
			diagnoses: [
				{
					id: 'appendicitis',
					name: 'Acute appendicitis',
					correctRank: 1,
					isRedFlag: false,
					explanation:
						'Klassieke pijnverschuiving (periumbilicaal naar ROK) + continu + scherp + erger bij bewegen + anorexie + braken + 37,8°C = sterk verdacht voor appendicitis.',
				},
				{
					id: 'eug',
					name: 'Extra-uteriene graviditeit (EUG)',
					correctRank: 2,
					isRedFlag: true,
					explanation:
						'Menstruatie 3 weken geleden, op tijd, gebruikt OAC. Daalt, maar OAC is niet 100% betrouwbaar. Zwangerschapstest blijft geïndiceerd!',
				},
				{
					id: 'ovarium',
					name: 'Ovariumtorsie',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'Nog mogelijk, maar pijnpatroon past meer bij appendicitis (verschuiving van boven naar ROK).',
				},
				{
					id: 'pid',
					name: 'PID',
					correctRank: 4,
					isRedFlag: false,
					explanation:
						'Geen abnormale fluor, geen tussentijds bloedverlies, vaste partner. PID geeft meer diffuse onderbuikpijn beiderzijds.',
				},
				{
					id: 'gastro',
					name: 'Gastro-enteritis',
					correctRank: 5,
					isRedFlag: false,
					explanation:
						'Geen diarree, braken kwam NA de pijn (bij gastro-enteritis verwacht je braken vóór of gelijktijdig).',
				},
				{
					id: 'urolithiasis',
					name: 'Urolithiasis',
					correctRank: 6,
					isRedFlag: false,
					explanation: 'Geen koliekpijn, geen bewegingsdrang, geen flankpijn, geen mictiekelachten.',
				},
				{
					id: 'obstipatie',
					name: 'Obstipatie',
					correctRank: 7,
					isRedFlag: false,
					explanation: 'Vanmorgen nog normale ontlasting.',
				},
			],
		},
		{
			title: 'Na lichamelijk onderzoek',
			newInfo:
				'Ziek ogende vrouw, ligt stil, vermijdt bewegingen. Pols 96/min, BD 118/72, temp 38,1°C rectaal. Verminderde adembewegingen rechts buikwand. Hoestpijn ROK. Verminderde peristaltiek. Percussiepijn ROK. Drukpijn McBurney, défense musculaire ROK. Psoasfenomeen positief rechts. Geen liesbreuk. Geen slagpijn nierloges. VT: geen slingerpijn, geen zwellingen, geen fluor. Zwangerschapstest: NEGATIEF.',
			diagnoses: [
				{
					id: 'appendicitis',
					name: 'Acute appendicitis',
					correctRank: 1,
					isRedFlag: false,
					explanation:
						'McBurney drukpijn + défense + psoasfenomeen + pijnverschuiving + koorts + anorexie + braken = klassiek beeld. Spoedverwijzing chirurg.',
				},
				{
					id: 'eug',
					name: 'EUG',
					correctRank: 2,
					isRedFlag: false,
					explanation: 'Zwangerschapstest negatief. Nagenoeg uitgesloten.',
				},
				{
					id: 'ovarium',
					name: 'Ovariumtorsie/-cyste',
					correctRank: 3,
					isRedFlag: false,
					explanation: 'VT normaal, geen pijnlijke zwelling naast uterus.',
				},
				{
					id: 'pid',
					name: 'PID',
					correctRank: 4,
					isRedFlag: false,
					explanation: 'Geen slingerpijn, geen fluor, VT normaal.',
				},
				{
					id: 'pyelonefritis',
					name: 'Pyelonefritis',
					correctRank: 5,
					isRedFlag: false,
					explanation: 'Geen slagpijn nierloges, geen mictiekelachten.',
				},
			],
		},
	],
};
