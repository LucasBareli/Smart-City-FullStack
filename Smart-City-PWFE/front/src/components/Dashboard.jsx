import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";
import { DropdownMenu } from "../components/DropdownMenu";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [historicoData, setHistoricoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtros
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = sensorData.filter((sensor) =>
    sensor.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );



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
        console.log("API Response para sensores:", response.data);
        setSensorData(
          response.data.map((sensor) => ({
            ...sensor,
            humidity: Math.floor(Math.random() * 100),
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar dados dos sensores:", error);
      }

      let params = {};

      if (selectedPeriod) params.periodo = selectedPeriod;
      if (selectedTime) params.tempo = selectedTime;
      if (selectedEnvironment) params.search = selectedEnvironment;

      console.log("Filtros ativos:", { selectedPeriod, selectedTime, selectedEnvironment });
      console.log("Parâmetros enviados para a API de históricos:", params);

      try {
        const historicoResponse = await axios.get("http://127.0.0.1:8000/api/historicos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        });

        console.log("Historico Response:", historicoResponse.data);

        const historicoMap = {};

        historicoResponse.data.forEach((historico) => {
          if (!historicoMap[historico.sensor]) {
            historicoMap[historico.sensor] = historico.valor;
          } else {
            const existingTimestamp = new Date(historicoMap[historico.sensor].timestamp);
            const newTimestamp = new Date(historico.timestamp);

            if (newTimestamp > existingTimestamp) {
              historicoMap[historico.sensor] = historico.valor;
            }
          }
        });

        setHistoricoData(historicoMap);
      } catch (error) {
        console.error("Erro ao buscar dados históricos:", error);
      }
    };

    fetchSensorData();
  }, [selectedPeriod, selectedTime, selectedEnvironment]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sensorData.slice(startIndex, endIndex);

  return (
    <div className="p-6 !mt-30 max-w-[1800px] !ml-15 !mr-15">
      <div className="flex justify-between items-center">
        <DropdownMenu
          onPeriodChange={setSelectedPeriod}
          onTimeChange={setSelectedTime}
          onEnvironmentChange={setSelectedEnvironment}
        />
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg px-3 py-2 league-regular"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="!mt-6 grid gap-6 grid-cols-1">
        {currentData.map((sensor, index) => (
          <Card key={index}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl league-regular text-[32px] font-bold">Humidity Sensor</h3>
                <p className="text-sm league-regular">ID: {sensor.id}</p>
                <p className="text-sm league-regular">Mac Address: {sensor.mac_address}</p>
                <p className="text-sm text-black league-regular">
                  R$ {historicoData[sensor.id] || "Preço não disponível"}
                </p>
              </div>

              <div className="w-1/3 !mr-10">
                <ReactApexChart
                  options={{
                    chart: {
                      height: 100,
                      type: 'line',
                      toolbar: { show: false }
                    },
                    forecastDataPoints: { count: 7 },
                    stroke: {
                      width: 3,
                      curve: 'smooth'
                    },
                    xaxis: {
                      type: 'datetime',
                      categories: [
                        '1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000',
                        '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000',
                        '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001',
                        '4/11/2001', '5/11/2001', '6/11/2001'
                      ],
                      labels: {
                        formatter: function (value, timestamp, opts) {
                          return opts.dateFormatter(new Date(timestamp), 'dd MMM');
                        }
                      }
                    },
                    title: {
                      text: 'Data',
                      align: 'left',
                      style: {
                        fontSize: '14px',
                        color: '#666'
                      }
                    },
                    fill: {
                      type: 'gradient',
                      gradient: {
                        shade: 'dark',
                        gradientToColors: ['#3B00ED'],
                        shadeIntensity: 1,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100, 100, 100]
                      }
                    }
                  }}
                  series={[{
                    name: 'Sales',
                    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
                  }]}
                  type="line"
                  height={100}
                />
              </div>
            </div>

            <div className="!mt-20">
              <p className="text-black league-regular opacity-60 text-[16px]">Humidity: {sensor.humidity}%</p>
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
      <div className="flex justify-center items-center !mt-10">
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`border border-[#3C096C] text-24 league-regular font-medium w-10 h-10 flex items-center justify-center transition-all duration-200
                ${currentPage === page
                  ? 'bg-[#3C096C] text-white'
                  : 'text-[#3C096C] hover:bg-[#3C096C] hover:text-white cursor-pointer'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
