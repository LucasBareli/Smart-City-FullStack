import React, {useState, useEffect} from "react";

export const DropdownMenu = ({
  onPeriodStartChange,
  onPeriodEndChange,
  onEnvironmentChange,
  onSensorChange,
  environments = [],
  sensors = [],
}) => {
  const [timeOptions] = useState(["Day", "Week", "Month"]);
  const [periodOptions] = useState([
    "Last 24 hours",
    "Last Week",
    "Last Month",
    "Custom",
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [showSensorDropdown, setShowSensorDropdown] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState("");

  const computePeriodDates = (period) => {
    const now = new Date();
    let start = null;
    let end = now.toISOString();

    switch (period) {
      case "Last 24 hours":
        start = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        break;
      case "Last Week":
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "Last Month":
        start = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        ).toISOString();
        break;
      case "Custom":
        start = null;
        end = null;
        break;
      default:
        start = null;
        end = null;
    }
    return { start, end };
  };

  useEffect(() => {
    if (!onPeriodStartChange || !onPeriodEndChange) return;

    const { start, end } = computePeriodDates(selectedPeriod);

    onPeriodStartChange(start || "");
    onPeriodEndChange(end || "");
  }, [selectedPeriod, onPeriodStartChange, onPeriodEndChange]);

  useEffect(() => {
    if (onEnvironmentChange) onEnvironmentChange(selectedEnvironment);
  }, [selectedEnvironment, onEnvironmentChange]);

  useEffect(() => {
    if (onSensorChange) onSensorChange(selectedSensor);
  }, [selectedSensor, onSensorChange]);

  return (
    <div className="flex items-center gap-4 p-4">
      {/* Period Dropdown */}
      <select
        className="bg-[#3C096C] league-regular h-9 w-32 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value="">Period</option>
        {periodOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Time Dropdown */}
      <select
        className="bg-[#3C096C] league-regular h-9 w-24 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">Time</option>
        {timeOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Environment Dropdown */}
      <select
        className="bg-[#3C096C] league-regular h-9 w-48 text-white px-4 py-2 rounded-full focus:outline-none"
        value={selectedEnvironment}
        onChange={(e) => setSelectedEnvironment(e.target.value)}
      >
        <option value="">Environment</option>
        {environments.map((env) => (
          <option key={env.id} value={env.id}>
            {env.descricao}
          </option>
        ))}
      </select>

      {/* Sensor Dropdown Toggle */}
      <div className="relative">
        <button
          className="bg-[#17CF96] text-black league-regular px-6 py-2 h-9 rounded-full"
          onClick={() => setShowSensorDropdown((prev) => !prev)}
        >
          {selectedSensor
            ? sensors.find((s) => s.id === selectedSensor)?.sensor || selectedSensor
            : "Sensor"}
        </button>

        {showSensorDropdown && (
          <div className="absolute top-full mt-1 right-0 w-48 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {sensors.length === 0 && (
              <p className="p-2 text-gray-500">No sensors found</p>
            )}
            {sensors.map((sensor) => (
              <div
                key={sensor.id}
                onClick={() => {
                  setSelectedSensor(sensor.id);
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
