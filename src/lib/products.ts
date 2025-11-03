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
  includes: { item: string; quantity: number }[];
  new: boolean;
};

export const products: Product[] = [
  {
    id: 'xx99-mark-II',
    slug: 'xx99-mark-II',
    name: 'XX99 Mark II Headphones',
    category: 'headphones',
    price: 2999,
    description: 'The new XX99 Mark II headphones are the pinnacle of pristine audio. They redefine your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.',
    features: 'Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you are taking a business call or just in your own personal space, the auto on/off and pause features ensure that you will never miss a beat.',
    gallery: ['/headphone2.png', '/headphone1.png', '/headphone3.png'], // Use actual image paths
    image: '/headphone2.png',
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 },
      { item: 'Travel bag', quantity: 1 }
    ],
    new: true
  },
  {
    id: 'xx99-mark-I',
    slug: 'xx99-mark-I',
    name: 'XX99 Mark I Headphones',
    category: 'headphones',
    price: 1750,
    description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.',
    features: 'As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience.',
    gallery: ['/headphone1.png', '/headphone2.png', '/headphone3.png'],
    image: '/headphone1.png',
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 }
    ],
    new: false
  },
  {
    id: 'xx59',
    slug: 'xx59',
    name: 'XX59 Headphones',
    category: 'headphones',
    price: 899,
    description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.',
    features: 'These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel.',
    gallery: ['/headphone3.png', '/headphone1.png', '/headphone2.png'],
    image: '/headphone3.png',
    includes: [
      { item: 'Headphone unit', quantity: 1 },
      { item: 'Replacement earcups', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 5m audio cable', quantity: 1 }
    ],
    new: false
  },
  {
    id: 'zx9-speaker',
    slug: 'zx9-speaker',
    name: 'ZX9 Speaker',
    category: 'speakers',
    price: 4500,
    description: 'Upgrade your sound system with the all new ZX9 active speaker. It is a bookshelf speaker system that offers truly wireless connectivity, creating new possibilities for more pleasing and practical audio setups.',
    features: 'Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and XLR inputs, allowing you to have up to five wired source devices connected for easy switching.',
    gallery: ['/speakers.png', '/speakers2.png', '/speakers.png'],
    image: '/speakers.png',
    includes: [
      { item: 'Speaker unit', quantity: 2 },
      { item: 'Speaker cloth panel', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 10m audio cable', quantity: 1 },
      { item: '10m optical cable', quantity: 1 }
    ],
    new: true
  },
  {
    id: 'zx7-speaker',
    slug: 'zx7-speaker',
    name: 'ZX7 Speaker',
    category: 'speakers',
    price: 3500,
    description: 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.',
    features: 'Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound.',
    gallery: ['/speakers2.png', '/speakers.png', '/speakers2.png'],
    image: '/speakers2.png',
    includes: [
      { item: 'Speaker unit', quantity: 2 },
      { item: 'Speaker cloth panel', quantity: 2 },
      { item: 'User manual', quantity: 1 },
      { item: '3.5mm 7.5m audio cable', quantity: 1 },
      { item: '7.5m optical cable', quantity: 1 }
    ],
    new: false
  },
  {
    id: 'yx1-earphones',
    slug: 'yx1-earphones',
    name: 'YX1 Wireless Earphones',
    category: 'earphones',
    price: 599,
    description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.',
    features: 'Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit.',
    gallery: ['/earphones.png', '/earphones.png', '/earphones.png'],
    image: '/earphones.png',
    includes: [
      { item: 'Earphone unit', quantity: 2 },
      { item: 'Multi-size earplugs', quantity: 6 },
      { item: 'User manual', quantity: 1 },
      { item: 'USB-C charging cable', quantity: 1 },
      { item: 'Travel pouch', quantity: 1 }
    ],
    new: true
  }
];