import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { DropdownMenu } from "../components/DropdownMenu";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [historicoData, setHistoricoData] = useState({});
  const [environments, setEnvironments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const pageNumbers = Math.ceil(sensorData.length / itemsPerPage);

  // Filtros
  const [selectedPeriodStart, setSelectedPeriodStart] = useState(""); // exemplo: "2025-05-01T00:00:00"
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState("");     // exemplo: "2025-05-26T23:59:59"
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");
  const [searchTermSensor, setSearchTermSensor] = useState(""); 

  // Token de autenticação
  const token = localStorage.getItem("token");

  // Buscar ambientes para popular filtro de ambiente
  useEffect(() => {
    if (!token) return;

    const fetchEnvironments = async () => {
      try {
        const resp = await axios.get(
          "http://127.0.0.1:8000/api/ambientes/search",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { search: selectedEnvironment },
          }
        );
        setEnvironments(resp.data);
      } catch (err) {
        console.error("Erro ao buscar ambientes:", err);
      }
    };

    fetchEnvironments();
  }, [selectedEnvironment, token]);

  // Buscar sensores de acordo com filtro tipo sensor
  useEffect(() => {
    if (!token) return;

    const fetchSensors = async () => {
      try {
        const url = searchTermSensor
          ? "http://127.0.0.1:8000/api/sensores/search"
          : "http://127.0.0.1:8000/api/sensores";

        const params = {};
        if (searchTermSensor) params.search = searchTermSensor;
        if (selectedEnvironment) params.environment_id = selectedEnvironment;

        const resp = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        setSensorData(
          resp.data.map((sensor) => ({
            ...sensor,
            humidity: Math.floor(Math.random() * 100),
          }))
        );
      } catch (err) {
        console.error("Erro ao buscar sensores:", err);
      }
    };

    fetchSensors();
  }, [searchTermSensor, selectedEnvironment, token]); // <- adicionar selectedEnvironment aqui também


  // Buscar históricos filtrando por sensor e data (periodo)
  useEffect(() => {
    if (!token || !selectedSensor) {
      setHistoricoData({});
      return;
    }

    const fetchHistoricos = async () => {
      try {
        const params = {
          sensor: selectedSensor,
        };
        if (selectedPeriodStart) params.data_inicial = selectedPeriodStart;
        if (selectedPeriodEnd) params.data_final = selectedPeriodEnd;
        if (selectedEnvironment) params.environment_id = selectedEnvironment; // se backend aceitar

        const resp = await axios.get(
          "http://127.0.0.1:8000/api/historicos/filtrar/sensor-data",
          {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }
        );

        const historicoMap = {};
        resp.data.forEach((h) => {
          const sensorId = h.sensor;
          const timestamp = new Date(h.timestamp);
          if (
            !historicoMap[sensorId] ||
            timestamp > new Date(historicoMap[sensorId].timestamp)
          ) {
            historicoMap[sensorId] = h;
          }
        });

        setHistoricoData(historicoMap);
      } catch (err) {
        console.error("Erro ao buscar históricos:", err);
      }
    };

    fetchHistoricos();
  }, [selectedSensor, selectedPeriodStart, selectedPeriodEnd, selectedEnvironment, token]);

  useEffect(() => {
    setSelectedSensor("");
  }, [selectedEnvironment]);


  // Paginação do sensorData
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedSensors = sensorData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 !mt-30 max-w-[1800px] !ml-15 !mr-15">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <DropdownMenu
          onPeriodStartChange={setSelectedPeriodStart}
          onPeriodEndChange={setSelectedPeriodEnd}
          onEnvironmentChange={setSelectedEnvironment}
          onSensorChange={setSelectedSensor}
          environments={environments}
          sensors={sensorData}
        />

        {/* Busca tipo sensor */}
        <input
          type="text"
          placeholder="Search type of sensor"
          className="border rounded-lg px-3 py-2 league-regular"
          value={searchTermSensor}
          onChange={(e) => setSearchTermSensor(e.target.value)}
        />
      </div>

      <div className="grid gap-6 grid-cols-1">
        {pagedSensors.map((sensor, index) => (
          <Card key={sensor.id || index}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl league-regular text-[32px] font-bold">
                  {sensor.sensor || "Sensor"}
                </h3>
                <p className="text-sm league-regular">ID: {sensor.id}</p>
                <p className="text-sm league-regular">
                  Mac Address: {sensor.mac_address}
                </p>
                <p className="text-sm text-black league-regular">
                  R${" "}
                  {historicoData[sensor.id]
                    ? historicoData[sensor.id].valor.toFixed(2)
                    : "Preço não disponível"}
                </p>
              </div>

              <div className="w-1/3 !mr-10">
                <ReactApexChart
                  options={{
                    chart: {
                      height: 100,
                      type: "line",
                      toolbar: { show: false },
                    },
                    stroke: { width: 3, curve: "smooth" },
                    xaxis: {
                      type: "datetime",
                      categories: [
                        "1/11/2000",
                        "2/11/2000",
                        "3/11/2000",
                        "4/11/2000",
                        "5/11/2000",
                        "6/11/2000",
                        "7/11/2000",
                        "8/11/2000",
                        "9/11/2000",
                        "10/11/2000",
                        "11/11/2000",
                        "12/11/2000",
                        "1/11/2001",
                        "2/11/2001",
                        "3/11/2001",
                        "4/11/2001",
                        "5/11/2001",
                        "6/11/2001",
                      ],
                      labels: {
                        formatter: function (value, timestamp, opts) {
                          return opts.dateFormatter(
                            new Date(timestamp),
                            "dd MMM"
                          );
                        },
                      },
                    },
                    title: {
                      text: "Data",
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
                      name: "Data Collected",
                      data: [
                        4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17,
                        2, 7, 5,
                      ],
                    },
                  ]}
                  type="line"
                  height={100}
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
  );
};

export default Dashboard;
