import React from "react";

const SkeletonItem = () => {
  return (
    <div className="flex items-center space-x-4 p-4 animate-pulse">
      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonItem;
