import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ApexChart from "../components/Dashboard";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const Data = () => {
    const [sensorData, setSensorData] = useState([]);

    const SENAI_BOUNDS = {
        latMin: -22.91,
        latMax: -22.90,
        lonMin: -47.06,
        lonMax: -47.05,
    };

    const ajusteParaSenai = (sensor) => {
        let lat = sensor.latitude;
        let lon = sensor.longitude;

        if (lat < SENAI_BOUNDS.latMin) lat = SENAI_BOUNDS.latMin + Math.random() * 0.001;
        if (lat > SENAI_BOUNDS.latMax) lat = SENAI_BOUNDS.latMax - Math.random() * 0.001;

        if (lon < SENAI_BOUNDS.lonMin) lon = SENAI_BOUNDS.lonMin + Math.random() * 0.001;
        if (lon > SENAI_BOUNDS.lonMax) lon = SENAI_BOUNDS.lonMax - Math.random() * 0.001;

        return { ...sensor, latitude: lat, longitude: lon };
    };


    useEffect(() => {
        const fetchSensorData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token não encontrado. Usuário não autenticado.");
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:8000/api/sensores", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Dados recebidos:", response.data);
                setSensorData(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados dos sensores:", error);
            }
        };

        fetchSensorData();
    }, []);


    return (
        <>
            <Header />
            <ApexChart />
            <div className="col-span-7 !mt-10 !mr-15 !ml-15">
                <h2 className="league-regular text-[#3C096C] font-semibold text-[64px]">
                    View on the Map
                </h2>
                <div className="w-full h-[500px] rounded-xl overflow-hidden">
                    <MapContainer
                        center={[-22.9075, -47.0586]} // Cordenadas do SENAI Roberto Mange no MAPS
                        zoom={16} 
                        scrollWheelZoom={true}
                        className="w-full h-full"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {sensorData
                            .filter(sensor => sensor.latitude && sensor.longitude)
                            .map(sensor => {
                                const sensorAjustado = ajusteParaSenai(sensor);
                                return (
                                    <Marker
                                        key={sensor.id}
                                        position={[sensorAjustado.latitude, sensorAjustado.longitude]}
                                    >
                                        <Popup>
                                            <div>
                                                <p className="league-regular"><strong className="league-regular">Sensor ID:</strong> {sensor.id}</p>
                                                <p className="league-regular"><strong className="league-regular">Mac Address:</strong> {sensor.mac_address}</p>
                                                <p className="league-regular"><strong className="league-regular">Sensor:</strong> {sensor.sensor}</p>
                                                <p className="league-regular"><strong className="league-regular">Status:</strong> {sensor.status ? "Ativo" : "Inativo"}</p>
                                                <p className="league-regular"><strong className="league-regular">Unidade de Medida:</strong> {sensor.unidade_med}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                    </MapContainer>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Data;
