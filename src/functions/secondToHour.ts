import { toFixed } from './toFixed';

export function SecondToHour(seconds: number): string {
  const hours = toFixed(seconds / 3600);
  const min = toFixed((seconds / 60) % 60);
  const sec = toFixed((seconds % 60) % 60);
  return `${hours}h:${min}m:${sec}s`;
}
