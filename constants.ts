import { Dream } from './types';

export const MOCK_DREAMS: Dream[] = [
  {
    id: '1',
    title: 'Neon Rain Over Kyoto',
    description: 'A soothing flight through a cyberpunk version of ancient Kyoto. The rain tastes like electric blueberries.',
    price: 450,
    author: 'SleepWalker_99',
    tags: ['Flying', 'Cyberpunk', 'Rain'],
    rarity: 'Rare',
    intensity: 45,
    imageUrl: 'https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014619_1280.jpg', // Neon City Night
  },
  {
    id: '2',
    title: 'The Library of Lost Things',
    description: 'Wander through infinite spiral shelves containing every item you ever lost in childhood. Nostalgic and bittersweet.',
    price: 1200,
    author: 'Mnemosyne',
    tags: ['Nostalgia', 'Exploration', 'Mystery'],
    rarity: 'Legendary',
    intensity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop', // Infinite Library vibes
  },
  {
    id: '3',
    title: 'Velocity: Solar Flair',
    description: 'Racing a light-cycle on the surface of a dying star. High adrenaline, heat feedback enabled.',
    price: 890,
    author: 'AdrenalineJunkie',
    tags: ['Action', 'Space', 'Racing'],
    rarity: 'Rare',
    intensity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop', // Solar Surface
  },
  {
    id: '4',
    title: 'Tea with a Void Entity',
    description: 'A philosophical conversation with a shapeless shadow in a white room. It answers one question truthfully.',
    price: 5000,
    author: 'Oracle_Null',
    tags: ['Horror', 'Philosophy', 'Surreal'],
    rarity: 'Forbidden',
    intensity: 80,
    imageUrl: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=1600&auto=format&fit=crop', // Abstract Void
  },
    {
    id: '5',
    title: 'Underwater Breathing',
    description: 'Swimming through a coral reef made of gemstones. Complete sensory relaxation.',
    price: 200,
    author: 'DeepBlue',
    tags: ['Relaxation', 'Nature'],
    rarity: 'Common',
    intensity: 10,
    imageUrl: 'https://cdn.pixabay.com/photo/2022/11/08/07/23/jellyfish-7577898_1280.jpg', // Bioluminescent Underwater
  },
  {
    id: '6',
    title: 'Golden Age Banquet',
    description: 'A never-ending feast in a Victorian palace. You can taste every dish without getting full.',
    price: 600,
    author: 'GourmetDreamer',
    tags: ['Food', 'History', 'Luxury'],
    rarity: 'Rare',
    intensity: 30,
    imageUrl: 'https://cdn.pixabay.com/photo/2013/09/05/10/38/catering-179046_1280.jpg', // Victorian Palace
  },
];

export const RARITY_COLORS = {
  Common: 'text-gray-300 border-gray-600/30 bg-gray-500/10',
  Rare: 'text-teal-200 border-teal-500/30 bg-teal-500/10 shadow-[0_0_15px_rgba(45,212,191,0.1)]',
  Legendary: 'text-amber-100 border-amber-300/30 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.1)]',
  Forbidden: 'text-rose-200 border-rose-500/30 bg-rose-900/20 shadow-[0_0_15px_rgba(225,29,72,0.1)]',
};