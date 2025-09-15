import React from "react";
import SkeletonItem from "../atoms/SkeletonItem";
import SearchResultItem from "../molecules/SearchResultItem";

const SearchResultsList = ({ isLoading, results, isClearing, searchTerm }) => {
  if (isLoading) {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </div>
    );
  }

  if (results.length === 0 && !isClearing) {
    return (
      <div className="text-center py-10 text-gray-500">No results found.</div>
    );
  }

  return (
    <div className={isClearing ? "list-is-clearing" : ""}>
      {results.map((item, index) => (
        <div
          key={item.id}
          className="stagger-item"
          style={{ "--stagger-reverse-index": results.length - 1 - index }}
        >
          <SearchResultItem item={item} searchTerm={searchTerm} />
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
