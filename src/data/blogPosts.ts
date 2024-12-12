import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding DeFi Protocols: A Deep Dive',
    excerpt: 'Explore the inner workings of decentralized finance protocols and their impact on traditional finance.',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 15, 2024',
    readTime: 8,
    tags: ['DeFi', 'Blockchain', 'Finance'],
    url: '/blog/understanding-defi-protocols',
  },
  {
    id: 2,
    title: 'Building Scalable Smart Contracts',
    excerpt: 'Learn best practices for writing efficient and scalable smart contracts on Ethereum.',
    coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 10, 2024',
    readTime: 12,
    tags: ['Solidity', 'Ethereum', 'Development'],
    url: '/blog/scalable-smart-contracts',
  },
  {
    id: 3,
    title: 'The Future of NFTs in Gaming',
    excerpt: 'Discover how NFTs are revolutionizing gaming economies and player ownership.',
    coverImage: 'https://images.unsplash.com/photo-1616509091215-57bbf1cd4b93?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 5, 2024',
    readTime: 6,
    tags: ['NFTs', 'Gaming', 'Web3'],
    url: '/blog/nfts-in-gaming',
  },
];