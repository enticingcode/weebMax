import React from "react";
import Image from "next/image";
import styles from "../styles/Product.module.css";
import Product from "../mongoDB/Models/product";
import main from "../mongoDB/connect";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useRouter } from "next/router";

function ProductDetails({ product }: any) {
  const router = useRouter();
  const { increaseCartQuantity, cartItems } = useShoppingCart();

  const itemId = router.query.productId as string;

  // console.log(cartItems);

  return (
    <div className={styles.productContainer}>
      <div className={styles.imgContainer}>
        <Image
          className="productImg"
          src={product.imgUrl}
          fill
          alt="Product image"
          sizes="33vw"
        ></Image>
      </div>

      <div className={styles.productInfo}>
        {product.type}
        <h1>{product.title}</h1>
        <p>${product.price}</p>
        <p>
          {product.desc} description example goes here ipsuol dupfe kafpte lorum
          som
        </p>
        <div className={styles.sizes_selection}>
          <button>S</button>
          <button>M</button>
          <button>L</button>
        </div>

        <button
          onClick={() => increaseCartQuantity(product)}
          className={styles.addCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
