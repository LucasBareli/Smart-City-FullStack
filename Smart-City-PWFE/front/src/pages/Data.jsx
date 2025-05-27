import React from "react";
import Header from "../components/Header";
import ApexChart from "../components/Dashboard";
import Footer from "../components/Footer";


const Data = () => {
    return (
        <>
            <Header />
            <ApexChart />
            <div className="col-span-7 !mt-10 !mr-15 !ml-15">
                <h2 className="league-regular text-[#3C096C] font-semibold text-[64px]">View on the Map</h2>
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
            <Footer />
        </>
    )
}

export default Data