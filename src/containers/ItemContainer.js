import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ItemDetail from '../components/item/ItemDetail';
import axios from 'axios';
import moment from 'moment';

export default class ItemContainer extends Component {
  constructor() {
    super();
    this.state = {
			item: {}
    };

		this.getCurrentItemId = this.getCurrentItemId.bind(this);
		this.formatData = this.formatData.bind(this);
  }

	getCurrentItemId = () => {
		return this.props.location.pathname.split('/')[2];
	}

	// format data
	formatData = (item) => {

		// add SOLD to the beginning and end of the title if sold
		const formatTitle = () => {
			if (item.sold) {
				item.title = {__html: `<strong>SOLD</strong> ${item.title}`};
			} else {
				item.title = {__html: `${item.title}`};
			}
		}

		// format the date and time
		const formatDate = () => {
			let formattedDate = new Date();
			formattedDate.setTime(item.date);
			item.date = moment(formattedDate).format('lll');
		}

		// strike through price if sold
		const formatPrice = () => {
			let formattedPrice;
			if (item.sold) {
				formattedPrice = {__html: `$<s>${item.price}</s>`};
			} else {
				formattedPrice = {__html: `$${item.price}`};
			}
			item.price = formattedPrice;
		}

		formatTitle();
		formatDate();
		formatPrice();

		this.setState({
			item: item
		});
	}

	componentDidMount() {
		let itemId = this.getCurrentItemId();
		axios.get(`https://sellyourtoys.herokuapp.com/api/items/${itemId}`).then( (result) => {
			console.log(result);
			this.formatData(result.data);
		})
	}

  render() {

    return (
			<Grid fluid={true} componentClass={'main'}>
				<Row>
					<Col xs={10} xsOffset={1}>
						<ItemDetail { ...this.state.item } />
					</Col>
				</Row>
			</Grid>
    );
  }
}
