import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
			<header>
				<Jumbotron>
					<h1>$ell Your Toys</h1>
					<p className="tagline">The Best BST Ever.</p>
				</Jumbotron>
			</header>
    );
  }
}

export default Header;
