import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Jumbotron, Button } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
			<Jumbotron>
				<h1>
					<span	className="dollar">$</span>ell Your Toys
				</h1>
				<p className="tagline">
					The Best BST Ever.
				</p>

				<Link to="/search"><Button bsStyle="primary" bsSize="large">Search</Button></Link>
				<Link to="/post"><Button bsStyle="primary" bsSize="large">Post</Button></Link>

			</Jumbotron>
    );
  }
}
