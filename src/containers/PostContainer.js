import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

export default class PostContainer extends Component {
  render() {
    return (
			<Grid fluid={true} componentClass={'main'}>
			  <Row className="show-grid">
			    <Col xs={10} xsOffset={1}>
			      <h2>Post a Toy</h2>
			    </Col>
			  </Row>
			</Grid>
    );
  }
}
