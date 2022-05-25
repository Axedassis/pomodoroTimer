import React from 'react';

import PomodoroTimer from './components/pomodoroTimer';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        defaultPomodoroTimer={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  );
}

export default App;
