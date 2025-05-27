import React, { useState } from "react";
import axios from "axios";
import LoginImage from '../assets/Login.png';

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup", {
                username: formData.username,
                password: formData.password,
            });

            if (response.status === 201) {
                alert("User created successfully!");
                window.location.href = "/";
            }
        } catch (err) {
            console.error(err);
            setError("Failed to create user. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex w-full h-full bg-white lg:rounded-3xl">
                <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8 lg:px-20 py-12">
                    <h1 className="text-[48px] league-regular font-semibold !mb-4">
                        Welcome to <span className="text-[#3C096C] league-regular font-semibold">Smart</span> <span className="text-[#17CF96] league-regular font-semibold">City</span>
                    </h1>
                    <p className="text-black text-[20px] font-thin league-regular !mb-8 leading-relaxed max-w-90">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
                                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !mt-2"
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
                                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !mt-2"
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
                                className="w-85 !ml-10 px-4 py-3 league-regular border border-[#3C096C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C096C] !mt-2"
                            />
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-85 !mt-5 bg-[#17CF96] league-regular block text-white text-[24px] font-semibold py-3 rounded-lg hover:bg-[#13B983] hover:cursor-pointer transition !ml-10"
                        >
                            Sign up
                        </button>
                    </form>

                    <p className="!mt-6 text-[20px] league-regular text-center text-black font-thin">
                        Do you have an account?{' '}
                        <a href="/" className="text-[#3C096C] text-[20px] league-regular hover:underline">
                            Sign In
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

export default SignUp;
