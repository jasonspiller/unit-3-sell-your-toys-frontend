import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

export default class SearchContainer extends Component {
  render() {
    return (
			<Grid fluid={true} componentClass={'main'}>
			  <Row className="show-grid">
			    <Col xs={10} xsOffset={1}>
			      <h2>Search for Toys</h2>
			    </Col>
			  </Row>
			</Grid>
    );
  }
}
