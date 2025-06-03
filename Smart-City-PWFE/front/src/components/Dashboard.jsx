import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { DropdownMenu } from "../components/DropdownMenu";
import ReactApexChart from "react-apexcharts";
import { Search } from "lucide-react";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [historicoData, setHistoricoData] = useState({});
  const [environments, setEnvironments] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const pageNumbers = Math.ceil(sensorData.length / itemsPerPage);

  // Filtros
  const [selectedPeriodStart, setSelectedPeriodStart] = useState("");
  const [selectedPeriodEnd, setSelectedPeriodEnd] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [searchTermSensor, setSearchTermSensor] = useState("");

  const token = localStorage.getItem("token");

  // Buscar ambientes (uma vez)
  useEffect(() => {
    const fetchEnvironments = async () => {
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnvironments(response.data);
      } catch (error) {
        console.error("Erro ao buscar ambientes:", error);
      }
    };

    fetchEnvironments();
  }, [token]);

  // Buscar sensores conforme filtro ambiente e busca por nome
  useEffect(() => {
    const fetchSensors = async () => {
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }

      try {
        const url = searchTermSensor
          ? "http://127.0.0.1:8000/api/sensores/search"
          : "http://127.0.0.1:8000/api/sensores";

        const params = {};
        if (searchTermSensor) params.search = searchTermSensor;
        if (selectedEnvironment) params.ambiente_id = selectedEnvironment;

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
  }, [searchTermSensor, selectedEnvironment, token]);

  // Buscar histórico filtrado por sensor, período e ambiente
  useEffect(() => {
    const fetchHistoricos = async () => {
      console.log("Filtros usados para buscar histórico:");
      console.log("selectedSensor:", selectedSensor);
      console.log("selectedPeriodStart:", selectedPeriodStart);
      console.log("selectedPeriodEnd:", selectedPeriodEnd);
      console.log("selectedEnvironment:", selectedEnvironment);

      if (!selectedSensor) {
        console.log("Nenhum sensor selecionado. Limpando histórico.");
        setHistoricoData({});
        return;
      }
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }

      try {
        const params = { sensor: selectedSensor.id };

        if (selectedPeriodStart) {
          params.data_inicial = formatDate(selectedPeriodStart);
        }
        if (selectedPeriodEnd) {
          params.data_final = formatDate(selectedPeriodEnd);
        }
        if (selectedEnvironment) {
          params.ambiente_id = selectedEnvironment;
        }

        console.log("Parâmetros enviados na requisição:", params);

        const url =
          selectedPeriodEnd && new Date(selectedPeriodEnd) - new Date(selectedPeriodStart) < 86400000
            ? "http://127.0.0.1:8000/api/historicos/filtrar/sensor-data-hora"
            : "http://127.0.0.1:8000/api/historicos/filtrar/sensor-data";

        const resp = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        console.log("Resposta do histórico:", resp.data);

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


  // Resetar sensor quando ambiente mudar
  useEffect(() => {
    setSelectedSensor(null);
  }, [selectedEnvironment]);

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pagedSensors = sensorData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 !mt-30 max-w-[1800px] !ml-15 !mr-15">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <DropdownMenu
          selectedEnvironment={selectedEnvironment}
          selectedSensor={selectedSensor}
          setSelectedEnvironment={setSelectedEnvironment}
          setSelectedSensor={setSelectedSensor}
          environments={environments}
          sensors={sensorData}
          onEnvironmentChange={setEnvironments}
          onSensorChange={setSensorData}
          selectedPeriodStart={selectedPeriodStart}
          selectedPeriodEnd={selectedPeriodEnd}
          setSelectedPeriodStart={setSelectedPeriodStart}
          setSelectedPeriodEnd={setSelectedPeriodEnd}
        />

        <div className="relative w-[250px]">
          <Search
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search type of sensor"
            className="border rounded-lg px-3 py-2 league-regular !pl-7"
            value={searchTermSensor}
            onChange={(e) => setSearchTermSensor(e.target.value)}
          />
        </div>
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
