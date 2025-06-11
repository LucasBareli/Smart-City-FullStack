import React, { useState } from "react";
import axios from "axios";
import LoginImage from "../assets/Login.png";

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [modal, setModal] = useState({
        isOpen: false,
        message: "",
        isError: false
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModal({ isOpen: false, message: "", isError: false });

        if (formData.password !== formData.confirmPassword) {
            setModal({
                isOpen: true,
                message: "Passwords do not match. Please check and try again.",
                isError: true
            });
            return;
        }

        if (!formData.username || !formData.password) {
            setModal({
                isOpen: true,
                message: "Username and password cannot be empty.",
                isError: true
            });
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup", {
                username: formData.username,
                password: formData.password,
            });

            if (response.status === 201) {
                setModal({
                    isOpen: true,
                    message: "User created successfully! You will be redirected to the login page.",
                    isError: false
                });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2500);
            }
        } catch (err) {
            console.error(err);
            let errorMessage = "Failed to create user. Please try again later.";
            if (err.response && err.response.data && err.response.data.username) {
                errorMessage = `Failed to create user: ${err.response.data.username[0]}`;
            }
             setModal({
                isOpen: true,
                message: errorMessage,
                isError: true
            });
        }
    };

    const closeModal = () => {
        setModal({ isOpen: false, message: "", isError: false });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex w-full h-full bg-white lg:rounded-3xl">
                <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 lg:px-20 py-12">
                    <h1 className="text-[48px] league-regular font-semibold !mb-4">
                        Welcome to <span className="text-[#3C096C] league-regular font-semibold">Smart</span> <span className="text-[#17CF96] league-regular font-semibold">City</span>
                    </h1>
                    <p className="text-black text-[20px] font-thin league-regular !mb-8 leading-relaxed max-w-90">
                        Welcome to the Smart City, develompment by student <span className="font-bold league-regular">Lucas Bareli</span>
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                        <div>
                            <label className="block text-black text-[20px] league-regular font-thin !ml-10" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !mt-2 !pl-3"
                            />
                        </div>
                        <div>
                            <label className="block text-black text-[20px] league-regular font-thin !ml-10" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !mt-2 !pl-3"
                            />
                        </div>
                        <div>
                            <label className="block text-black text-[20px] league-regular font-thin !ml-10" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !mt-2 !pl-3"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-85 !mt-5 bg-[#17CF96] league-regular block text-white text-[24px] font-semibold py-3 rounded-lg hover:bg-[#13B983] hover:cursor-pointer transition !ml-10"
                        >
                            Sign up
                        </button>
                    </form>

                    <p className="!mt-6 text-[20px] league-regular text-center text-black font-thin">
                        Do you have an account?{' '}
                        <a href="/" className="text-[#3C096C] text-[20px] league-regular underline">
                            Sign In
                        </a>
                    </p>
                </div>

                <div className="hidden !m-7 lg:block w-1/2 relative">
                    <img
                        src={LoginImage}
                        alt="City View"
                        className="w-full h-full object-cover rounded-3xl"
                    />
                </div>
            </div>

            {/* Conditional Pop-up Rendering */}
            {modal.isOpen && (
                <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm mx-4">
                        <h2 className={`text-2xl font-bold mb-4 league-regular ${modal.isError ? 'text-red-600' : 'text-green-600'}`}>
                            {modal.isError ? 'Error' : 'Success'}
                        </h2>
                        <p className="!mb-6 text-gray-700 league-regular text-lg">
                           {modal.message}
                        </p>
                        <button
                            onClick={closeModal}
                            className={`w-full text-white font-semibold py-2 rounded-lg transition league-regular cursor-pointer ${modal.isError ? 'bg-[#3C096C] hover:bg-[#2a064f]' : 'bg-green-600 hover:bg-green-700'} ${!modal.isError ? 'hidden' : ''}`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;