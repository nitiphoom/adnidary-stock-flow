
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  minStock: number;
  currentStock: number;
}

export interface ProductFormData {
  sku: string;
  name: string;
  category: string;
  unit: string;
  price: string;
  minStock: string;
}

export const CATEGORIES = ["อาหาร", "เครื่องดื่ม", "ของใช้", "เครื่องสำอาง", "อื่นๆ"];
export const UNITS = ["ชิ้น", "กิโลกรัม", "ลิตร", "แพ็ค", "กล่อง"];
