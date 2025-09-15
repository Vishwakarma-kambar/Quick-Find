import React, { useState } from "react";
import {
  DocumentIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  FolderIcon,
  ChatBubbleOvalLeftIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { derivePresenceFromStatus } from "../../utils/statusUtils";

const SearchResultItem = ({ item, searchTerm }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCopyButtonHovered, setIsCopyButtonHovered] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(item.url);
    setIsCopied(true);
    setIsCopyButtonHovered(true); // Keep tooltip visible
    setTimeout(() => {
      setIsCopied(false);
      setIsCopyButtonHovered(false); // Reset to follow the mouse
    }, 2000);
  };

  const handleOpenInNewTab = () => {
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight?.trim() || !text) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={index}
              className="font-bold text-gray-900 bg-red-200 rounded-sm"
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const getIcon = () => {
    switch (item.type) {
      case "person": {
        const presence = derivePresenceFromStatus(item.status);
        return (
          <div className="relative flex-shrink-0">
            <img
              src={item.avatar}
              alt={item.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span
              className={`absolute -bottom-1 -right-1 block h-4 w-4 rounded-full border-3 border-white ${
                {
                  online: "bg-green-500",
                  away: "bg-yellow-500",
                  offline: "bg-gray-400",
                }[presence]
              }`}
            />
          </div>
        );
      }
      case "chat":
        return (
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0">
            <ChatBubbleOvalLeftIcon className="h-6 w-6 text-gray-500" />
          </div>
        );
      case "list":
        return (
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0">
            <Bars3Icon className="h-6 w-6 text-gray-500" />
          </div>
        );
      case "file": {
        const isActualFile = item.name.includes(".");
        return (
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0">
            {isActualFile ? (
              <DocumentIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <FolderIcon className="h-6 w-6 text-gray-500" />
            )}
          </div>
        );
      }
      default:
        return (
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0">
            <DocumentIcon className="h-6 w-6 text-gray-500" />
          </div>
        );
    }
  };

  const getSecondaryTextString = () => {
    switch (item.type) {
      case "person":
        return item.status;
      case "file":
        return `in ${item.category} • Edited ${item.edited || item.added}`;
      case "chat":
        return `with ${item.person} • Last message ${item.last_message}`;
      case "list":
        return `${item.items} items • Updated ${item.updated}`;
      default:
        return "";
    }
  };

  return (
    <div
      className="flex items-center p-4 transition-colors duration-200 hover:bg-gray-50 border-b border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getIcon()}
      <div className="ml-4 flex-grow min-w-0">
        <div className="font-semibold text-gray-800 truncate">
          {getHighlightedText(item.name, searchTerm)}
        </div>
        <div className="text-sm text-gray-500 truncate">
          {getSecondaryTextString()}
        </div>
      </div>

      <div
        className={`flex items-center space-x-2 ml-4 group-hover:flex md:flex transition-opacity duration-200 ${
          isHovered ? "md:opacity-100" : "md:opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="relative"
          onMouseEnter={() => setIsCopyButtonHovered(true)}
          onMouseLeave={() => {
            if (!isCopied) setIsCopyButtonHovered(false);
          }}
        >
          {(isCopyButtonHovered || isCopied) && (
            <span className="absolute bottom-full -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-md">
              {isCopied ? "✓ Link copied!" : "Copy link"}
            </span>
          )}
          <button
            onClick={handleCopyLink}
            className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            <LinkIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={handleOpenInNewTab}
            className="rounded-md flex flex-column align-items-center justify-content-center gap-2 text-gray-400 cursor-pointer"
          >
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
            <span className="whitespace-nowrap text-s">New Tab</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
