import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Item extends Component {

  render() {
    return (
			<Grid fluid={true}>
				<Row className={ "ItemSummary mb-15" }>
					<Col md={2} sm={3} className="image">
						<Link to={ `/items/${this.props._id}` }>
							<img src={ this.props.image } alt={ this.props.title } />
						</Link>
					</Col>
					<Col md={9} sm={8} >
						<Link to={ `/items/${this.props._id}` }>
							<h2 dangerouslySetInnerHTML={{__html: this.props.title }}></h2>
						</Link>
						<p>{ this.props.date }</p>
						<p>{ this.props.description }</p>
					</Col>
					<Col sm={1}>
						<h2 className="price" dangerouslySetInnerHTML={{__html: this.props.price }}></h2>
					</Col>
				</Row>
			</Grid>
    );
  }
}
