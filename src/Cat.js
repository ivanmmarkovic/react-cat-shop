import React, { Component } from 'react';
import { render } from 'react-dom';

import './cat.css';

class Cat extends React.Component {
  render() {
    return (
      <div className="single-cat">
        <h3>{this.props.cat.name}</h3>
        <img src={this.props.cat.src} />
        {/*
        <p className={"description"}>{this.props.cat.description}</p>
        */}
        <p>
          <b>Price</b> {this.props.cat.price} | {this.props.cat.count}{" "}
          {/*this.props.cat.name*/} available
        </p>
        <span onClick={() => this.props.addToCart(this.props.cat.id)}>
          <i className="material-icons">add_shopping_cart</i>
        </span>
      </div>
    );
  }
}

export default Cat;
