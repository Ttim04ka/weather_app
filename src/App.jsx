import React from 'react';
import './App.scss';
import Weather from './Weather';

const App=React.memo(()=>{
  
  return (
  
      <div className="App">
        <Weather></Weather>
      </div>
   
  );
})

export default App;
