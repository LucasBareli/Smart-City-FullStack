import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import ReactApexChart from "react-apexcharts";
import { DropdownMenu } from "./DropdownMenu";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [historicoData, setHistoricoData] = useState({});
  const [sensors, setSensors] = useState([]);

  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedPeriodStart, setSelectedPeriodStart] = useState("");
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token");

  // Buscar sensores gerais (sem filtro) - opcional, mantém sensorData para paginação
  useEffect(() => {
    const fetchSensors = async () => {
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }
      try {
        const url = "http://127.0.0.1:8000/api/sensores";
        const resp = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSensorData(
          resp.data.map((sensor) => ({
            ...sensor,
            humidity: Math.floor(Math.random() * 100),
          }))
        );
        setSensors(resp.data);
      } catch (err) {
        console.error("Erro ao buscar sensores:", err);
      }
    };
    fetchSensors();
  }, [token]);

  // Buscar históricos
  useEffect(() => {
    const fetchHistoricos = async () => {
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }
      try {
        const url = "http://127.0.0.1:8000/api/historicos";
        const resp = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Agrupar por sensorId
        const historicoMap = {};
        resp.data.forEach((h) => {
          const sensorId = h.sensor;
          if (!historicoMap[sensorId]) {
            historicoMap[sensorId] = [];
          }
          historicoMap[sensorId].push({
            x: new Date(h.timestamp).toISOString(),
            y: h.valor,
          });
        });
        setHistoricoData(historicoMap);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA", historicoMap);
      } catch (err) {
        console.error("Erro ao buscar históricos:", err);
      }
    };
    fetchHistoricos();
  }, [token]);

  // Filtrar sensores com base no filtro do DropdownMenu:
  const filteredSensors = sensorData.filter((sensor) => {
    // Filtrar por tipo de sensor
    if (selectedSensor && selectedSensor.sensor && sensor.sensor !== selectedSensor.sensor) return false;

    // Filtrar por período
    if (selectedPeriodStart || selectedPeriodEnd) {
      const historicos = historicoData[sensor.id] || [];
      const start = selectedPeriodStart ? new Date(selectedPeriodStart) : null;
      const end = selectedPeriodEnd ? new Date(selectedPeriodEnd) : null;
      const hasDataInRange = historicos.some((h) => {
        const data = new Date(h.x);
        if (start && data < start) return false;
        if (end && data > end) return false;
        return true;
      });
      if (!hasDataInRange) return false;
    }
    return true;
  });

  const pageNumbers = Math.ceil(filteredSensors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedSensors = filteredSensors.slice(startIndex, startIndex + itemsPerPage);

  console.log("selectedSensor:", selectedSensor);
  console.log("selectedPeriodStart:", selectedPeriodStart);
  console.log("selectedPeriodEnd:", selectedPeriodEnd);
  console.log("filteredSensors length:", filteredSensors.length);

  return (
    <>
      <DropdownMenu
        sensors={sensors}
        onSensorChange={setSensors}
        selectedSensor={selectedSensor}
        setSelectedSensor={setSelectedSensor}
        selectedPeriodStart={selectedPeriodStart}
        selectedPeriodEnd={selectedPeriodEnd}
        setSelectedPeriodStart={setSelectedPeriodStart}
        setSelectedPeriodEnd={setSelectedPeriodEnd}
      />

      <div className="p-6 max-w-[1800px] !ml-15 !mr-15 !mt-5">
        <div className="grid gap-6 grid-cols-1">
          {pagedSensors.map((sensor, index) => (
            <Card key={sensor.id || index}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl league-regular text-[32px] font-bold">
                    {sensor.sensor || "Sensor"}
                  </h3>
                  <p className="text-[22px] league-regular">ID: {sensor.id}</p>
                  <p className="text-[22px] league-regular">Mac Address: {sensor.mac_address}</p>
                  <p className="text-[22px] text-black league-regular">
                    R${" "}
                    {historicoData[sensor.id] && historicoData[sensor.id].length > 0
                      ? historicoData[sensor.id][historicoData[sensor.id].length - 1].y.toFixed(2)
                      : "Price is not avaliable"}
                  </p>
                </div>

                <div className="w-1/3 !mr-10">
                  <ReactApexChart
                    options={{
                      chart: {
                        height: 100,
                        type: "bar",
                        toolbar: { show: false },
                      },
                      dataLabels: { enabled: false },
                      stroke: { width: 2 },
                      xaxis: {
                        type: "datetime",
                        labels: {
                          datetimeFormatter: {
                            year: "yyyy",
                            month: "MMM 'yy",
                            day: "dd MMM",
                            hour: "HH:mm",
                          },
                        },
                      },
                      title: {
                        text: "Data Price",
                        align: "left",
                        style: { fontSize: "14px", color: "#666" },
                      },
                      fill: {
                        type: "gradient",
                        gradient: {
                          shade: "dark",
                          gradientToColors: ["#3B00ED"],
                          shadeIntensity: 1,
                          type: "horizontal",
                          opacityFrom: 1,
                          opacityTo: 1,
                          stops: [0, 100, 100, 100],
                        },
                      },
                    }}
                    series={[
                      {
                        name: "Valor",
                        data: historicoData[sensor.id] || [],
                      },
                    ]}
                    type="bar"
                    height={200}
                  />
                </div>
              </div>

              <div className="!mt-20">
                <p className="text-black league-regular opacity-60 text-[16px]">
                  Humidity: {sensor.humidity}%
                </p>
                <div className="h-2 bg-[#d9d9d9] rounded-full">
                  <div
                    className="h-2 bg-[#3C096C] rounded-full"
                    style={{ width: `${sensor.humidity}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center items-center !mt-4">
          <div className="flex justify-center space-x-2">
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="border border-[#3C096C] text-24 league-regular font-medium w-10 h-10 flex items-center justify-center transition-all duration-200 text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer"
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
                        : "text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer"
                      }`}
                >
                  {page}
                </button>
              ))}

            {currentPage < pageNumbers - 1 && (
              <>
                <span className="text-[#3C096C] font-medium text-[40px] !ml-2 !mr-2">...</span>
                <button
                  onClick={() => setCurrentPage(pageNumbers)}
                  className="border border-[#3C096C] text-24 league-regular font-medium w-10 h-10 flex items-center justify-center transition-all duration-200 text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer"
                >
                  {pageNumbers}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
