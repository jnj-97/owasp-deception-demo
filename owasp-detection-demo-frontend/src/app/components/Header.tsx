import Link from "next/link";

export default function Header() {
  return (
    <header className=" top-0 p-5 w-full sticky flex bg-gradient-to-r from-blue-200 to-red-100 br-gray-400 justify-around">
      <h1 className="text-3xl text-red-500">Exploit Store</h1>
      <Link href="/home" className="p-2 rounded-lg bg-transparent text-black">
        Home
      </Link>
      <Link href="/cart" className="p-2 rounded-lg bg-transparent text-black">
        Cart
      </Link>
    </header>
  );
}
