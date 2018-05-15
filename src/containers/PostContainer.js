import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, InputGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class PostContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			price: '',
			condition: '',
			zip: '',
			email: '',
			image: '',
			description: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
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
		console.log(`${this.state.title.length} ${this.state.price.length} ${this.state.condition.length} ${this.state.zip.length}`);
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
			description: this.state.description
		}

		if(this.state.image !== '') {
			formData.image = this.state.image
		}

		console.log(formData);

		axios.post(`https://sellyourtoys.herokuapp.com/api/items`, formData).then( (result) => {
			console.log(result);

     	this.props.history.push('/items');
		})
	}


	render() {
		return (
			<Grid fluid={true} componentClass={'main'} className="PostContainer">
				<Row className="mb-15">
					<Col xs={10} xsOffset={1}>
						<h2>Post a Toy</h2>
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

export default withRouter(PostContainer);
