import React, { Component } from 'react';
import { Grid, Row, Col, HelpBlock, FormGroup, FormControl, Button } from 'react-bootstrap';
import ItemSummary from '../components/item/ItemSummary';
import axios from 'axios';
import moment from 'moment';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			items: []
		};
		this.formatData = this.formatData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	// sort by date and format date
	formatData = (items) => {

		// format the date and time
		const formatTitle = (str) => {
			if(items[item].sold) {
				items[item].title = `<strong>SOLD</strong> ${items[item].title}`
			} else {
				items[item].title = `${items[item].title}`
			}
		}

		// format the date and time
		const formatTime = (str) => {
			let formattedDate = new Date();
			formattedDate.setTime(str);
			items[item].date = moment(formattedDate).format('lll');
		}

		// format description
		const formatDesc = (str) => {
			if(str.length > 140) {
				items[item].description = items[item].description.substr(0,140) + '...'
			}

		}

		// format price
		const formatPrice = (str) => {
			if(items[item].sold) {
				items[item].price = `$<s>${items[item].price}</s>`
			} else {
				items[item].price = `$${items[item].price}`
			}
		}

		for (var item in items) {
			formatTitle(items[item].title);
			formatTime(items[item].date);
			formatDesc(items[item].description);
			formatPrice(items[item].price);
		}

		this.setState({
			items: items
		});
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	getSearchValidationState() {
		const length = this.state.search.length;
		if (length > 0) return 'success';
		else if (length > 0) return 'error';
		return null;
	}

	validateForm() {
		console.log(`${this.state.search.length}`);
		if(this.state.search.length > 0) {
			return true;
		}
	}

	handleSubmit = async e => {
		e.preventDefault();

		console.log(this.state.search);

		axios.post(`https://sellyourtoys.herokuapp.com/api/items/search/${this.state.search}`, {}).then( (results) => {
			//console.log(result);
			this.formatData(results.data.results);

			console.log(this.state.items);
		})
	}

  render() {
    return (
			<Grid fluid={true}>
				<Row className="mb-15">
					<Col>
						<form onSubmit={this.handleSubmit} className="Search">
							<FormGroup bsSize="large" controlId="search" validationState={this.getSearchValidationState()}>
								<FormControl
									type="text"
									value={this.state.seach}
									name="title"
									onChange={this.handleChange}
									required
								/>
								<FormControl.Feedback />
								<HelpBlock>(Exclude a term - ex. -term. Exact phrase - ex. "exact phrase". One term or another - ex. term OR another.)</HelpBlock>
							</FormGroup>
							<Button
								type="submit"
								bsSize="large"
								bsStyle="primary"
								disabled={!this.validateForm()}
							>Search</Button>
						</form>
					</Col>
				</Row>
				<Row className="mb-15">
					<Col>
						<h2>Search Results</h2>
					</Col>
				</Row>
				<Row>
					<Col>
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
