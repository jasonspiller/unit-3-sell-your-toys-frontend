import React, { Component } from 'react';
import Header from './components/Header';
import Routes from "./Routes";
import Footer from './components/Footer';
import axios from 'axios';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			items: []
		};
	}

	componentWillMount() {
		axios.get('/api/items').then( (results) => {
			console.log(results);

			this.setState({
				items: results.data
			});
		})
	}

  render() {
    return (
      <div className="App">
        <Header />
				<Routes />
				<ul>
					{ this.state.items.map( (item) => {
            return `<li>${item.title}</li>`
          }) }
				</ul>
				<Footer />
      </div>
    );
  }
}
