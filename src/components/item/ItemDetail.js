import React, { Component } from 'react';
import './ItemDetail.css';

class ItemDetail extends Component {
  render() {
    return (
      <article className="ItemDetail">
				<div><a href="">+</a><br />{ this.props.votes }<br /><a href="">-</a></div>
				<h2>{ this.props.title }</h2>
        <img src={ this.props.thumbnail_image_url } alt={ this.props.title } />
        <p>{ this.props.content }</p>
      </article>
    );
  }
}

export default ItemDetail;
