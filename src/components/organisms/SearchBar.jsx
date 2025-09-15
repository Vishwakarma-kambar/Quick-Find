import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import useDebounce from "../hooks/useDebounce";
import { fetchSearchResults } from "../../data/mockData";
import { SettingsDropdown } from "../molecules/SettingsDropdown";
import CategoryTabs from "../molecules/CategoryTabs";
import SearchResultsList from "./SearchResultsList";
import useOnClickOutside from "../hooks/useOnClickOutside";
import LoadingSpinner from "../atoms/LoadingSpinner";

const SearchBar = () => {
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [filters, setFilters] = useState({
    files: true,
    people: true,
    chats: false,
    lists: false,
  });
  const [activeTab, setActiveTab] = useState("all");

  // --- Custom Hooks for Advanced Functionality ---
  useOnClickOutside(dropdownRef, () => setIsSettingsOpen(false), triggerRef);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect to handle the global 's' key press for quick access
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger if the user is already typing in an input, textarea, etc.
      const isTyping =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable;

      if (event.key === "s" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // The empty array ensures this effect runs only once

  // --- Core Logic Functions (defined inside the component scope) ---
  const performSearch = useCallback(async (term) => {
    const masterSearchFilters = {
      files: true,
      people: true,
      chats: true,
      lists: true,
    };
    if (term) {
      setIsLoading(true);
      const allResults = await fetchSearchResults(term, masterSearchFilters);
      setSearchResults(allResults);
      setIsLoading(false);
    } else {
      setSearchResults([]);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (!searchTerm) return;
    const staggerDelay = 100;
    const baseAnimationDuration = 300;
    const totalDuration =
      baseAnimationDuration + (searchResults.length - 1) * staggerDelay;
    setIsClearing(true);
    setTimeout(() => {
      setSearchResults([]);
      setSearchTerm("");
      setIsClearing(false);
    }, totalDuration);
  }, [searchTerm, searchResults.length]);

  const handleFilterToggle = useCallback((filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: !prev[filterKey] }));
  }, []);

  useEffect(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  // --- Data Derivation for Rendering (Calculated on every render) ---
  const counts = {
    all: searchResults.length,
    files: searchResults.filter((r) => r.type === "file").length,
    people: searchResults.filter((r) => r.type === "person").length,
    chats: searchResults.filter((r) => r.type === "chat").length,
    lists: searchResults.filter((r) => r.type === "list").length,
  };

  const displayedResults = (() => {
    if (activeTab === "all") {
      return searchResults;
    }
    const tabTypeMapping = {
      files: "file",
      people: "person",
      chats: "chat",
      lists: "list",
    };
    const typeToFilter = tabTypeMapping[activeTab];
    return searchResults.filter((item) => item.type === typeToFilter);
  })();

  return (
    <div className="w-full max-w-2xl mx-auto my-10 bg-white rounded-lg shadow-lg border border-gray-200 relative">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          {isLoading ? (
            <LoadingSpinner className="h-5 w-5 text-gray-400 animate-spin ease-linear" />
          ) : (
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Searching is easier"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-4 text-lg bg-transparent focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 cursor-pointer underline"
            >
              Clear
            </button>
          )}
          {!searchTerm && (
            <div className="flex items-center space-x-2">
              <div className="text-s p-1 h-6 w-6 flex items-center justify-center font-semibold text-gray-500 border border-gray-300 rounded-md bg-gray-50">
                s
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                quick access
              </span>
            </div>
          )}
        </div>
      </div>

      <SettingsDropdown
        ref={dropdownRef}
        isVisible={isSettingsOpen}
        filters={filters}
        onFilterToggle={handleFilterToggle}
      />

      {searchTerm && (
        <div className="pt-4">
          <div className="flex justify-between items-center px-4 pb-1">
            <CategoryTabs
              counts={counts}
              activeTab={activeTab}
              onTabClick={setActiveTab}
              filters={filters}
            />
            <button
              ref={triggerRef}
              onClick={() => setIsSettingsOpen((prev) => !prev)}
              className="ml-4 p-1 rounded-md hover:bg-gray-100"
            >
              <Cog6ToothIcon
                className={`h-6 w-6 text-gray-500 transition-transform duration-300 cursor-pointer ${
                  isSettingsOpen ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>

          <div className="mt-2 relative max-h-96 overflow-y-auto">
            <SearchResultsList
              isLoading={isLoading}
              results={displayedResults}
              isClearing={isClearing}
              searchTerm={debouncedSearchTerm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
