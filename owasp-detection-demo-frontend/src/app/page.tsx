

export default function Login() {
  return (
    <>
    <div className="w-72 h-72 p-10 bg-gradient-to-br from-red-600 to-red-100 br-pink-400 rounded-lg mt-[10%] ml-[40%] border-white border-4  justify-center items-center"><h1 className="text-center text-3xl font-bold text-white">Login</h1>
    <input className="m-4 bg-gray-300 rounded-lg" type="text" placeholder="Username"/>
    <input className="m-4 bg-gray-300 rounded-lg" type="password" placeholder="Password"/>
    <button className="bg-green-400 rounded-md border-black border-2 p-2 text-black float-end ">Submit</button></div>
    <footer className="w-full p-5 bottom-0 absolute text-center text-black bg-pink-200"><div className="text-2xl">Created by Nobin Johnson for CYB655A Demonstration Purposes</div>
                  <div className="flex justify-around"><a href="mailto: johns451@canisius.edu" >Email</a><a href="https://github.com/jnj-97">Github</a></div></footer></>
  );
}
 