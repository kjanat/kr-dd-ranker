import type { Case } from '../types.ts';
import { buikpijn } from './buikpijn.ts';
import { enkeloedeem } from './enkeloedeem.ts';
import { hartkloppingen } from './hartkloppingen.ts';
import { hoofdpijn } from './hoofdpijn.ts';
import { verwardheid } from './verwardheid.ts';

export const allCases: readonly Case[] = [
	hartkloppingen,
	buikpijn,
	hoofdpijn,
	enkeloedeem,
	verwardheid,
];

export function getCaseById(id: string): Case | undefined {
	return allCases.find((c) => c.id === id);
}
