import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Object1 from './components/Object#1';
import Object2 from './components/object#2';
import Object3 from './components/Object#3';
import Object4 from './components/object#4';
import carrousel from './components/Carousel';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
      <Route path="/" exact component={carrousel} />
      <Route path="/login" component={Object1} />
      <Route path="/plots" component={Object2} />
      <Route path="/product" component={Object3} />
      <Route path="/crop" component={Object4} />
      </div>
    </Router>
  );
}
export default App;
