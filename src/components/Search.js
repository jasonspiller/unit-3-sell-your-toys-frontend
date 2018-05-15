import React, { Component } from 'react';
import { Grid, Row, Col, HelpBlock, FormGroup, FormControl, ControlLabel, InputGroup, Checkbox, Button } from 'react-bootstrap';
import ItemSummary from '../components/item/ItemSummary';
import axios from 'axios';
import moment from 'moment';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			items: [],
			searchTitle: '',
			maxPrice: '',
			condition: '',
			hideSold: false

		};
		this.filterData = this.filterData.bind(this);
		this.formatData = this.formatData.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	// apply search filters
	filterData = (items) => {

		console.log(`${this.state.maxPrice} ${this.state.condition}`);

		// loop through search results
		for (var item in items) {


			// check if under max Price
			if (this.state.maxPrice !== '' && this.state.maxPrice < items[item].price) {
				items.splice(item, 1);
			}

			// check for Condition
			if (this.state.condition === 'New' && items[item].condition === 'Used' ) {
				items.splice(item, 1);
			} else if (this.state.condition === 'Used' && items[item].condition === 'New' ) {
				items.splice(item, 1);
			}

			// check if sold
			if (this.state.hideSold && items[item].sold === true) {
				console.log('true');
				items.splice(item, 1);
			}
		}
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

	handleChangeCheckbox = e => {
		this.setState({
			[e.target.id]: e.target.checked
		});
	}

	getSearchValidationState() {
		const length = this.state.search.length;
		if (length > 0) return 'success';
		else if (length > 0) return 'error';
		return null;
	}

	validateForm() {
		if(this.state.search.length > 0) {
			return true;
		}
	}

	handleSubmit = async e => {
		e.preventDefault();

		axios.post(`https://sellyourtoys.herokuapp.com/api/items/search/${this.state.search}`, {})
			.then( (results) => {

				this.setState({
					items: results.data.results
				})

				this.filterData(this.state.items);
				this.formatData(this.state.items);

				if(this.state.items.length > 0) {
					this.setState({
						searchTitle: `Results for "${this.state.search}"`
					})
				} else {
					this.setState({
						searchTitle: `Sorry, your search for "${this.state.search}" did not return any results. Try again, it's free :)`
					})
				}
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
							<Grid fluid={true} className="no-padding">
								<Row>
									<Col sm={4}>
										<FormGroup bsSize="large" controlId="maxPrice">
											<ControlLabel>Maxium Price</ControlLabel>
											<InputGroup>
												<InputGroup.Addon>$</InputGroup.Addon>
												<FormControl
													type="number"
													value={this.state.maxPrice}
													name="maxPrice"
													onChange={this.handleChange}
												/>
											</InputGroup>
											<FormControl.Feedback />
										</FormGroup>
									</Col>
									<Col sm={4}>
										<FormGroup controlId="condition">
											<ControlLabel>Condition <span className="help">(new or used)</span></ControlLabel>
											<FormControl
												componentClass="select"
												placeholder="select"
												name="condition"
												bsSize="large"
												value={this.state.condition}
												onChange={this.handleChange}
											>
												<option value="select">Please Select</option>
												<option value="New">New</option>
												<option value="Used">Used</option>
											</FormControl>
											<FormControl.Feedback />
										</FormGroup>
									</Col>
									<Col sm={4}>
										<FormGroup bsSize="large" controlId="hideSold">
											<ControlLabel>Hide Sold</ControlLabel>
											<Checkbox
												id="hideSold"
												checked={this.state.hideSold}
												onChange={this.handleChangeCheckbox}
											>
											</Checkbox>
											<FormControl.Feedback />
										</FormGroup>
									</Col>
								</Row>
							</Grid>
							<Button
								type="submit"
								bsSize="large"
								bsStyle="primary"
								disabled={!this.validateForm()}
							>Search</Button>
						</form>
					</Col>
				</Row>
				<Row className="mt-30 mb-15">
					<Col>
						<h2>{this.state.searchTitle}</h2>
					</Col>
				</Row>
				<Row className="mt-30">
					<Col>
						{ this.state.items.map( (item) => {
							return <ItemSummary
								key={ item._id }
								{ ... item } />
							})
						}
					</Col>
				</Row>
			</Grid>
    );
  }
}
