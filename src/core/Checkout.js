import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
import DropIn from "braintree-web-drop-in-react";
import { getToken, processPayment } from "./helper/paymentHelper";

const Checkout = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: "",
    success: "",
    clientToken: null,
    error: "",
    instance: {},
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getUToken = (userId, token) => {
    getToken(userId, token).then((info) => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        setInfo({ ...info, clientToken: info.clientToken });
      }
    });
  };

  useEffect(() => {
    getUToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data=>{
      nonce=data.nonce
      const paymentData={
        paymentMethodNonce:nonce,
        amount:getAmount(products)
      };
      processPayment(userId,token,paymentData).then(response=>{
        setInfo({...info,success:response.success,loading:false})
        console.log("PAYMENT SUCCESS");
        const order={
          products:products,
          transaction_id:response.transaction.id,
          amount:response.transaction.amount
        }

        createOrder(userId,token,order)
        cartEmpty(()=>{
          console.log("did we got a crash?")
          setReload(!reload)
        })
      }).catch(err=>{
        setInfo({...info,error:err,success:false,loading:false})
        console.log("PAYMENT FAILED");
      })
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <div>
            <h3>Add Something to Cart</h3>
          </div>
        )}
      </div>
    );
  };

  const getAmount=(products)=>{
    let total=0;
    products.map(item=>{
      total=total+item.price
    })
    return total;
  }

  return (
    <div>
      <h3>Your Bill is {getAmount(products)} $</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Checkout;
