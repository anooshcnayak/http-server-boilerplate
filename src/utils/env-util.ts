export function env(property: string): string {
  return process.env[property] || '';
}

export function envNumber(property: string): number {
  return parseInt(process.env[property] || '-1');
}

export function envBoolean(property: string): boolean {
  return process.env[property] === 'true';
}

