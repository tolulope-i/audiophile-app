export type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'headphones'|'speakers'|'earphones';
  price: number;
  description: string;
  features: string;
  gallery: string[];
  image: string;
};

export const products: Product[] = [
  {
    id: 'xx99-mark-two',
    slug: 'xx99-mark-two',
    name: 'XX99 Mark II Headphones',
    category: 'headphones',
    price: 2999,
    description: 'The new XX99 Mark II headphones are the pinnacle of pristine audio. They redefine your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
    features: 'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you are taking a business call or just in your own personal space, the auto on/off and pause features ensure that you will never miss a beat.',
    gallery: ['/images/xx99-1.jpg','/images/xx99-2.jpg','/images/xx99-3.jpg'],
    image: '/images/xx99-hero.jpg'
  },
  {
    id: 'zx9-speaker',
    slug: 'zx9',
    name: 'ZX9 Speaker',
    category: 'speakers',
    price: 4500,
    description: 'Upgrade your sound system with the all new ZX9 active speaker. It is a bookshelf speaker system that offers truly wireless connectivity, creating new possibilities for more pleasing and practical audio setups.',
    features: 'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved Bluetooth technology offers near lossless audio quality at up to 328ft (100m).',
    gallery: ['/images/zx9-1.jpg','/images/zx9-2.jpg','/images/zx9-3.jpg'],
    image: '/images/zx9-hero.jpg'
  },
  {
    id: 'yx1-earphones',
    slug: 'yx1',
    name: 'YX1 Wireless Earphones',
    category: 'earphones',
    price: 599,
    description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
    features: 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.',
    gallery: ['/images/yx1-1.jpg','/images/yx1-2.jpg'],
    image: '/images/yx1-hero.jpg'
  }
];