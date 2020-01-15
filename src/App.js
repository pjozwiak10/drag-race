import React from 'react';
import './scss/App.scss';
import DragRace from './components/DragRace';
import InitialMenu from './components/InitialMenu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path='/drag-race' exact component={InitialMenu} />
      <Route path='/drag-race/game' component={DragRace} />
    </Router>
  );
}

export default App;
