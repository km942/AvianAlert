// src/App.jsx
import React from 'react';
import DataFlowSimulation from './DataFlowSimulation';
import './index.css';
import JobBoardsToJoblinkFlow from './Boardlink';



function App() {
  return (
    <div className="App">
      <DataFlowSimulation />
      <JobBoardsToJoblinkFlow/>
    </div>
  );
}

export default App;
