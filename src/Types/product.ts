export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  price:number;
  image: string;
  emoji:string;
  today: number;
  name:string;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

export interface Category {
  id: string;
  nameBn: string;
  icon: string;
}