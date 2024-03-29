import React from "react";
import Image from "next/image";
import uniqid from "uniqid";
import styles from "../styles/ProductPage.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  productData: {
    _id: string;
    category: string;
    type: string;
    pathName: string;
    animeName: string;
    title: string;
    desc: string;
    imgUrl: string;
    price: Number;
    size: object;
  }[];
}


// I could set a global state to store the current products grid products to avoid pulling from database upon clicking product details

function ProductsGrid(props: Props) {
  const { productData } = props;
  const router = useRouter();

  // console.log(productData);

  // console.log("route q: ", router);

  let currentPath = router.asPath;

  let gridEl = productData.map((product) => {
    // proudct key is going to be equal to SKU id in future
    return (
      <Link
        className={styles.productBox}
        key={uniqid()}
        href={`${currentPath}/${product._id}`}
      >
        <div className={styles.imgContainer}>
          <Image
            fill
            className="productImg"
            alt="product image"
            src={product.imgUrl}
          />
        </div>
        <p>{product.title}</p>
        <p>{`$ ${product.price}`}</p>
      </Link>
    );
  });
  return <div className={styles.productContainer}>{gridEl}</div>;
}

export default ProductsGrid;
