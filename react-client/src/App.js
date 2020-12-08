import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import MainPage from './components/pages/MainPage';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  
  render() {
    console.log("Hello browser");

    return (
      <div>
        <MainPage count= {0}/>
      </div>
    );
  }
}

export default App;