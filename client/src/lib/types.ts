export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  gender: 'men' | 'women' | 'unisex';
  imageUrl: string;
  badge?: 'NEW' | 'SALE' | null;
  discount?: number | null;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  userName: string;
  userTitle?: string;
  userAvatarUrl?: string;
  createdAt: Date;
}

export interface CartItem {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}
