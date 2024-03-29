import React from "react";
import main from "../../../../mongoDB/connect";
import Product from "../../../../mongoDB/Models/product";
import ProductDetails from "../../../../components/ProductDetails";
import { GetStaticPropsContext } from "next";

function ProductPage({ productInfo }: any) {
  // this returns undefined if fallback is set to true. If change is needed, make sure to include fallback loading so this doesn't run first.
  const product = productInfo[0];

  return (
    <div className="productContainer">
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductPage;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  console.log(params);

  let urlQuery = { _id: params?.productId } as any;

  if (params?.category === "clothing") urlQuery = { type: { $ne: "art" } };

  main().catch((error) => console.error(error));
  const response = await Product.find(urlQuery).exec();
  let data = await JSON.parse(JSON.stringify(response));

  return {
    props: {
      productInfo: data,
    },
  };
}

// this seems to work, but is it correct???? lets delete from previous paths to see if its affected

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
