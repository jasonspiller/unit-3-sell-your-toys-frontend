import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {

  render() {
    return (
      <li className="ItemSummary">
				<div>
					<a onClick={ this.props.vote(this.props.post_id, (this.props.votes + 1)) }>+</a><br />
					{ this.props.votes }<br />
					<a onClick={ this.props.vote(this.props._id, (this.props.votes - 1)) }>-</a>
				</div>
				<Link to={ `/posts/${this.props._id}` } className="ItemLink-content">
          <img src={ this.props.thumbnail_image_url }/>
          <h2>{ this.props.title }</h2>
        </Link>
      </li>
    );
  }
}

export default Item;
