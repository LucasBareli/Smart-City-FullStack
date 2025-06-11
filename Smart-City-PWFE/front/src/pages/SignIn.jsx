import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImage from "../assets/Login.png";

function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  // 1. Estado para controlar o pop-up de erro
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const logar = async (e) => {
    e.preventDefault();
    setLoginError(false); // Reseta o erro a cada nova tentativa

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: user,
        password: password,
      });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("username", user);
      navigate("/home");
    } catch (error) {
      // 2. Ativa o pop-up em caso de erro
      console.error("Login Error: ", error);
      setLoginError(true);
    }
  };

  const irParaCadastro = () => {
    navigate("/signup");
  };

  const lembrarSenha = (e) => {
    e.preventDefault();
    alert("Remember kkkk");
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
            Welcome to the Smart City, develompment by student <span className="league-regular font-bold">Lucas Bareli</span>
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
                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !pl-3"
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
                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !pl-3"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right !mt-5">
              <a
                href="#"
                onClick={lembrarSenha}
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
              className="text-[#3C096C] underline text-[20px] league-regular"
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

      {/* Pop-up erro de senha ou username */}
      {loginError && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-red-600 league-regular">Login Failed</h2>
            <p className="!mb-6 text-gray-700 league-regular">
              The username or password you entered is incorrect. Please try again.
            </p>
            <button
              onClick={() => setLoginError(false)}
              className="w-full bg-[#3C096C] text-white font-semibold rounded-lg hover:bg-[#2a064f] transition league-regular cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>  
      )}
    </div>
  );
}

export default SignIn;