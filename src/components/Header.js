import React, { Component } from 'react';
import Menu from './Menu';
import Hero from './Hero'

export default class Header extends Component {
  render() {
    return (
			<header>
				<Menu />
				<Hero />
			</header>
    );
  }
}
