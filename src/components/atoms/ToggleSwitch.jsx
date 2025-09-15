import React from "react";

const ToggleSwitch = ({ icon, label, enabled, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-2 w-full">
      {/* Left: Icon + Label */}
      <div className="flex items-center">
        {icon && (
          <span
            className={`h-5 w-5 mr-3 flex items-center justify-center ${
              enabled ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {icon}
          </span>
        )}
        <span
          className={`text-sm font-medium ${
            enabled ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Right: Toggle Switch */}
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-4 w-[20%] rounded-full transition-colors duration-300 ease-in-out focus:outline-none active:outline-none cursor-pointer ${
          enabled ? "bg-black" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block w-3 h-3 bg-white transform rounded-full transition-transform duration-300 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
