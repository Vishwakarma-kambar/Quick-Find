import React from "react";
import ToggleSwitch from "../atoms/ToggleSwitch";
import {
  PaperClipIcon,
  UserIcon,
  ChatBubbleOvalLeftIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export const SettingsDropdown = React.forwardRef(
  ({ isVisible, filters, onFilterToggle }, ref) => {
    const menuItems = [
      {
        key: "files",
        label: "Files",
        icon: <PaperClipIcon />,
      },
      {
        key: "people",
        label: "People",
        icon: <UserIcon />,
      },
      {
        key: "chats",
        label: "Chats",
        icon: <ChatBubbleOvalLeftIcon />,
      },
      {
        key: "lists",
        label: "Lists",
        icon: <Bars3Icon />,
      },
    ];

    return (
      <div
        ref={ref}
        className={`absolute top-30 right-4 w-52 bg-white rounded-lg shadow-xl p-4 z-10 transition-all duration-300 ease-in-out ${
          isVisible
            ? "opacity-100 transform scale-100"
            : "opacity-0 transform scale-95 pointer-events-none"
        }`}
      >
        {menuItems.map((item) => (
          <ToggleSwitch
            key={item.key}
            icon={item.icon}
            label={item.label}
            enabled={filters[item.key]}
            onToggle={() => onFilterToggle(item.key)}
          />
        ))}
      </div>
    );
  }
);
