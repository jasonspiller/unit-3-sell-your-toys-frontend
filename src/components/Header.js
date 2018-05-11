import React, { Component } from 'react';
import Menu from './Menu'
import { Jumbotron, Button } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
			<header>
				<Menu />
				<Jumbotron>
					<h1>
						<span	className="dollar">$</span>ell Your Toys
					</h1>
					<p className="tagline">
						The Best BST Ever.
					</p>

					<Button bsStyle="primary">Search</Button>
					<Button bsStyle="primary">Post</Button>

				</Jumbotron>
			</header>
    );
  }
}
