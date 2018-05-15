import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class ItemDetail extends Component {
  render() {
    return (
			<Grid fluid={ true } className="ItemDetail">
				<Row className="mb-15">
					<Col>
						<h2 dangerouslySetInnerHTML={{__html: this.props.title }}></h2>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<a href={ this.props.image } target="_blank">
							<img src={ this.props.image } alt={ this.props.title } />
						</a>
					</Col>
					<Col md={6}>
						<h2 className={"mb-15 price"} dangerouslySetInnerHTML={{__html:  this.props.price }}></h2>
						<p>{ this.props.description }</p>
						<p>Condition: <strong>{ this.props.condition }</strong></p>
						<p>Posted: <strong>{ this.props.date }</strong></p>
						<p>Zip: <strong>{ this.props.zip }</strong></p>
						<p>Email: <strong><a href={`mailto:${this.props.email}`}>{ this.props.email }</a></strong></p>
					</Col>
				</Row>
			</Grid>
    );
  }
}
