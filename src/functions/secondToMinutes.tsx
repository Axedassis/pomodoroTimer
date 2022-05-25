import { toFixed } from './toFixed';

export function SecondToMinutes(seconds: number): string {
  const min = toFixed((seconds / 60) % 60);
  const sec = toFixed((seconds % 60) % 60);
  return `${min}:${sec}`;
}

/*
.padStart = basicamente fala que se o número não tiver no minimo duas casas
decimais ou a quantidade de casas decimais que definimos iremos colocar tal coisa
no nosso caso iremos colocar  a strin '0'
*/
