import React from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function MyCart() {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getItemQuantity,
    cartItems,
  } = useShoppingCart();

  console.log(cartItems);

  let cartElements = cartItems.map((product) => {
    console.log(product);
    return (
      <>
        <div className={styles.cartProducts} key={product._id}>
          <div className={`productImg ${styles.cartImg}`}>
            <Image src={product.imgUrl} alt="product" fill />
          </div>
          <div>
            <h1>{product.title}</h1>
            <p>$58</p>
            <p>Quantity: {product.quantity}</p>
            <p>Size: M</p>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(product._id)}
            >
              Remove
            </button>
          </div>
        </div>
        <hr />
      </>
    );
  });
  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="cartContainer">{cartElements}</div>
    </div>
  );
}