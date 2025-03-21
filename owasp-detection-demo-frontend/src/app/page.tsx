"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickTimes, setClickTimes] = useState([]);
  const router = useRouter();
  async function submit() {
    if (mightBeSQLInjection(userName) || mightBeSQLInjection(password)) {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          owasp_exploit: "injection",
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));

      router.push("/home");
    } else if (
      (userName == "root" && password == "postgres") ||
      (userName == "admin" && password == "admin") ||
      (userName == "mongo-r00t-us3rn4m3" && password == "mongo-r00t-p4ssw0rd")
    ) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          owasp_exploit: "security misconfiguration",
        }),
      });
      router.push("/home");
    } else {
      let now = Date.now();
      const updatedClickTimes = [...clickTimes, now];
      const recentClicks = updatedClickTimes.filter(
        (time) => now - time <= 60000
      );
      //@ts-expect-error* Error
      setClickTimes(recentClicks);
      if (recentClicks.length >= 10) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
            owasp_exploit: "insecure design",
            attempts: clickTimes,
          }),
        });
        setClickTimes([]); // Reset after alert
        router.push("/home");
      }
    }
  }
  function mightBeSQLInjection(input: string) {
    const sqlInjectionPattern =
      /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|AND|OR|EXEC|TRUNCATE|ALTER|CREATE|REPLACE)\b|\b--|\b;|\b\/\*|\*\/|\')/i;
    return sqlInjectionPattern.test(input);
  }
  return (
    <>
      <div className="w-72 h-72 p-10 bg-gradient-to-br from-red-600 to-red-100 br-pink-400 rounded-lg mt-[10%] ml-[40%] border-white border-4  justify-center items-center">
        <h1 className="text-center text-3xl font-bold text-white">Login</h1>
        <input
          value={userName}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="m-4 text-black bg-gray-300 rounded-lg"
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="m-4 text-black bg-gray-300 rounded-lg"
          type="password"
          placeholder="Password"
        />
        <button
          id="Sumbit"
          onClick={() => submit()}
          className="bg-green-400 rounded-md border-black border-2 p-2 text-black float-end "
        >
          Submit
        </button>
      </div>
      <footer className="w-full p-5 bottom-0 absolute text-center text-black bg-pink-200">
        <div className="text-2xl">
          Created by Nobin Johnson for CYB655A Demonstration Purposes
        </div>
        <div className="flex justify-around">
          <a href="mailto: johns451@canisius.edu">Email</a>
          <a href="https://github.com/jnj-97">Github</a>
        </div>
      </footer>
    </>
  );
}
