import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
// export const API_URL = 'https://ecommerce-store-backend-production.up.railway.app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
