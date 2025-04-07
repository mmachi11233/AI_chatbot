// src/types/Content.ts
export interface Content {
    _id?: string; // MongoDB ObjectId (as per your backend)
    title: string;
    text: string;
    createdAt?: string; // Dates will likely be strings from the API
    updatedAt?: string;
  }