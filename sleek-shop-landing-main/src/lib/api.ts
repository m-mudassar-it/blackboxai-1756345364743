// src/lib/api.ts

import { API_BASE_URL } from './config';

// ---------- CATEGORY TYPES & FUNCTIONS (from earlier) ----------

export interface Category {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface CreateCategoryPayload {
  name: string;
  description: string;
  status: string;
  created_by?: any;
}

interface UpdateCategoryPayload {
  description?: string;
  name?: string;
  status?: string;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Error fetching categories: ${res.statusText}`);
  return res.json();
}

export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error creating category: ${res.statusText}`);
  return res.json();
}

export async function updateCategory(id: string, payload: UpdateCategoryPayload): Promise<Category> {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error updating category: ${res.statusText}`);
  return res.json();
}

// ---------- PRODUCT TYPES & FUNCTIONS ----------

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  sku: string;
  category_id?: string;
  price: string;
  discount?: string;
  quantity?: number;
  items_per_pack?: number;
  total_quantity?: number;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  images?: ProductImage[];
}

export interface ProductFormData {
  title: string;
  description?: string;
  sku: string;
  category_id?: string;
  price: number;
  discount?: number;
  quantity?: number;
  items_per_pack?: number;
  total_quantity?: number;
  tags?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  status?: string;
  primaryImage?: File;
  additionalImages?: File[];
  existingImages?: string[]; // Array of image IDs to keep
  removedImages?: string[]; // Array of image IDs to remove
}

// Create product (multipart/form-data)
export async function createProduct(formData: FormData): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    body: formData, // No content-type header! Let the browser set it.
  });
  if (!res.ok) throw new Error(`Error creating product: ${res.statusText}`);
  return res.json();
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Error fetching products: ${res.statusText}`);
  return res.json();
}

// Get products with category information and images
export async function getProductsWithCategories(): Promise<(Product & { category_name?: string })[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Error fetching products: ${res.statusText}`);
  return res.json();
}

// Get single product
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Error fetching product: ${res.statusText}`);
  return res.json();
}

// Update product (multipart/form-data)
export async function updateProduct(id: string, formData: FormData): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error(`Error updating product: ${res.statusText}`);
  return res.json();
}

// Update product status only
export async function updateProductStatus(id: string, status: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Error updating product status: ${res.statusText}`);
  return res.json();
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error deleting product: ${res.statusText}`);
}

// Helper function to prepare FormData for product creation/update
export function prepareProductFormData(data: ProductFormData): FormData {
  const formData = new FormData();
  
  // Add basic fields
  formData.append('title', data.title);
  formData.append('sku', data.sku);
  formData.append('price', data.price.toString());
  
  if (data.description) formData.append('description', data.description);
  if (data.category_id && data.category_id !== 'no-category' && data.category_id.trim() !== '') formData.append('category_id', data.category_id);
  if (data.discount) formData.append('discount', data.discount.toString());
  if (data.quantity) formData.append('quantity', data.quantity.toString());
  if (data.items_per_pack) formData.append('items_per_pack', data.items_per_pack.toString());
  if (data.total_quantity) formData.append('total_quantity', data.total_quantity.toString());
  if (data.tags) formData.append('tags', data.tags);
  if (data.meta_title) formData.append('meta_title', data.meta_title);
  if (data.meta_description) formData.append('meta_description', data.meta_description);
  if (data.meta_keywords) formData.append('meta_keywords', data.meta_keywords);
  if (data.status) formData.append('status', data.status);
  
  // Add existing images to keep
  if (data.existingImages) {
    data.existingImages.forEach((imageId) => {
      formData.append('existing_images', imageId);
    });
  }
  
  // Add removed images
  if (data.removedImages) {
    data.removedImages.forEach((imageId) => {
      formData.append('removed_images', imageId);
    });
  }
  
  // Add new images
  if (data.primaryImage) {
    formData.append('images', data.primaryImage);
  }
  
  if (data.additionalImages) {
    data.additionalImages.forEach((image, index) => {
      formData.append('images', image);
    });
  }
  
  return formData;
}
