import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImage from "../assets/Login.png";

function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: user,
        password: password,
      });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("username", user);
      navigate("/home");
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };


  const irParaCadastro = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex w-full h-full bg-white lg:rounded-3xl">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 lg:px-20 py-12">
          <h1 className="text-[48px] league-regular font-semibold !mb-4">
            Welcome to{" "}
            <span className="text-[#3C096C] league-regular font-semibold">
              Smart
            </span>{" "}
            <span className="text-[#17CF96] league-regular font-semibold">
              City
            </span>
          </h1>
          <p className="text-black text-[20px] font-thin league-regular !mb-8 leading-relaxed max-w-90">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <form
            className="space-y-6 w-full max-w-md"
            onSubmit={logar}
          >
            <div>
              <label
                className="block text-black text-[20px] league-regular font-thin !mb-2 !ml-10"
                htmlFor="user"
              >
                Username
              </label>
              <input
                id="user"
                type="text"
                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C]"
                placeholder="Enter your username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-black text-[20px] league-regular font-thin !mb-2 !ml-10"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right !mt-5">
              <a
                href="#"
                className="text-[#3C096C] league-regular text-[16px] font-thin hover:underline !mr-17"
              >
                Forgot a password?
              </a>
            </div>
            <button
              type="submit"
              className="w-85 !mt-5 bg-[#17CF96] league-regular block text-white text-[24px] font-semibold py-3 rounded-lg hover:bg-[#13B983] hover:cursor-pointer transition !ml-10"
            >
              Sign in
            </button>
          </form>
          <p className="!mt-6 text-[20px] league-regular text-center text-black font-thin">
            Don’t you have an account?{" "}
            <a
              href="#"
              onClick={irParaCadastro}
              className="text-[#3C096C] text-[20px] league-regular hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>

        <div className="hidden !m-7 lg:block w-1/2 relative">
          <img
            src={LoginImage}
            alt="City View"
            className="w-full h-225 object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
