import React, { useState, useEffect } from "react";
import axios from "axios";
import Sensor1 from "../assets/Sensor 1.png";
import Sensor2 from "../assets/Sensor 2.png";
import Sensor3 from "../assets/Sensor 3.png";
import CityCarrossel from "../assets/CityCarrossel.png"
import Header from "../components/Header";
import Footer from "../components/Footer"
import SensorModal from "../components/SensorModal";
import { Check, X, Trash2, Pencil } from 'lucide-react';
import { CiCirclePlus } from "react-icons/ci";
import { CgArrowDownR } from "react-icons/cg";
import CarouselSensor from "../components/CarouselSensor";
import CarouselSensor2 from "../components/CarouselSensor2";

export default function Sensors() {
  const allImages = [
    { src: Sensor1, alt: "Temperature", label: "Temperature", title: "Efficient and Reliable Temperature Monitoring", text: "Tracks environmental temperature for optimized climate control and accurate data analysis." },
    { src: Sensor2, alt: "Humidity", label: "Humidity", title: "Precise and Adaptive Humidity Detection", text: "Monitors air moisture levels for enhanced climate management and efficient resource utilization." },
    { src: Sensor3, alt: "Luminosity", label: "Luminosity", title: "Advanced Light Intensity Measurement Tool", text: "Ensures optimal lighting efficiency in smart systems and adaptable environments." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null)
  const sensorsPerPage = 10;

  useEffect(() => {
    const fetchSensors = async () => {

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
        setTableData(response.data);
      } catch (error) {
        console.error("Erro ao buscar sensores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSensors();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [allImages.length]);


  const bigImage = allImages[currentIndex];

  const carrosselData = [
    {
      text: "Smart cities use technology to improve urban life, making services efficient and sustainable.",
      image: CityCarrossel,
    },
    {
      text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: CityCarrossel,
    },
    {
      text: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
      image: CityCarrossel,
    },
  ];

  const handleNext2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex === carrosselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev2 = () => {
    setCurrentIndex2((prevIndex) =>
      prevIndex === 0 ? carrosselData.length - 1 : prevIndex - 1
    );
  };

  const currentItem = carrosselData[currentIndex2];
  const indexOfLastSensor = currentPage * sensorsPerPage;
  const indexOfFirstSensor = indexOfLastSensor - sensorsPerPage;
  const currentSensors = tableData.slice(indexOfFirstSensor, indexOfLastSensor);
  const pageNumbers = Math.ceil(tableData.length / sensorsPerPage);


  function openNewModal() {
    setEditingSensor(null);
    setIsModalOpen(true);
  }

  function openEditModal(sensor) {
    setEditingSensor(sensor);
    setIsModalOpen(true);
  }

  // Função para excluir sensor (DELETE)
  function handleDelete(sensorToDelete) {
    if (window.confirm("Are you sure you want to delete?")) {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://127.0.0.1:8000/api/sensores/${sensorToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setTableData(tableData.filter((item) => item !== sensorToDelete));
          console.log("Sucess to delete sensor.");
        })
        .catch((error) => {
          console.error("Error to delete sensor:", error);
        });
    }
  }

  function handleSave(sensor) {
    if (editingSensor) {
      setTableData(
        tableData.map((item) => (item.id === sensor.id ? sensor : item))
      );
    } else {
      setTableData([...tableData, sensor]);
    }
    setIsModalOpen(false);
  }

  function getSensorImage(sensorType) {
    switch (sensorType.toLowerCase()) {
      case "contador":
        return Sensor3;
      case "temperatura":
        return Sensor2;
      case "umidade":
        return Sensor3;
      case "luminosidade":
        return Sensor1;
      default:
        return Sensor3;
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="w-full !p-20 !mt-15 overflow-x-auto max-w-450">
          <p className="league-regular font-thin text-[16px] flex justify-end !mb-5 text-[#77625C]">
            Visit the page Data to see more details <br />
            about the sensors and there you can filter*
          </p>
          <table className="table-auto w-full text-left lateef-regular font-regular text-[32px]">
            <thead className="border-collapse border-b border-[#3C096C]">
              <tr className="text-[#3C096C]">
                <th className="px-4 py-2 font-medium">Image</th>
                <th className="px-4 py-2 font-medium">Model</th>
                <th className="px-4 py-2 font-medium">Measure</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Mac-Address</th>
                <th className="px-4 py-2 font-medium">Latitude</th>
                <th className="px-4 py-2 font-medium">Longitude</th>
                <th
                  className="text-[#17CF96] cursor-pointer hover:text-[#17cf95a6]"
                  onClick={openNewModal}
                >
                  <CiCirclePlus />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSensors.map((sensor, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <img
                      src={getSensorImage(sensor.sensor)}
                      alt={sensor.sensor}
                      className="w-30 h-30 !mt-8 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 text-black league-regular text-[24px] font-thin">{sensor.sensor}</td>
                  <td className="px-4 py-2 text-black league-regular text-[24px] font-thin">{sensor.unidade_med}</td>
                  <td className="px-4 py-2 text-center">
                    {sensor.status ? (
                      <Check className="text-[#48752C]" />
                    ) : (
                      <X className="text-[#CF1800]" />
                    )}
                  </td>
                  <td className="px-4 py-2 text-black league-regular text-[24px] font-thin">{sensor.mac_address}</td>
                  <td className="px-4 py-2 text-black league-regular text-[24px] font-thin">{sensor.latitude}</td>
                  <td className="px-4 py-2 text-black league-regular text-[24px] font-thin">{sensor.longitude}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <Pencil
                      className="text-[#528EE9] cursor-pointer hover:text-[#528ee9ab] !mt-15"
                      onClick={() => openEditModal(sensor)}
                    />
                    <button>
                      <Trash2
                        className="text-[#CF1800] cursor-pointer hover:text-[#cf1800a6] !mt-15"
                        onClick={() => handleDelete(sensor)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="flex justify-center items-center !mt-4">
            <div className="flex justify-center space-x-2">
              {currentPage > 2 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`border border-[#3C096C] text-24 league-regular font-medium w-10 h-10 flex items-center justify-center transition-all duration-200 text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer`}
                  >
                    1
                  </button>
                  <span className="text-[#3C096C] text-[40px] !ml-2 !mr-2">...</span>
                </>
              )}

              {Array.from({ length: 3 }, (_, i) => i + currentPage - 1)
                .filter((page) => page > 0 && page <= pageNumbers)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`border border-[#3C096C] text-24 league-regular font-medium w-10 h-10 flex items-center justify-center transition-all duration-200
            ${currentPage === page
                        ? "bg-[#3C096C] text-white"
                        : "text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer"}`}
                  >
                    {page}
                  </button>
                ))}

              {currentPage < pageNumbers - 1 && (
                <>
                  <span className="text-[#3C096C] font-medium text-[40px] !ml-2 !mr-2">...</span>
                  <button
                    onClick={() => setCurrentPage(pageNumbers)}
                    className={`border border-[#3C096C] text-24 league-regular font-medium w-10 h-10 flex items-center justify-center transition-all duration-200 text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer`}
                  >
                    {pageNumbers}
                  </button>
                </>
              )}
            </div>
          </div>

          <CarouselSensor
            images={allImages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

          <CarouselSensor2
            items={carrosselData}
            currentIndex={currentIndex2}
            onNext={handleNext2}
            onPrev={handlePrev2}
          />

        </div>
      </div>
      <Footer />
      <SensorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        sensorData={editingSensor}
      />
    </>
  );
}