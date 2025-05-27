import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Person from "../assets/Bareli.png";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return (
        <header className="absolute top-0 w-full z-10">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <div>
                    <h3 className="text-[64px] font-regular text-[#3C096C] !ml-20">
                        SMART <span className="text-[#17CF96]">CITY</span>
                    </h3>
                </div>

                <ul className="flex space-x-8 text-[36px] lateef-regular font-regular text-[#3C096C] gap-20 !m-10">
                    <li className="cursor-pointer hover:text-[#17CF96] !ml-[410px]">
                        <Link to="/home">HOME</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#17CF96]">
                        <Link to="/sensors">SENSORS</Link>
                    </li>
                    <li className="cursor-pointer hover:text-[#17CF96]">
                        <Link to="/data">DATA</Link>
                    </li>
                </ul>

                <div className="flex items-center">
                    <img
                        src={Person}
                        alt="User"
                        className="w-10 h-10 rounded-full !mr-5"
                    />
                    <div className="h-6 border-l border-[#3C096C]" />
                    <button
                        onClick={handleLogout}
                        className="text-[#3C096C] hover:cursor-pointer hover:text-[#17CF96] transition duration-200 !ml-5"
                    >
                        <LogOut size={24} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
