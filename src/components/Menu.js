import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

export default class Menu extends Component {
  render() {
    return (
			<Navbar inverse collapseOnSelect className="squared">
			  <Navbar.Header>
					<IndexLinkContainer to="/">
			    	<Navbar.Brand>
			      	<span className="dollar">$</span>ell Your Toys
			    	</Navbar.Brand>
					</IndexLinkContainer>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav pullRight>
						<IndexLinkContainer to="/">
			      	<NavItem eventKey={1}>Home</NavItem>
						</IndexLinkContainer>
						<LinkContainer to="/search">
			      	<NavItem eventKey={2}>Search</NavItem>
						</LinkContainer>
						<LinkContainer to="/post">
			      	<NavItem eventKey={3}>Post</NavItem>
						</LinkContainer>
						<LinkContainer to="/items">
			      	<NavItem eventKey={4}>All Items</NavItem>
						</LinkContainer>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
    );
  }
}
