/**
 * Takes a descriptive status string and returns a simplified presence state.
 * This function determines the COLOR of the status dot on an avatar.
 */
export const derivePresenceFromStatus = (status) => {
  if (status === "Active now") {
    return "online";
  }
  if (status.toLowerCase().includes("active")) {
    return "away";
  }
  return "offline";
};

const getItemCategoryTitle = (item) => {
  switch (item.type) {
    case "person":
      if (item.status === "Active now") {
        return "Active Now";
      }
      if (item.status.toLowerCase().includes("active")) {
        return "Recently Active";
      }
      if (item.status.toLowerCase().includes("unactivated")) {
        return "Offline";
      }
      return "People";

    case "file":
      return "Files & Folders";
    case "chat":
      return "Chats";
    case "list":
      return "Lists";
    default:
      return "Other";
  }
};

/**
 * THIS IS THE FUNCTION YOU ARE IMPORTING.
 * It takes a flat array of search results and groups them into categories.
 */
export const categorizeResults = (items) => {
  const categorized = items.reduce((acc, item) => {
    const category = getItemCategoryTitle(item);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const categoryOrder = [
    "Active Now",
    "Recently Active",
    "Offline",
    "Files & Folders",
    "Chats",
    "Lists",
    "Other",
  ];

  const sortedCategorized = {};
  categoryOrder.forEach((key) => {
    if (categorized[key]) {
      sortedCategorized[key] = categorized[key];
    }
  });

  return sortedCategorized;
};
