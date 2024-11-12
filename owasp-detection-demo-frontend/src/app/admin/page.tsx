"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Admin() {
  const [loadBalancing, setLoadBalancing] = useState(true);
  const [restrictPurchases, setRestrictPurchases] = useState(false);
  const [userInformation, setUserInformation] = useState(true);
  useEffect(() => {
    sendData();
  }, []);
  useEffect(() => {
    sendData();
  }, [loadBalancing, restrictPurchases, userInformation]);
  async function sendData() {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loadBalancing: loadBalancing,
        restrictPurchases: restrictPurchases,
        userInformation: userInformation,
        owasp_explot: "broken access control",
      }),
    });
  }
  return (
    <div className="text-center text-3xl text-pink-100">
      <Header />
      <h1 className="mt-10">Welcome</h1>
      <h2 className="mt-10">Configure your settings below</h2>
      <div className="flex justify-center items-center">
        <table className="mt-10 w-1/2 border-2">
          <tr className="w-1/2">
            <td className="p-5">Enable Load Balancing</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={loadBalancing}
                onChange={() => setLoadBalancing(!loadBalancing)}
              />
            </td>
          </tr>
          <tr>
            <td className="p-5">Restrict purchases</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={restrictPurchases}
                onChange={() => setRestrictPurchases(!restrictPurchases)}
              />
            </td>
          </tr>
          <tr>
            <td>Collect User Information</td>
            <td className="p-5">
              <input
                type="checkbox"
                defaultChecked={userInformation}
                onChange={() => setUserInformation(!userInformation)}
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
