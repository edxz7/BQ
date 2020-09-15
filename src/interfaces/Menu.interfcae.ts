export interface MenuItem {
  category: number;
  itemName: string,
  type?: string[] | null,
  sizes?: Size[],
  extras?: {
    price: number,
    options?: string [] | null
  } | null
  imgUrl?: string;
}

export interface Size { size: string, price: number }

export interface MenuOrder {
  itemName: string; 
  type?: string;
  size?: string;
  extras?: string [];
  itemQty: number;
  total: number;
}