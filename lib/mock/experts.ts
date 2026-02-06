import { Expert } from '@/lib/types';

export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'exp-1',
    name: 'Dr. Sarah Chen',
    title: 'Senior React Architect',
    bio: 'Ex-Meta engineer specializing in performance and large-scale React patterns.',
    timezone: 'America/New_York', // EST
    avatarUrl: '/avatars/sarah.jpg',
    availability: {
      days: [1, 2, 3, 4, 5], // Mon-Fri
      startHour: 9, // 9 AM
      endHour: 17, // 5 PM
    },
    services: [
      { id: 'srv-1', name: 'Code Review (Async)', durationInMinutes: 30, price: 50, description: 'Deep dive into your PRs' },
      { id: 'srv-2', name: 'Architecture Consulation', durationInMinutes: 60, price: 150, description: 'Planning a scalable system' },
    ],
    websiteUrl: 'https://sarahcodes.io',
  },
  {
    id: 'exp-2',
    name: 'James Wilson',
    title: 'Full Stack & DevOps',
    bio: 'Wait at the intersection of weird bugs and AWS billing.',
    timezone: 'Europe/London', // GMT/BST
    avatarUrl: '/avatars/james.jpg',
    availability: {
      days: [2, 4], // Tue, Thu
      startHour: 14, // 2 PM
      endHour: 20, // 8 PM
    },
    services: [
      { id: 'srv-3', name: 'Debugging Session', durationInMinutes: 60, price: 120, description: 'Live debugging of your issue' },
    ]
  },
  {
    id: 'exp-3',
    name: 'Priya Patel',
    title: 'Product Designer',
    bio: 'Crafting pixel perfect UIs using Figma and Magic.',
    timezone: 'Asia/Kolkata', // IST
    avatarUrl: '/avatars/priya.jpg',
    availability: {
      days: [0, 6], // Weekends only
      startHour: 10,
      endHour: 18,
    },
    services: [
      { id: 'srv-4', name: 'Portfolio Review', durationInMinutes: 45, price: 80 },
    ]
  }
];

export function getExpertById(id: string): Expert | undefined {
  return MOCK_EXPERTS.find(e => e.id === id);
}
