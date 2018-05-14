import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ItemSummary from '../components/item/ItemSummary';
import axios from 'axios';
import moment from 'moment';

export default class ItemsContainer extends Component {
	constructor() {
		super();
		this.state = {
			items: []
		};

		this.sortAndFormatData = this.sortAndFormatData.bind(this);
	}

	// sort by date and format date
	sortAndFormatData = (items) => {

		// sort newest first (add radix to avoid warnings)
		let arrSorted = items.sort( (item1, item2) => {
			return parseInt(item2.date, 10) - parseInt(item1.date, 10)
		})

		// format the date and time
		const formatTitle = (str) => {
			if(arrSorted[item].sold) {
				arrSorted[item].title = `<strong>SOLD</strong> ${arrSorted[item].title}`
			} else {
				arrSorted[item].title = `${arrSorted[item].title}`
			}
		}

		// format the date and time
		const formatTime = (str) => {
			let formattedDate = new Date();
			formattedDate.setTime(str);
			arrSorted[item].date = moment(formattedDate).format('lll');
		}

		// format description
		const formatDesc = (str) => {
			if(str.length > 175) {
				arrSorted[item].description = arrSorted[item].description.substr(0,140) + '...'
			}

		}

		// format price
		const formatPrice = (str) => {
			if(arrSorted[item].sold) {
				arrSorted[item].price = `$<s>${arrSorted[item].price}</s>`
			} else {
				arrSorted[item].price = `$${arrSorted[item].price}`
			}
		}

		for (var item in arrSorted) {
			formatTitle(arrSorted[item].title);
			formatTime(arrSorted[item].date);
			formatDesc(arrSorted[item].description);
			formatPrice(arrSorted[item].price);
		}

		this.setState({
			items: arrSorted
		});
	}

	componentDidMount() {
		axios.get('https://sellyourtoys.herokuapp.com/api/items').then( (results) => {
			console.log(results);
			this.sortAndFormatData(results.data);
		})
	}
  render() {

    return (
			<Grid fluid={true} componentClass={'main'}>
				<Row className="mb-15">
					<Col xs={10} xsOffset={1}>
						<h2>All Items</h2>
					</Col>
				</Row>
				<Row>
					<Col xs={10} xsOffset={1}>
						{ this.state.items.map( (item) => {
							return <ItemSummary
								key={ item._id }
								{ ... item } />
						}) }
					</Col>
				</Row>
			</Grid>
    );
  }
}
