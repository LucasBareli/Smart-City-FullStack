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
  setSelectedEnvironment,
  setSelectedSensor,
}) => {
  const [showSensorDropdown, setShowSensorDropdown] = useState(false);

  // Requisição para buscar os ambientes (apenas uma vez)
  useEffect(() => {
    if (environments.length === 0) {
      const fetchEnvironments = async () => {
        const token = localStorage.getItem("token");
        console.log("Token:", token);  // Verifique se o token é válido
        if (!token) {
          console.error("Token não encontrado. Usuário não autenticado.");
          return;
        }
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/ambientes", {
            headers: { Authorization: `Bearer ${token}` },  // Passando o token no header
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
          });
          onSensorChange(response.data); // Atualiza os sensores conforme o ambiente
        } catch (error) {
          console.error("Erro ao buscar sensores:", error);
        }
      } else {
        onSensorChange([]); // Limpa os sensores se não houver ambiente selecionado
      }
    };

    fetchSensors();
  }, [selectedEnvironment, onSensorChange]);

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Environment Dropdown */}
      <select
        className="bg-[#3C096C] league-regular h-9 w-48 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedEnvironment}
        onChange={(e) => setSelectedEnvironment(e.target.value)} // Atualiza o estado ao selecionar ambiente
      >
        <option value="">Ambiente</option>
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

      {/* Sensor Dropdown */}
      <div className="relative">
        <button
          className="bg-[#17CF96] text-black league-regular px-6 py-2 h-9 rounded-full flex items-center gap-2"
          onClick={() => setShowSensorDropdown((prev) => !prev)}
        >
          {selectedSensor
            ? sensors.find((s) => s.id === selectedSensor)?.sensor || selectedSensor
            : "Sensor"}
          <FaChevronDown />
        </button>

        {showSensorDropdown && (
          <div className="absolute top-full mt-1 right-0 w-48 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {sensors.length === 0 && <p className="p-2 text-gray-500">Nenhum sensor encontrado</p>}
            {sensors.map((sensor) => (
              <div
                key={sensor.id}
                onClick={() => {
                  setSelectedSensor(sensor); // Atualiza o sensor selecionado
                  setShowSensorDropdown(false);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-[#3C096C] hover:text-white"
              >
                {sensor.sensor}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
