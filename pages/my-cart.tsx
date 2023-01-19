import React from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export default function MyCart() {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getItemQuantity,
    cartItems,
  } = useShoppingCart();

  let cartSubTotal = cartItems.reduce((prev, curr) => {
    // tax is based at 1.39 just because lazy duh.
    return prev + curr.price * curr.quantity + 1.39;
  }, 0);

  let totalCartItems = cartItems.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);

  async function handleCheckoutRequest(e: any) {
    e.preventDefault();
    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
      }),
    })
      .then((res) => {
        // console.log(res);
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject("fail"));
      })
      .then(({ url }) => {
        // console.log(url);
        window.location = url;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  

  // getting internal 500 error when submitting cart. figure out the issue.
  let cartElements = cartItems.map((product) => {
    // console.log(product);
    return (
      <div key={product._id}>
        <div className={styles.cartProducts}>
          <div className={`productImg ${styles.cartImg}`}>
            <Image src={product.imgUrl} alt="product" fill />
          </div>
          <div className={styles.cartInfo}>
            <h1>{product.title}</h1>
            <p>${product.price} / x1</p>
            <p>Quantity: {product.quantity}</p>
            <p>Size: M</p>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(product._id)}
            >
              Remove
            </button>
            <div className={styles.quantityAdjuster}>
              <button onClick={() => decreaseCartQuantity(product)}>-</button>
              <button onClick={() => increaseCartQuantity(product)}>+</button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  });

  if (!cartItems.length) {
    return (
      <div className={styles.emptyCart}>
        <h1>Your cart is empty</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.cartPage}>
        <div className={styles.itemsContainer}>
          <div className={styles.cartHeader}>
            <h1>Shopping Cart</h1>
          </div>
          {cartElements}
        </div>

        <div className={styles.cartSummary}>
          <form onSubmit={handleCheckoutRequest}>
            <h1>Cart Summary</h1>
            <h3>Total Items: {totalCartItems}</h3>
            <p>Shipping: Free</p>
            <p>Estimated tax: $1.39</p>
            <p>Est. Total: ${cartSubTotal}</p>

            <button type="submit" role="link" className={styles.checkoutBtn}>
              Checkout
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// action="/api/checkout_sessions" method="POST"
