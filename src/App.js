import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import SampleCard from "./components/Card.js"

class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      name: "Weather mApp",

    }

  }
  
  renderCard() {
    return <SampleCard/>
  }
  
  
  
  
  render() {
    return (
      <div className="App center-all-col">
        {this.renderCard()}
      </div>
    )
  }
}

export default App;
