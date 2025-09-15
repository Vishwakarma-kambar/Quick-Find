import React from "react";

const CategoryTabs = ({ counts, activeTab, onTabClick, filters }) => {
  const getCount = (type) => counts[type] || 0;

  const potentialTabs = [
    { key: "files", label: "Files" },
    { key: "people", label: "People" },
    { key: "chats", label: "Chats" },
    { key: "lists", label: "Lists" },
  ];

  const tabsToRender = [
    { key: "all", label: "All", count: getCount("all") },
    ...potentialTabs
      .filter((tab) => filters[tab.key])
      .map((tab) => ({ ...tab, count: getCount(tab.key) })),
  ];

  return (
    <div className="flex items-center space-x-6 overflow-auto">
      {tabsToRender.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
          className={`flex items-center space-x-2 text-sm pb-2 cursor-pointer focus:outline-none ${
            activeTab === tab.key
              ? "border-b-2 border-gray-800 text-gray-800 font-semibold"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span>{tab.label}</span>
          <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
