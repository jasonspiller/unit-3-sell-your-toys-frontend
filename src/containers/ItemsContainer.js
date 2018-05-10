import React, { Component } from 'react';
import './PostsContainer.css';
import ItemSummary from '../components/item/ItemSummary';
import axios from 'axios';

class PostContainer extends Component {
  constructor() {
    super();
    this.state = {
			posts: [],
			newTitle: '',
			newContent: '',
			newImage: ''
    };

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onContentChange = this.onContentChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		this.sortAndSetPosts = this.sortAndSetPosts.bind(this);
    this.vote = this.vote.bind(this);
  }

	onFormSubmit(e) {
		e.preventDefault();

		let newPost= {
			title : this.state.newTitle,
			content: this.state.newContent,
			image : this.state.newImage
		}

		axios.post('/api/posts', newPost).then( (post) => {
			console.log('Posted');
			// when the new document returns append it to array
			this.setState({
				posts: {
					data: this.state.posts.data.push(post)
				},
				newTitle: '',
				newContent: '',
				newImage: ''
			})
		})
	}

	onTitleChange(e) {
		this.setState({
			posts: this.state.posts,
			newTitle: e.target.value,
			newContent: this.state.newContent,
			newImage: this.state.newImage
		})
	}

	onContentChange(e) {
		this.setState({
			posts: this.state.posts,
			newTitle: this.state.title,
			newContent: e.target.value,
			newImage: this.state.newImage
		})
	}

	onImageChange(e) {
		this.setState({
			posts: this.state.posts,
			newTitle: this.state.title,
			newContent: this.state.newContent,
			newImage: e.target.value
		})
	}

	sortAndSetPosts(posts) {
		let sortedPosts = posts.sort((a, b) => {
			if (a.votes === b.votes) {
				return a.updatedAt < b.updatedAt ? 1 : -1;
			}
			return a.votes < b.votes ? 1 : -1;
		});
		this.setState({
			posts: sortedPosts
		});
	}

	componentDidMount() {
		axios.get('/api/posts').then( (results) => {
			this.sortAndSetPosts(results.data)
		})
	}

	vote(postId, newVotes) {
		return () => {
			let payload = JSON.stringify({ votes: newVotes });
			axios.put(`/api/posts/${postId}`, 'PUT', payload).then( (res) => {
				axios.get('/api/posts').then( (results) => {
					this.sortAndSetPosts(results.data)
				})
			});
		}
	}

  render() {

    return (
      <section className="PostsContainer">
				<h2>List of Posts</h2>
				<ul>
					{ this.state.posts.map( (post) => {
            return <ItemSummary
              key={ post._id }
              vote={ this.vote }
              { ... post } />
          }) }
				</ul>
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
				</form>
      </section>
    );
  }
}

export default PostContainer;
