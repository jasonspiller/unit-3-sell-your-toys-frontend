import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
			<Navbar inverse collapseOnSelect className="squared">
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="/"><span className="dollar">$</span>ell Your Toys</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav pullRight>
			      <NavItem eventKey={1} href="#">
			        Home
			      </NavItem>
			      <NavItem eventKey={2} href="#">
			        Search
			      </NavItem>
						<NavItem eventKey={3} href="#">
							Post
						</NavItem>
						<NavItem eventKey={4} href="#">
			        All Items
			      </NavItem>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
    );
  }
}
