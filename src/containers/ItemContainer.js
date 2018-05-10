import React, { Component } from 'react';
import './PostContainer.css';
import ItemDetail from '../components/item/ItemDetail';
import axios from 'axios';

class PostContainer extends Component {
  constructor() {
    super();
    this.state = {
			post: {
				comments: []
			}
    };
  }

	getCurrentPostId() {
		return this.props.location.pathname.split('/')[2];
	}

	componentWillMount() {
		let postId = this.getCurrentPostId();
		axios.get(`/api/posts/${postId}`).then( (result) => {
			console.log(result);
			this.setState({
				post: result.data
			})
		})
	}

  render() {

    return (
      <section className="PostContainer">
        <ItemDetail { ...this.state.post } />
      </section>
    );
  }
}

export default PostContainer;
