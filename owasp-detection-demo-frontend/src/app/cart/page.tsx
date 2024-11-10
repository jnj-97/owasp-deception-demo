"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [price, setPrice] = useState(0);
  const router = useRouter();
  useEffect(() => {
    // Check if cart data exists in sessionStorage
    const storedCart = sessionStorage.getItem("cart");

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, []); // This effect only runs once, when the component mounts

  useEffect(() => {
    //@ts-ignore

    if (cart != null && cart.length > 0) {
      let totalPrice = 0;
      //@ts-ignore
      cart.forEach((product) => {
        totalPrice += product.price;
      });
      setPrice(totalPrice); // Set the total price
    }
  }, [cart]); // Dependency array ensures this effect runs when cart changes
  function removeProduct(id: number) {
    console.log("id: ", id);
    //@ts-ignore
    if (cart.length == 1) {
      sessionStorage.clear();
      setCart(null);
    } else {
      //@ts-ignore
      let newCart = cart.filter((product: any) => product.id != id);
      console.log(newCart);
      let totalprice = 0;
      //@ts-ignore
      for (let product of newCart) {
        //@ts-ignore
        totalprice += product.price;
      }
      setPrice(totalprice);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
  }
  function checkout() {
    sessionStorage.clear();
    router.push("/home");
  }
  return (
    <>
      <Header />
      <h1 className="text-3xl text-center">Cart</h1>
      {cart && (
        <>
          {/* @ts-ignore */}
          {cart.map((product) => {
            return (
              <div className="rounded-lg mt-5 flex justify-between p-5 text-black bg-gradient-to-br from-pink-200 to-red-100">
                <img src={product.image} className="h-24 w-24 rounded-md " />
                <h1 className="pl-4 font-bold text-ellipsis">
                  {product.title}
                </h1>
                <h1 className="pl-4 float-right text-xl">{product.price}</h1>
                <button
                  className=" mr-2 bg-red-500 text-white h-10 p-4 rounded-lg"
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                >
                  Remove Item
                </button>
              </div>
            );
          })}
          <div className="flex justify-end p-5">
            <h1 className="text-2xl mr-4">Total: &#36;{price}</h1>
            <button
              onClick={() => checkout()}
              className="bg-green-600 text-black rounded-lg p-4"
            >
              Checkout
            </button>
          </div>
        </>
      )}
      {cart == null && (
        <div className="text-center text-2xl mt-5">
          <h1>Your cart is empty&#128560;</h1>
          <a href="/home">Get back to Shopping</a>
        </div>
      )}
    </>
  );
}
