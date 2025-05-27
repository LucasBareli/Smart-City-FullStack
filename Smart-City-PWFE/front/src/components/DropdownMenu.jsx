import React, { useEffect, useState } from "react";
import axios from "axios";

export const DropdownMenu = () => {
  const [timeOptions, setTimeOptions] = useState([]);
  const [environmentOptions, setEnvironmentOptions] = useState([]);
  const [periodOptions, setPeriodOptions] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  
  useEffect(() => {
    const fetchOptions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }

      try {
        const environmentResponse = await axios.get("http://127.0.0.1:8000/api/ambientes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnvironmentOptions(environmentResponse.data.map((env) => env.descricao));

        setTimeOptions(["Day", "Week", "Month"]);

        setPeriodOptions(["Last 24 hours", "Last Week", "Last Month", "Custom"]);
      } catch (error) {
        console.error("Erro ao buscar opções do backend:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleTimeChange = (e) => setSelectedTime(e.target.value);
  const handleEnvironmentChange = (e) => setSelectedEnvironment(e.target.value);
  const handlePeriodChange = (e) => setSelectedPeriod(e.target.value);

  return (
    <div className="flex items-center gap-4 p-4">
      <select
        className="bg-[#3C096C] league-regular h-9 w-20 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedPeriod}
        onChange={handlePeriodChange}
      >
        <option value="">Period</option>
        {periodOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="bg-[#3C096C] league-regular h-9 w-20 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedTime}
        onChange={handleTimeChange}
      >
        <option value="">Time</option>
        {timeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="bg-[#3C096C] league-regular h-9 w-28 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedEnvironment}
        onChange={handleEnvironmentChange}
      >
        <option value="">Environment</option>
        {environmentOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button className="bg-[#17CF96] text-black league-regular px-8 py-4 h-9 w-20 rounded-full">
        Sensor
      </button>
    </div>
  );
};
