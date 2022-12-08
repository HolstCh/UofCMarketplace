import React from "react";
import Product from "../components/Product";
import PostProduct from "../components/PostProduct";
import NavBar from "../components/NavBar";

function BuyPage() {
  return (
    <>
      <NavBar />
      <div id="background">
        <PostProduct></PostProduct>
        <Product></Product>
        <Product></Product>
        <Product></Product>
      </div>
    </>
  );
}

export default BuyPage;
