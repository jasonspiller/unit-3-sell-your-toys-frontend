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
				arrSorted[item].title = `<strong>SOLD</strong> ${arrSorted[item].title} <strong>SOLD</strong>`
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
		axios.get('/api/items').then( (results) => {
			console.log(results);
			this.sortAndFormatData(results.data);
		})
	}


  // constructor() {
  //   super();
  //   this.state = {
	// 		posts: [],
	// 		newTitle: '',
	// 		newContent: '',
	// 		newImage: ''
  //   };
	//
	// 	this.onFormSubmit = this.onFormSubmit.bind(this);
	// 	this.onTitleChange = this.onTitleChange.bind(this);
	// 	this.onContentChange = this.onContentChange.bind(this);
	// 	this.onImageChange = this.onImageChange.bind(this);
	// 	this.sortAndSetPosts = this.sortAndSetPosts.bind(this);
  //   this.vote = this.vote.bind(this);
  // }
	//
	// onFormSubmit(e) {
	// 	e.preventDefault();
	//
	// 	let newPost= {
	// 		title : this.state.newTitle,
	// 		content: this.state.newContent,
	// 		image : this.state.newImage
	// 	}
	//
	// 	axios.post('/api/posts', newPost).then( (post) => {
	// 		console.log('Posted');
	// 		// when the new document returns append it to array
	// 		this.setState({
	// 			posts: {
	// 				data: this.state.posts.data.push(post)
	// 			},
	// 			newTitle: '',
	// 			newContent: '',
	// 			newImage: ''
	// 		})
	// 	})
	// }
	//
	// onTitleChange(e) {
	// 	this.setState({
	// 		posts: this.state.posts,
	// 		newTitle: e.target.value,
	// 		newContent: this.state.newContent,
	// 		newImage: this.state.newImage
	// 	})
	// }
	//
	// onContentChange(e) {
	// 	this.setState({
	// 		posts: this.state.posts,
	// 		newTitle: this.state.title,
	// 		newContent: e.target.value,
	// 		newImage: this.state.newImage
	// 	})
	// }
	//
	// onImageChange(e) {
	// 	this.setState({
	// 		posts: this.state.posts,
	// 		newTitle: this.state.title,
	// 		newContent: this.state.newContent,
	// 		newImage: e.target.value
	// 	})
	// }
	//
	// sortAndSetPosts(posts) {
	// 	let sortedPosts = posts.sort((a, b) => {
	// 		if (a.votes === b.votes) {
	// 			return a.updatedAt < b.updatedAt ? 1 : -1;
	// 		}
	// 		return a.votes < b.votes ? 1 : -1;
	// 	});
	// 	this.setState({
	// 		posts: sortedPosts
	// 	});
	// }
	//
	// componentDidMount() {
	// 	axios.get('/api/posts').then( (results) => {
	// 		this.sortAndSetPosts(results.data)
	// 	})
	// }
	//
	// vote(postId, newVotes) {
	// 	return () => {
	// 		let payload = JSON.stringify({ votes: newVotes });
	// 		axios.put(`/api/posts/${postId}`, 'PUT', payload).then( (res) => {
	// 			axios.get('/api/posts').then( (results) => {
	// 				this.sortAndSetPosts(results.data)
	// 			})
	// 		});
	// 	}
	// }

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


				{/*
				<form onSubmit={this.onFormSubmit}>
					<label htmlFor="title">Title
						<input id="title" onChange={this.onTitleChange} />
					</label>
					<label htmlFor="content">Content
						<input id="content" onChange={this.onContentChange} />
					</label>
					<label htmlFor="image">Image
						<input id="image" onChange={this.onImageChange} />
					</label>
					<button type="submit">Submit</button>
				</form> */}

			</Grid>
    );
  }
}
