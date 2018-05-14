import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, InputGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class UpdateContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: '',
			title: '',
			price: '',
			condition: '',
			zip: '',
			email: '',
			image: '',
			description: '',
			sold: false
		};

		this.state.id = this.props.location.pathname.split('/')[2];

		axios.get(`https://sellyourtoys.herokuapp.com/api/items/${ this.state.id }`).then( (result) => {

			this.setState ({
				title: result.data.title,
				price: result.data.price.toString(),
				condition: result.data.condition,
				zip: result.data.zip.toString(),
				email: result.data.email,
				image: result.data.image,
				description: result.data.description,
				sold: result.data.sold
			});
		})

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.validateForm = this.validateForm.bind(this);
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

	getTitleValidationState() {
		const length = this.state.title.length;
		if (length > 0 && length <= 80) return 'success';
		else if (length > 0) return 'error';
		return null;
	}

	getPriceValidationState() {
		const length = this.state.price.length;
		if (length > 0) return 'success';
		else if (length > 0) return 'error';
		return null;
	}

	getConditionValidationState() {
		const length = this.state.condition.length;
		if (length > 0 && length < 6) return 'success';
		else if (length > 0 || length === 6) return 'error';
		return null;
	}

	getZipValidationState() {
		const length = this.state.zip.length;
		if (length === 5) return 'success';
		else if (length > 0) return 'error';
		return null;
	}

	getEmailValidationState() {
		const length = this.state.email.length;
		if (length > 0) return 'success';
		else if (length > 0) return 'error';
		return null;
	}

	validateForm() {
		if(
			this.state.title.length > 0 &&
			this.state.price.length > 0 &&
			this.state.condition.length > 0 &&
			this.state.condition.length !== 6 &&
			this.state.zip.length > 0 &&
			this.state.email.length > 0
		) return true;
  }

	handleSubmit = async e => {
		e.preventDefault();

		let formData = {
			title: this.state.title,
			price: this.state.price,
			condition: this.state.condition,
			zip: this.state.zip,
			email: this.state.email,
			image: this.state.image,
			description: this.state.description,
			sold: document.getElementById('sold').checked
		}

		console.log(formData);

		axios.put(`https://sellyourtoys.herokuapp.com/api/items/${ this.state.id }`, formData).then( (result) => {

			console.log(result);

     	this.props.history.push(`/items/${ this.state.id }`);
		})
	}


	render() {
		return (
			<Grid fluid={true} componentClass={'main'} className="PostContainer">
				<Row className="mb-15">
					<Col xs={10} xsOffset={1}>
						<h2>Update a Toy</h2>
					</Col>
				</Row>
				<Row className="mb-15">
					<Col xs={10} xsOffset={1}>
						<form onSubmit={this.handleSubmit}>
							<FormGroup bsSize="large" controlId="title" validationState={this.getTitleValidationState()}>
								<ControlLabel>Title <span className="help">(80 characters max.)</span></ControlLabel>
								<FormControl
									type="text"
									value={this.state.title}
									name="title"
									onChange={this.handleChange}
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							<Grid fluid={true} className="no-padding">
								<Row>
									<Col sm={4}>
										<FormGroup bsSize="large" controlId="price" validationState={this.getPriceValidationState()}>
											<ControlLabel>Price <span className="help">(no decimals)</span></ControlLabel>
											<InputGroup>
												<InputGroup.Addon>$</InputGroup.Addon>
												<FormControl
													type="number"
													value={this.state.price}
													name="price"
													onChange={this.handleChange}
													required
												/>
											</InputGroup>
											<FormControl.Feedback />
										</FormGroup>
									</Col>
									<Col sm={4}>
										<FormGroup controlId="condition" validationState={this.getConditionValidationState()}>
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
												<option value="new">New</option>
												<option value="used">Used</option>
											</FormControl>
											<FormControl.Feedback />
										</FormGroup>
									</Col>
									<Col sm={4}>
										<FormGroup bsSize="large" controlId="zip" validationState={this.getZipValidationState()}>
											<ControlLabel>Zip Code <span className="help">(5 digits only)</span></ControlLabel>
											<FormControl
												type="number"
												value={this.state.zip}
												name="zip"
												onChange={this.handleChange}
												required
											/>
											<FormControl.Feedback />
										</FormGroup>
									</Col>
								</Row>
							</Grid>
							<FormGroup bsSize="large" controlId="email" validationState={this.getEmailValidationState()}>
								<ControlLabel>Email</ControlLabel>
								<FormControl
									type="email"
									value={this.state.email}
									name="email"
									onChange={this.handleChange}
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup bsSize="large" controlId="image">
								<ControlLabel>Image Url <span className="help">(optional)</span></ControlLabel>
								<FormControl
									type="text"
									value={this.state.image}
									name="image"
									onChange={this.handleChange}
								/>
								<FormControl.Feedback />
							</FormGroup>
							<FormGroup controlId="description">
								<ControlLabel>Description <span className="help">(optional)</span></ControlLabel>
								<FormControl
									type="textarea"
									componentClass="textarea"
									value={this.state.description}
									name="description"
									onChange={this.handleChange}
								/>
								<FormControl.Feedback />
							</FormGroup>
							<Checkbox
								id="sold"
								checked={this.state.sold}
								className="text-center"
								onChange={this.handleChangeCheckbox}
							>
					      <strong>Sold</strong>
					    </Checkbox>
							<Button
								type="submit"
								bsSize="large"
								bsStyle="primary"
								disabled={!this.validateForm()}
							>Submit</Button>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default withRouter(UpdateContainer);
