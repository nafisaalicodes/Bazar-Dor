export interface CategoryInfo {
  name: string;
  icon: string;
}

export const categoryData: Record<string, CategoryInfo> = {
  chal: {
    name: "Rice",
    icon: "🍚",
  },

  dal: {
    name: "Lentils",
    icon: "🫘",
  },

  tel: {
    name: "Oil",
    icon: "🛢️",
  },

  sobji: {
    name: "Vegetables",
    icon: "🥬",
  },

  mach: {
    name: "Fish",
    icon: "🐟",
  },

  mangsho: {
    name: "Meat",
    icon: "🍗",
  },

  "dim-dui": {
    name: "Eggs & Dairy",
    icon: "🥛",
  },

  mosla: {
    name: "Spices",
    icon: "🌶️",
  },
};