import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

export default class HomeContainer extends Component {
  render() {
    return (
			<Grid fluid={true} componentClass={'main'}>
			  <Row className="show-grid">
			    <Col xs={10} xsOffset={1}>
			      <h2>Ready to buy, sell or trade some toys?</h2>
						<p>Sell Your Toys is hands down the best way to do it. You can search for some toys. Post a toy for sale. Even reach out to someone if they want to trade.</p>
			    </Col>
			  </Row>
			</Grid>
    );
  }
}
