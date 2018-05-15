import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Search from '../components/Search';

export default class SearchContainer extends Component {
  render() {
    return (
			<Grid fluid={true} componentClass={'main'}>
			  <Row>
			    <Col xs={10} xsOffset={1}>
			      <h2>Search for Toys</h2>
			    </Col>
			  </Row>
				<Row className="mb-15">
					<Col xs={10} xsOffset={1}>
						<Search />
					</Col>
			  </Row>
			</Grid>
    );
  }
}
