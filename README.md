# DD Ranker

Je krijgt een patiënt. Leeftijd, geslacht, klacht — meer niet.

Sleep de diagnoses in de juiste volgorde: meest waarschijnlijk bovenaan,
minst waarschijnlijk onderaan.

Maar pas op: je moet ook de **gevaarlijke** diagnoses markeren die je niet mag
missen, ook al zijn ze niet de meest waarschijnlijke.

## Hoe het werkt

1. Een casus verschijnt: *"Vrouw, 32, hartkloppingen"*
2. Je ziet een lijst van ~8-10 mogelijke diagnoses (shuffled)
3. Drag & drop ze in de juiste volgorde van waarschijnlijkheid
4. Flag de alarmsignaal-diagnoses met 🚩
5. Bevestig — en je krijgt directe feedback:
   - ✅ Goed geplaatst
   - 🔻 Te hoog ingeschat
   - 🔺 Te laag ingeschat
   - 💀 Alarmsignaal gemist

## Extra info per stap

Na je ranking krijg je anamnese-info. Nieuwe feiten veranderen de
waarschijnlijkheden. Herorden je DD opnieuw.

Net als op het echte examen: je DD evolueert met elke stap.

## Scoring

- **Ranking score**: hoe dicht zit je bij de ideale volgorde? ([Kendall tau] afstand)
- **Red flag score**: heb je alle urgente diagnoses gemarkeerd?
- **Combo**: snelheid × correctheid

## Waarom dit helpt

Je leert niet alleen *welke* diagnoses bij een klacht horen, maar ook hoe ze
zich tot elkaar verhouden.

Een appendicitis bij een 28-jarige vrouw staat op een heel andere plek dan bij
een 70-jarige man — en dat verschil moet je voelen, niet stampen.

[Kendall tau]: https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient
