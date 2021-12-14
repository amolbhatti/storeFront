import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { loadCart } from "./helper/cartHelper";
import Checkout from "./Checkout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload,setReload]=useState(false)

  useEffect(()=>{
      setProducts(loadCart())
  },[reload])

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => {
          return (<Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
          )
        })}
      </div>
    );
  };

  

  return (
    <Base title="Cart Page" description="Ready to Check out">
      <div className="row text-center">
        <div className="col-6">{products.length>0 ? loadAllProducts(products):(
          <h3>
            Cart is empty...
          </h3>
        )}</div>
        <div className="col-6"><Checkout products={products} setReload={setReload} reload={reload}/></div>
      </div>
    </Base>
  );
};

export default Cart;
