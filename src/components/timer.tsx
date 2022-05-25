import React from 'react';

import { SecondToMinutes } from '../functions/secondToMinutes';

interface Tprops {
  mainTime: number;
}

export default function Timer({ mainTime }: Tprops) {
  return (
    <>
      <div className="timer">{SecondToMinutes(mainTime)}</div>
    </>
  );
}
