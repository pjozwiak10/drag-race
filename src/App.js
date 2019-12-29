import React from 'react';
import './scss/App.scss';
import DragRace from './components/DragRace';
import InitialMenu from './components/InitialMenu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router basename="{process.env.PUBLIC_URL}">
      <Route path='/' exact component={InitialMenu} />
      <Route path='/game' component={DragRace} />
    </Router>
  );
}

export default App;
