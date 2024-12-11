// src/app/models/product.model.ts
export interface Product {
    id?: number;         // Optional: Unique identifier for the product
    name: string;       // Required: Name of the product
    price: number;      // Required: Price of the product
    description?: string; // Optional: Description of the product
    category?: string;   // Optional: Category of the product
  }