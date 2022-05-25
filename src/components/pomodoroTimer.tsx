import React, { useState, useEffect, useCallback } from 'react';

import Button from './button';
import Timer from './timer';

import { useInterval } from '../hooks/useInterval';
import { SecondToMinutes } from '../functions/secondToMinutes';
import { SecondToHour } from '../functions/secondToHour';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Tprops {
  defaultPomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export default function PomodoroTimer({
  defaultPomodoroTimer,
  shortRestTime,
  longRestTime,
  cycles,
}: Tprops) {
  const [mainTime, setMainTime] = useState(defaultPomodoroTimer);
  const [interval, setInterval] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyles, setCyles] = useState(new Array(cycles - 1).fill(true));
  const [completedCyles, setCompletedCyles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    interval ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setInterval(true);
    setWorking(true);
    setResting(false);
    setMainTime(defaultPomodoroTimer);
    audioStartWorking.play();
  }, [setInterval, setWorking, setResting, setMainTime, defaultPomodoroTimer]);

  const configureRest = useCallback(
    (longRest: boolean) => {
      setInterval(true);
      setWorking(false);
      setResting(true);
      audioStopWorking.play();

      if (longRest) {
        setMainTime(longRestTime);
      } else {
        setMainTime(shortRestTime);
      }
    },
    [setInterval, setWorking, setResting, setMainTime, longRestTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyles.length > 0) {
      configureRest(false);
      cyles.pop();
    } else if (working && cyles.length <= 0) {
      configureRest(true);
      setCyles(new Array(cycles - 1).fill(true));
      setCompletedCyles(completedCyles + 1);
    }
    if (working) setNumberOfPomodoro(numberOfPomodoro + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cyles,
    numberOfPomodoro,
    setNumberOfPomodoro,
    cycles,
    completedCyles,
    setCyles,
    configureWork,
    configureRest,
  ]);

  return (
    <>
      <div className="pomodoro">
        <h2>You are: {working ? 'Working' : 'Rest'}</h2>
        <Timer mainTime={mainTime} />
        <div className="buttons-container">
          <Button
            text="Work"
            className="teste"
            IonClick={() => configureWork()}
          />
          <Button
            text="Rest"
            className="teste"
            IonClick={() => configureRest(false)}
          />
          <Button
            text={interval ? 'Stop' : 'Start'}
            className={!working && !resting ? 'hidden' : ''}
            IonClick={() => {
              setInterval(!interval);
              setWorking(!working);
            }}
          />
        </div>

        <div className="details">
          <p>Ciclos Concluidos: {completedCyles}</p>
          <p>Tempo focado: {SecondToHour(fullWorkingTime)}</p>
          <p>Pomodoros Concluidos: {numberOfPomodoro}</p>
        </div>
      </div>
    </>
  );
}
