import React, { Component } from "react";
import { render } from "react-dom";

import "./cats.css";

import Cat from './Cat';

class Cats extends React.Component {
  render() {
    var addToCart = this.props.addToCart;
    var catsNodes = this.props.cats.map((cat, i) => (
      <Cat key={i} cat={cat} addToCart={addToCart} />
    ));
    return <div className="cats-all">{catsNodes}</div>;
  }
}

export default Cats;
