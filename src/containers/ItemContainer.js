import React, { Component } from 'react';
import ItemDetail from '../components/item/ItemDetail';
import axios from 'axios';

export default class ItemContainer extends Component {
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
