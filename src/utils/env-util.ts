export function env(property: string): string {
	return process.env[property] || '';
}

export function envNumber(property: string): number {
	return Number.parseInt(process.env[property] || '-1', 10);
}

export function envBoolean(property: string): boolean {
	return process.env[property] === 'true';
}
