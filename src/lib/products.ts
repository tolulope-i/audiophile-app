// lib/products.ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'headphones'|'speakers'|'earphones';
  price: number;
  description: string;
  features: string;
  gallery: string[]; // image paths
  image: string;
};

export const products: Product[] = [
  {
    id: 'xx99-mark-two',
    slug: 'xx99-mark-two',
    name: 'XX99 Mark II Headphones',
    category: 'headphones',
    price: 2999,
    description: 'The new XX99 Mark II ...',
    features: 'Balanced sound, comfortable fit, durable build.',
    gallery: ['/images/xx99-1.jpg','/images/xx99-2.jpg','/images/xx99-3.jpg'],
    image: '/images/xx99-hero.jpg'
  },
  {
    id: 'zx9-speaker',
    slug: 'zx9',
    name: 'ZX9 Speaker',
    category: 'speakers',
    price: 4500,
    description: 'Powerful low end for music lovers.',
    features: 'High fidelity, 3-band EQ.',
    gallery: ['/images/zx9-1.jpg','/images/zx9-2.jpg','/images/zx9-3.jpg'],
    image: '/images/zx9-hero.jpg'
  },
  {
    id: 'yx1-earphones',
    slug: 'yx1',
    name: 'YX1 Wireless Earphones',
    category: 'earphones',
    price: 599,
    description: 'Small but mighty earphones.',
    features: 'Noise isolating, 10hr battery.',
    gallery: ['/images/yx1-1.jpg','/images/yx1-2.jpg'],
    image: '/images/yx1-hero.jpg'
  }
];
