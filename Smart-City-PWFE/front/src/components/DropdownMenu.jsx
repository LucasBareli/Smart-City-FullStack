import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

export const DropdownMenu = ({
  onSensorChange,
  sensors = [],
  onEnvironmentChange,
  environments = [],
  selectedEnvironment,
  selectedSensor,
  selectedPeriodStart,
  selectedPeriodEnd,
  setSelectedPeriodStart,
  setSelectedPeriodEnd,
  setSelectedEnvironment,
  setSelectedSensor,
}) => {

  // Requisição para buscar os ambientes (apenas uma vez)
  useEffect(() => {
    if (environments.length === 0) {
      const fetchEnvironments = async () => {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          console.error("Token não encontrado. Usuário não autenticado.");
          return;
        }
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
            headers: { Authorization: `Bearer ${token}` },
          });
          onEnvironmentChange(response.data);
        } catch (error) {
          console.error("Erro ao buscar ambientes:", error);
        }
      };
      fetchEnvironments();
    }
  }, [environments, onEnvironmentChange]);

  // Requisição para buscar sensores com base no ambiente selecionado
  useEffect(() => {
    const fetchSensors = async () => {
      if (selectedEnvironment) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado. Usuário não autenticado.");
          return;
        }
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/sensores", {
            params: { ambiente_id: selectedEnvironment },
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Sensores carregados:", response.data); // 👈 ADICIONE ISSO
          onSensorChange(response.data);
        } catch (error) {
          console.error("Erro ao buscar sensores:", error);
        }
      } else {
        onSensorChange([]);
      }
    };

    fetchSensors();
  }, [selectedEnvironment, onSensorChange]);

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Environment Dropdown */}
      <select
        className="bg-[#3C096C] league-regular h-9 w-48 text-white px-4 py-2 rounded-full focus:outline-none cursor-pointer"
        value={selectedEnvironment}
        onChange={(e) => {
          console.log("Ambiente selecionado:", e.target.value);
          setSelectedEnvironment(e.target.value);
        }}
      >
        <option value="">Environment</option>
        {environments.map((env) => (
          <option key={env.id} value={env.id}>
            {env.descricao}
          </option>
        ))}
      </select>
      <div className="flex gap-4 mb-4">
        <label>
          Data inicial:
          <input
            type="datetime-local"
            value={selectedPeriodStart}
            onChange={(e) => setSelectedPeriodStart(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <label>
          Data final:
          <input
            type="datetime-local"
            value={selectedPeriodEnd}
            onChange={(e) => setSelectedPeriodEnd(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
      </div>

      <div className="relative">
        <select
          className="bg-[#17CF96] text-black league-regular px-6 py-2 h-9 rounded-full cursor-pointer"
          value={selectedSensor ? selectedSensor.sensor : ""}
          onChange={(e) => {
            const selected = sensors.find(sensor => sensor.sensor === e.target.value);
            console.log("Sensor selecionado:", selected);
            setSelectedSensor(selected || null);
          }}
        >
          <option value="">Sensor</option>
          <option value="temperatura">Temperatura</option>
          <option value="umidade">Umidade</option>
          <option value="contador">Contador</option>
          <option value="luminosidade">Luminosidade</option>
        </select>
      </div>

    </div>
  );
};