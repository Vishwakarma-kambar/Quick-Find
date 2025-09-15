// A simple mock database
const allData = [
  {
    id: 1,
    type: "person",
    name: "Randall Johnsson",
    status: "Active now",
    activity: "active",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    url: "https://example.com/profiles/randall-johnsson",
  },
  {
    id: 2,
    type: "file",
    name: "Random Michal Folder",
    category: "Photos",
    files: 12,
    edited: "12m ago",
    url: "https://example.com/folders/random-michal",
  },
  {
    id: 3,
    type: "file",
    name: "crative_file_frandkies.jpg",
    category: "Photos/Assets",
    edited: "12m ago",
    url: "https://example.com/files/creative_file.jpg",
  },
  {
    id: 4,
    type: "person",
    name: "Kristinge Karand",
    status: "Active 2d ago",
    activity: "away",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    url: "https://example.com/profiles/kristinge-karand",
  },
  {
    id: 5,
    type: "file",
    name: "files_krande_michelle.avi",
    category: "Videos",
    added: "12m ago",
    url: "https://example.com/files/michelle.avi",
  },
  {
    id: 6,
    type: "person",
    name: "Caroline Dribbsson",
    status: "Unactivated",
    activity: "unactive",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    url: "https://example.com/profiles/caroline-dribbsson",
  },
  {
    id: 7,
    type: "person",
    name: "Adam Cadribean",
    status: "Active 1w ago",
    activity: "away",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    url: "https://example.com/profiles/adam-cadribean",
  },
  {
    id: 8,
    type: "file",
    name: "final_dribbble_presentation.jpg",
    category: "Presentations",
    edited: "1w ago",
    url: "https://example.com/files/dribbble_pres.jpg",
  },
  {
    id: 9,
    type: "person",
    name: "Margareth Cendribgssen",
    status: "Active 1w ago",
    activity: "away",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    url: "https://example.com/profiles/margareth-cendribgssen",
  },
  {
    id: 10,
    type: "file",
    name: "dribbble_animation.avi",
    category: "Videos",
    added: "1y ago",
    url: "https://example.com/files/dribbble_anim.avi",
  },
  {
    id: 11,
    type: "file",
    name: "Dribbble Folder",
    category: "Projects",
    files: 12,
    edited: "2m ago",
    url: "https://example.com/folders/dribbble-projects",
  },
  {
    id: 12,
    type: "chat",
    name: "Weekly Sync with Marketing",
    person: "Kristinge Karand",
    last_message: "3h ago",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    url: "https://example.com/chats/marketing-sync",
  },
  {
    id: 13,
    type: "list",
    name: "Q4 Launch Checklist",
    items: 8,
    updated: "1d ago",
    url: "https://example.com/lists/q4-launch",
  },
  {
    id: 14,
    type: "chat",
    name: "Project Phoenix standup",
    person: "Adam Cadribean",
    last_message: "yesterday",
    url: "https://example.com/chats/project-phoenix",
  },
];

export const fetchSearchResults = async (query, filters) => {
  if (!query) {
    return [];
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowerCaseQuery = query.toLowerCase();

  const results = allData.filter((item) => {
    const typeMatch =
      (filters.files && item.type === "file") ||
      (filters.people && item.type === "person") ||
      (filters.chats && item.type === "chat") ||
      (filters.lists && item.type === "list");

    const nameMatch = item.name.toLowerCase().includes(lowerCaseQuery);
    return typeMatch && nameMatch;
  });

  return results;
};
