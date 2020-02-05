import React, { Component } from "react";
import { render } from "react-dom";

import "./cart.css";

class Cart extends React.Component {
  removeItem(id) {
    this.props.removeItem(id);
  }
  render() {
    const removeItem = this.removeItem.bind(this);
    let totalPrice = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      totalPrice =
        totalPrice + this.props.cart[i].price * this.props.cart[i].howMany;
    }
    totalPrice = totalPrice.toFixed(2);
    let itemsNodes = this.props.cart.map((item, i) => {
      let singleCatTotal = (item.price * item.howMany).toFixed(2);
      return (
        <div key={i} className="single-cat">
          <h3>{item.name}</h3>
          <img src={item.src} />
          <p>{item.description}</p>
          <p>
            Items {item.howMany} | price {item.price} | total {singleCatTotal}
          </p>
          <span onClick={() => removeItem(item.id)}>
            <i className="material-icons">delete</i>
          </span>
        </div>
      );
    });
    return (
      <div className="cart">
        <div className="items-wraper">{itemsNodes}</div>
        <h3>Total : {totalPrice}</h3>
      </div>
    );
  }
}

export default Cart;
