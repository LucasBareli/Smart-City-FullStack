import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sensor1 from "../assets/Sensor 1.png";
import Sensor2 from "../assets/Sensor 2.png";

function Carousel() {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const items = [
        { id: 1, image: Sensor1, alt: "Sensor 1" },
        { id: 2, image: Sensor2, alt: "Sensor 2" },
        { id: 3, image: Sensor1, alt: "Sensor 3" },
        { id: 4, image: Sensor2, alt: "Sensor 4" },
        { id: 5, image: Sensor1, alt: "Sensor 5" },
        { id: 6, image: Sensor1, alt: "Sensor 6" },
        { id: 7, image: Sensor2, alt: "Sensor 7" },
        { id: 8, image: Sensor2, alt: "Sensor 8" },
        { id: 9, image: Sensor2, alt: "Sensor 9" },
        { id: 10, image: Sensor1, alt: "Sensor 10" },
        { id: 11, image: Sensor1, alt: "Sensor 11" },
        { id: 12, image: Sensor2, alt: "Sensor 12" },
    ];

    const itemsPerPage = 4;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const startIndex = currentPage * itemsPerPage;
    const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

    const handleSensorClick = (sensorId) => {
        navigate("/sensors", { state: { sensorId } });
    };

    return (
        <section className="bg-white px-4 !mr-15 !ml-15">
            <div className="container !mx-auto">
                {/* Carrossel */}
                <div className="flex gap-10">
                    {visibleItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`w-[calc(25%-10px)] h-[300px] bg-gray-200 rounded-lg shadow-md flex items-center justify-center cursor-pointer ${
                                index === 0 ? "ml-4" : index === visibleItems.length - 1 ? "mr-4" : ""
                            }`}
                            onClick={() => handleSensorClick(item.id)} 
                        >
                            <img
                                src={item.image}
                                alt={item.alt}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>

                {/* Indicadores */}
                <div className="flex justify-center !m-10 space-x-3">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`transition-all duration-300 cursor-pointer !m-1 ${
                                currentPage === index
                                    ? "bg-[#17CF96] w-16 h-4 rounded-full"
                                    : "bg-gray-300 w-4 h-4 rounded-full"
                            }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Carousel;
