import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
			<header>
				<h1>
					$ell Your Toys
					<br />
					<span className="tagline">Best BST Ever</span>
				</h1>
			</header>
    );
  }
}

export default Header;
