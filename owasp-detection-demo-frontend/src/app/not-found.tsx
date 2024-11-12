"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SSRF() {
  const pathName = usePathname();
  const id: string = pathName.split("/").pop() || "";
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    fetchInfo();
  }, []);
  const renderJson = (data: any) => {
    if (typeof data === "object" && data !== null) {
      return (
        <div style={{ marginLeft: "20px" }}>
          {Object.entries(data).map(([key, value], index) => (
            <div key={index}>
              <strong>{key}:</strong>
              {renderJson(value)} {/* Recursive call */}
            </div>
          ))}
        </div>
      );
    } else {
      return <span>{JSON.stringify(data)}</span>; // Render primitive values directly
    }
  };
  async function fetchInfo() {
    await fetch(`https://dummyjson.com/users/10`)
      .then((res) => res.json())
      .then((res) => setUserInformation(res));
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: id,
        owasp_exploit: "SSRF",
      }),
    });
  }
  return (
    <>
      <div className="text-center text-3xl">{id} Data</div>
      {userInformation && renderJson(userInformation)}
    </>
  );
}
