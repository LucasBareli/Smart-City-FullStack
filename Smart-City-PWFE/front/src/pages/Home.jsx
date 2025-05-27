import React, { useState, useEffect } from "react";
import Mange from '../assets/Mange.png';
import Footer from "../components/Footer";
import CityFooter from '../assets/CityFooter.png';
import CityLorem from '../assets/CityLorem.png';
import CityLorem2 from '../assets/CityLorem2.png'
import Carousel from "../components/Carousel";
import Widgets from "../components/Widgets";
import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Home() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    console.log(localStorage.getItem("username"));

    return (
        <>
            <div>
                {/* Navbar */}
                <header className="absolute top-0 w-full z-10">
                    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                        <div>
                            <h3 className="text-[64px] font-regular text-white !ml-20">
                                SMART <span className="text-[#17CF96]">CITY</span>
                            </h3>
                        </div>
                        <ul className="flex space-x-8 text-[36px] lateef-regular font-regular text-white gap-20 !m-10">
                            <li className="cursor-pointer hover:text-[#17CF96] !ml-130">
                                <Link to="/home">HOME</Link>
                            </li>
                            <li className="cursor-pointer hover:text-[#17CF96]">
                                <Link to="/sensors">SENSORS</Link>
                            </li>
                            <li className="cursor-pointer hover:text-[#17CF96]">
                                <Link to="/data ">DATA</Link>
                            </li>
                        </ul>
                        <div className="bg-[#17CF96] text-[36px] text-white rounded-full w-40 h-9 flex items-center justify-center !mr-20">
                            {username ? `Welcome ${username}` : <Link to="/signup">Sign Up</Link>}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative h-screen">
                    <img
                        src={Mange}
                        alt="Senai"
                        className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-opacity-40 flex flex-col items-start justify-end text-[#E4E4E4] !ml-30">
                        <h1 className="text-[250px] font-bold leading-none tracking-wide">
                            SMART CITY
                        </h1>
                        <p className="text-[32px] max-w-[750px] text-left ledger-regular !mb-20">
                            Welcome to the best Smart City from Senai Roberto Mange!!
                        </p>
                        <button className="absolute lateef-regular font-regular right-10 text-[32px] flex items-center space-x-2">
                            <span>Lead more</span>
                            <FaArrowDownLong className="text-[16px]" />
                        </button>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="bg-white !ml-15 !mr-15 !mt-20">
                    <Widgets />
                    <div>
                        <h2 className="text-[28px] font-bold text-[#77625C] ledger-regular !ml-4 !mt-20">Advantages</h2>
                        <hr className="border-t border-[#000000] w-full" />
                        <h3 className="text-[64px] league-regular text-[#3C096C] font-semibold !mt-10">We enable connectivity</h3>
                        <p className="text-[24px] league-regular font-thin text-black ">Smart city allows you to be aware of everything that is happening in real time and in a centralized way.</p>
                        <div className="relative">
                            <img
                                src={CityLorem}
                                alt="City"
                                className="w-full h-[700px] object-cover rounded-xl"
                            />
                            <div className="absolute top-1/2 left-1/2 w-[387px] h-[519px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 flex flex-col items-center">
                                <img
                                    src={CityLorem2}
                                    alt="City"
                                    className="w-[336px] h-[344px] object-cover rounded-xl !mt-4"
                                />
                                <div className="w-full text-left">
                                    <h4 className="league-regular text-[32px] text-[#3C096C] font-semibold !ml-7">
                                        Real-time data
                                    </h4>
                                    <p className="league-regular text-[24px] !ml-7 font-thin w-85">
                                        Discover the data and use filters to select everything that is happening at SENAI Roberto Mange
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <h2 className="text-[55px] font-semibold league-regular text-[#3C096C] text-end !m-15">
                    OUR SENSORS
                </h2>
                <Carousel />
            </div>
            <img
                src={CityFooter}
                alt="City"
                className="w-full h-[400px] object-cover rounded-xl"
            />
            <Footer />
        </>
    );
}

export default Home;
