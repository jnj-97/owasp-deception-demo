"use client";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import RatingReview from "../components/Rating";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]); // Default state is an empty array
  const router = useRouter();

  async function fetchProducts(): Promise<void> {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const json = await res.json();
      setProducts(Array.isArray(json) ? json : [json]); // Ensure it's an array, even if the response is a single object
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    console.log("hello");
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-4 text-black">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/home/${product.id}`)}
            className="cursor-pointer p-5 rounded-lg bg-gradient-to-br from-pink-200 to-red-100 br-pink-400"
          >
            <h1 className="text-xl text-center font-bold">{product.title}</h1>
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-44 h-44 m-5 justify-center"
              />
            </div>
            <div className="flex justify-between">
              {/*@ts-expect-error*/}
              <RatingReview rating={Math.round(product.rating.rate)} />
              <p className="text-right text-lg pt-2">&#36; {product.price}</p>
            </div>
            <p className="mb-2 ">{product.rating.count} reviews</p>

            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
