import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

import cats from './catsdata';
import comments from './commentsdata';

import Comments from './Comments';
import Cart from './Cart';
import Cats from './Cats';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      cats: cats,
      cart: [],
      display: {
        cats: true,
        cart: false,
        comments: false
      },
      comments: comments,
      cartLinkClassName: "material-icons"
    };
  }
  addToCart(id) {
    console.log("Added :", id);
    let cats = this.state.cats;
    let cart = this.state.cart;
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].id == id && cats[i].count > 0) {
        if (cart.length === 0) {
          cats[i].count = cats[i].count - 1;
          let cat = Object.assign({}, cats[i]);
          delete cat.count;
          cat.howMany =
            typeof cat.howMany === "undefined" ? 1 : cat.howMany + 1;
          cart.push(cat);
        } else {
          let result = cart.filter(item => item.id == cats[i].id);
          if (result.length === 1) {
            for (let j = 0; j < cart.length; j++) {
              if (cart[j].id == cats[i].id) {
                cats[i].count = cats[i].count - 1;
                cart[j].howMany++;
              }
            }
          } else {
            cats[i].count--;
            let cat = Object.assign({}, cats[i]);
            delete cat.count;
            cat.howMany =
              typeof cat.howMany === "undefined" ? 1 : cat.howMany + 1;
            cart.push(cat);
          }
        }
      }
    }
    this.setState({
      cats: cats,
      cart: cart,
      cartLinkClassName: "material-icons rotateBasket"
    });
    setTimeout(
      () =>
        this.setState({
          cartLinkClassName: "material-icons"
        }),
      2000
    );
  }
  removeItem(id) {
    let cats = this.state.cats;
    let cart = this.state.cart;
    let itemsToGetBack = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        let cartIndex = i;
        itemsToGetBack = cart[i].howMany;
        cart.splice(cartIndex, 1);
      }
    }
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].id == id) {
        cats[i].count = cats[i].count + itemsToGetBack;
      }
    }
    this.setState({
      cats: cats,
      cart: cart
    });
  }
  displayThisComponent(comp) {
    switch (comp) {
      case "cats":
        this.setState({
          display: {
            cats: true,
            cart: false,
            comments: false
          }
        });
        break;
      case "cart":
        this.setState({
          display: {
            cats: false,
            cart: true,
            comments: false
          }
        });
        break;
      case "comments":
        this.setState({
          display: {
            cats: false,
            cart: false,
            comments: true
          }
        });
        break;
    }
  }
  addComment(comment) {
    let comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments: comments
    });
  }
  render() {
    let cats = this.state.display.cats ? (
      <Cats cats={this.state.cats} addToCart={this.addToCart.bind(this)} />
    ) : (
      ""
    );
    let cart = this.state.display.cart ? (
      <Cart cart={this.state.cart} removeItem={this.removeItem.bind(this)} />
    ) : (
      ""
    );
    let comments = this.state.display.comments ? (
      <Comments
        comments={this.state.comments}
        addComment={this.addComment.bind(this)}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <nav>
          <span onClick={() => this.displayThisComponent("cats")}>
            <i className="material-icons">store</i>
          </span>
          <span onClick={() => this.displayThisComponent("cart")}>
            <i className={this.state.cartLinkClassName}>add_shopping_cart</i>
          </span>
          <span onClick={() => this.displayThisComponent("comments")}>
            <i className="material-icons">chat_bubble</i>
          </span>
        </nav>
          {cats}
          {cart}
          {comments}
      </div>
    );
  }
}

render(<App cats={cats} />, document.getElementById("root"));
