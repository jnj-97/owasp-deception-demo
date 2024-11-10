"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RatingReview from "@/app/components/Rating";
import Header from "@/app/components/Header";

export default function Login() {
  const pathName = usePathname();
  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false);
  async function fetchProduct(id: string): Promise<void> {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const json = await res.json();
      console.log(json);
      setProduct(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    const id: string = pathName.split("/").pop() || "";
    fetchProduct(id);
    if (sessionStorage.getItem("cart") == null) {
      setDisabled(false);
    } else {
      //@ts-ignore
      let products = JSON.parse(sessionStorage.getItem("cart"));
      setDisabled(products.some((item: any) => item.id == id));
    }
  }, []);

  function addToCart() {
    if (sessionStorage.getItem("cart") == null) {
      sessionStorage.setItem("cart", JSON.stringify([product]));
      setDisabled(true);
    } else {
      //@ts-ignore
      let products: any = JSON.parse(sessionStorage.getItem("cart"));
      console.log({ products });
      products.push(product);
      sessionStorage.setItem("cart", JSON.stringify(products));
      setDisabled(true);
    }
  }
  return (
    <>
      <Header />
      {Object.keys(product).length && (
        <>
          {/* @ts-ignore  */}
          <h1 className="m-5 text-3xl text-center">{product.title}</h1>
          {/* @ts-ignore  */}
          <div className="flex p-5 border-2 border-pink-200">
            <img
              // @ts-ignore
              src={product.image}
              className="h-1/2 w-1/2 border-10 border-white"
            />
            <div className="pl-5 w-1/3">
              {/* @ts-ignore  */}
              <RatingReview rating={Math.round(product.rating.rate)} />
              {/* @ts-ignore  */}
              <h1>{product.rating.count} reviews</h1>

              <h1 className="text-green-700 mt-4 text-3xl">
                {/* @ts-ignore  */}
                &#36;{product.price}
              </h1>
              {/* @ts-ignore  */}
              <p>{product.description}</p>
              <button
                disabled={disabled}
                onClick={() => addToCart()}
                className="bg-green-400 p-2 w-36 mt-10 ml-10 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
