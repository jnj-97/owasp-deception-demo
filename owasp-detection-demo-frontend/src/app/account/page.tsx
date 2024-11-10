"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Account() {
  const [userInformation, setUserInformation] = useState(null);
  useEffect(() => {
    fetchUserInformation();
  }, []);
  async function fetchUserInformation() {
    let randomNumber = Math.floor(Math.random() * 30) + 1;
    await fetch(`https://dummyjson.com/users/${randomNumber}`)
      .then((res) => res.json())
      .then((res) => setUserInformation(res));
  }
  return (
    <>
      <Header />
      <h1 className="p-5 w-full text-3xl border-y-2 border-gray-300">
        Personal Information
      </h1>
      {userInformation && (
        <>
          <div className="flex justify-center items-center">
            <img
              className="rounded-full w-40 h-40 border-2 mt-4 border-white"
              //@ts-ignore
              src={userInformation.image}
            />
          </div>
          <table className="ml-2 mt-5 text-2xl w-1/3 ">
            <tr>
              <td>Name:</td>
              <td>
                {/* @ts-ignore */}
                {userInformation.firstName} {userInformation.lastName}
              </td>
            </tr>
            <tr>
              <td>Age:</td>
              {/* @ts-ignore */}
              <td>{userInformation.age}</td>
            </tr>
            <tr>
              <td>Email: </td>
              {/* @ts-ignore */}
              <a href={`mailto:${userInformation.email}`}>
                {/* @ts-ignore */}
                {userInformation.email}
              </a>
            </tr>
            <tr>
              <td>Phone</td>
              {/* @ts-ignore */}
              <td>{userInformation.phone}</td>
            </tr>
            <tr>
              <td>SSN</td>
              {/* @ts-ignore */}
              <td>{userInformation.ssn}</td>
            </tr>
          </table>
        </>
      )}
      <h1 className="p-5 mt-10 w-full text-3xl border-y-2 border-gray-300">
        Addresses
      </h1>
      {userInformation && (
        <>
          <table className="ml-2 mt-20 text-2xl w-1/3 ">
            <tr>
              <td>Address Line 1:</td>
              <td>
                {/* @ts-ignore */}
                {userInformation.address.address}
              </td>
            </tr>
            <tr>
              <td>City:</td>
              {/* @ts-ignore */}
              <td>{userInformation.address.city}</td>
            </tr>
            <tr>
              <td>State: </td>

              {/* @ts-ignore */}
              {userInformation.address.state}
            </tr>
            <tr>
              <td>Zip</td>
              {/* @ts-ignore */}
              <td>{userInformation.address.postalCode}</td>
            </tr>
            <tr>
              <td>Country</td>
              {/* @ts-ignore */}
              <td>{userInformation.address.country}</td>
            </tr>
          </table>
        </>
      )}
      <h1 className="p-5 mt-10 w-full text-3xl border-y-2 border-gray-300">
        Employment Information
      </h1>
      {userInformation && (
        <>
          <table className="ml-2 mt-20 text-2xl w-1/3 ">
            <tr>
              <td>Name:</td>
              <td>
                {/* @ts-ignore */}
                {userInformation.company.name}
              </td>
            </tr>
            <tr>
              <td>Title:</td>
              {/* @ts-ignore */}
              <td>{userInformation.company.title}</td>
            </tr>
            <tr>
              <td>EIN:</td>
              {/* @ts-ignore */}
              <td>{userInformation.ein}</td>
            </tr>
            <tr>
              <td>Address Line 1:</td>

              <td>
                {/* @ts-ignore */}
                {userInformation.company.address.address}
              </td>
            </tr>
            <tr>
              <td>City:</td>
              {/* @ts-ignore */}
              <td>{userInformation.company.address.city}</td>
            </tr>
            <tr>
              <td>State: </td>

              {/* @ts-ignore */}
              {userInformation.company.address.state}
            </tr>
            <tr>
              <td>Zip</td>
              {/* @ts-ignore */}
              <td>{userInformation.company.address.postalCode}</td>
            </tr>
            <tr>
              <td>Country</td>
              {/* @ts-ignore */}
              <td>{userInformation.address.country}</td>
            </tr>
          </table>
        </>
      )}
      <h1 className="p-5 mt-10 w-full text-3xl border-y-2 border-gray-300">
        Devices
      </h1>
      {userInformation && (
        <div className="text-2xl mt-10 ml-5">
          {/* @ts-ignore */}
          IP {userInformation.ip} with User-Agent {userInformation.userAgent}
        </div>
      )}
      <h1 className="p-5 mt-10 w-full text-3xl border-y-2 border-gray-300">
        Payment & Personal Information
      </h1>
      {userInformation && (
        <>
          <div className="text-2xl my-12 text-blue-400 ml-5 ">Cards</div>
          <table className="ml-2 mt-20 text-2xl w-1/3 ">
            <tr>
              <td>Card Number:</td>
              {/* @ts-ignore */}
              <td>xxxx-xxxx-{userInformation.bank.cardNumber.slice(-4)}</td>
            </tr>
            <tr>
              <td>Expires on: </td>
              {/* @ts-ignore */}
              <td>{userInformation.bank.cardExpire}</td>
            </tr>
            <tr>
              <td>Currency: </td>
              {/* @ts-ignore */}
              <td>{userInformation.bank.currency}</td>
            </tr>
            <tr>
              <td>Type: </td>
              {/* @ts-ignore */}
              <td>{userInformation.bank.cardType}</td>
            </tr>
          </table>
          <div className="text-2xl my-12 text-blue-400 ml-5 ">Currency</div>
          <table className="ml-2 mt-20 text-2xl w-1/2 ">
            <tr>
              <td>Wallet Address:</td>
              {/* @ts-ignore */}
              <td>{userInformation.crypto.wallet}</td>
            </tr>
            <tr>
              <td>Currency: </td>
              {/* @ts-ignore */}
              <td>{userInformation.crypto.coin}</td>
            </tr>
            <tr>
              <td>Network: </td>
              {/* @ts-ignore */}
              <td>{userInformation.crypto.network}</td>
            </tr>
          </table>
        </>
      )}
    </>
  );
}
