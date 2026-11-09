import { axiosInstance } from '../api/axiosInstance';
import type { Product } from '../types';

export const productRequests = {
  async getAll(): Promise<Product[]> {
    const { data } = await axiosInstance.get<Product[]>('/products');
    return data;
  },
  async getCategories(): Promise<string[]> {
    const { data } = await axiosInstance.get<string[]>('/products/categories');
    return data;
  },
};
