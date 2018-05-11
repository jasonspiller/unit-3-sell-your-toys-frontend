import React, { Component } from 'react';
import Header from './components/Header';
import Routes from "./Routes";
import Footer from './components/Footer';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
				<Routes />
				<Footer />
      </div>
    );
  }
}
