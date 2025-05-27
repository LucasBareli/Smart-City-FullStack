import React, { useState } from "react";
import { MdOutlineSensors } from "react-icons/md";
import { Lightbulb, Waves, ThermometerSun } from "lucide-react";

const Widgets = () => {
    const [activeCard, setActiveCard] = useState("Luminosity");
    const [visibleDescription, setVisibleDescription] = useState(null);

    const handleCardClick = (cardName) => {
        setActiveCard(cardName);
        setVisibleDescription(cardName);
    };

    const sensorDescriptions = {
        Counter: "The counter sensor is used to track incremental counts of specific events or activities, such as people entering a room or items passing a point on a conveyor belt.",
        Temperature: "The temperature sensor measures ambient temperature in its environment. It is widely used in weather stations, HVAC systems, and industrial processes to ensure optimal conditions.",
        Humidity: "The humidity sensor monitors the level of moisture in the air. It is critical for applications like climate control, agriculture, and indoor air quality management.",
        Luminosity: "The luminosity sensor detects the intensity of light in its surroundings. It is commonly employed in smart lighting systems, photography, and environmental monitoring.",
    };

    return (
        <section className="bg-white px-8 py-16">
            <div>
                <h2 className="text-[28px] font-bold text-[#77625C] ledger-regular !ml-4 w-40">Introduction</h2>
                <hr className="border-t border-[#000000] w-full" />
                <h3 className="text-[64px] league-regular text-[#3C096C] font-semibold w-160 !m-4">
                    Learn more about what we offer
                </h3>
                <p className="league-regular font-thin text-[16px] flex justify-end !mb-5 text-[#77625C]">
                    Select the sensor if you want to see more *
                </p>
            </div>
            <div className="grid grid-cols-12 gap-8 mt-10">
                {/* Mapa */}
                <div className="col-span-7">
                    <div className="w-full h-[500px] rounded-xl overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.564012282367!2d-47.06763282381148!3d-22.9002830418007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c89bf74286b7%3A0x761e0c9ea5da22e8!2sFaculdade%20de%20Tecnologia%20de%20Campinas%20(FATEC)!5e0!3m2!1spt-BR!2sbr!4v1690584485294!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                <div className="col-span-5 grid grid-cols-2 gap-4 !mt-6">
                    {Object.keys(sensorDescriptions).map((sensor, index) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(sensor)}
                            className={`flex flex-col items-center rounded-xl !ml-8 p-4 cursor-pointer transition-all duration-300 w-75 ${activeCard === sensor
                                ? "bg-[#3C096C] text-white border-[#3C096C] "
                                : "bg-white border-gray-300"
                                }`}
                            style={{ minHeight: "150px" }}
                        >
                            <div className="w-full flex justify-center">
                                <hr className="border-t border-[#3C096C] h-4 w-3/4 mb-4" />
                            </div>

                            <h4
                                className={`text-[22px] league-regular ${activeCard === sensor ? "text-white" : "text-[#3C096C]"}`}
                            >
                                {sensor}
                            </h4>

                            <div className="!mt-4">
                                {sensor === "Counter" && (
                                    <MdOutlineSensors
                                        className={`text-[32px] ${activeCard === sensor ? "text-white" : "text-[#3C096C]"}`}
                                    />
                                )}
                                {sensor === "Humidity" && (
                                    <Waves
                                        className={`text-[32px] ${activeCard === sensor ? "text-white" : "text-[#3C096C]"}`}
                                    />
                                )}
                                {sensor === "Temperature" && (
                                    <ThermometerSun
                                        className={`text-[32px] ${activeCard === sensor ? "text-white" : "text-[#3C096C]"}`}
                                    />
                                )}
                                {sensor === "Luminosity" && (
                                    <Lightbulb
                                        className={`text-[32px] ${activeCard === sensor ? "text-white" : "text-[#3C096C]"}`}
                                    />
                                )}
                            </div>

                            {/* Descrição */}
                            {activeCard === sensor && (
                                <p className="!m-4 text-[16px] league-regular font-thin">
                                    {visibleDescription === sensor
                                        ? sensorDescriptions[sensor]
                                        : sensorDescriptions[sensor].slice(0, 200)}
                                </p>
                            )}

                            {activeCard !== sensor && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCardClick(sensor);
                                    }}
                                    className="text-[16px] !mt-20 hover:underline league-regular font-thin"
                                >
                                    (See more)
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Widgets;