import { Battle, Notification, RankingEntry, User } from '@/types';

// Helper to generate placeholder images (Unsplash, более надёжно для продакшена)
const getAvatar = (id: number) =>
  `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=200&h=200&q=80&facepad=2&sat=-15&sig=${id}`;
const getCover = (id: number) =>
  `https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&h=600&q=80&sat=-15&sig=${id}`;

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'Игрок1',
  avatarUrl: getAvatar(99),
};

export const MOCK_STORIES: User[] = [
  { id: 's1', username: 'Игрок2', avatarUrl: getAvatar(101) },
  { id: 's2', username: 'Игрок3', avatarUrl: getAvatar(102) },
  { id: 's3', username: 'Игрок4', avatarUrl: getAvatar(103) },
  { id: 's4', username: 'Игрок5', avatarUrl: getAvatar(104) },
  { id: 's5', username: 'Игрок6', avatarUrl: getAvatar(105) },
];

export const MOCK_BATTLES: Battle[] = [
  {
    id: 'b1',
    title: 'Clean and jerk: 80 kg',
    category: 'CrossFit',
    status: 'active',
    participant1: { id: 'p1', username: 'Игрок2', avatarUrl: getAvatar(1) },
    participant2: { id: 'p2', username: 'Игрок1', avatarUrl: getAvatar(99) },
  },
  {
    id: 'b2',
    title: 'Slam Dunk',
    category: 'Basketball',
    status: 'waiting',
    participant1: { id: 'p3', username: 'Игрок3', avatarUrl: getAvatar(3) },
  },
  {
    id: 'b3',
    title: 'Slam Dunk',
    category: 'Basketball',
    status: 'finished',
    participant1: { id: 'p4', username: 'Игрок4', avatarUrl: getAvatar(4) },
    participant2: { id: 'p5', username: 'Игрок5', avatarUrl: getAvatar(5) },
    winnerId: 'p4',
    date: '12.08.25',
    stats: { views: 6700, comments: 256, shares: 148 }
  },
  {
    id: 'b4',
    title: 'Mathematics',
    category: 'Intellectual',
    status: 'finished',
    participant1: { id: 'p6', username: 'Игрок6', avatarUrl: getAvatar(6) },
    participant2: { id: 'p7', username: 'Игрок7', avatarUrl: getAvatar(7) },
    winnerId: 'p6',
  },
];

export const MOCK_RANKING: RankingEntry[] = [
  { id: 'r1', user: { id: 'p2', username: 'Игрок1', avatarUrl: getAvatar(99) }, rank: 1, points: 1241, trend: 'same' },
  { id: 'r2', user: { id: 'p1', username: 'Игрок2', avatarUrl: getAvatar(1) }, rank: 2, points: 1000, trend: 'up' },
  { id: 'r3', user: { id: 'p8', username: 'Игрок3', avatarUrl: getAvatar(8) }, rank: 3, points: 996, trend: 'down' },
  { id: 'r4', user: { id: 'p9', username: 'Игрок4', avatarUrl: getAvatar(9) }, rank: 4, points: 991, trend: 'up' },
  { id: 'r5', user: { id: 'p10', username: 'Игрок5', avatarUrl: getAvatar(10) }, rank: 5, points: 904, trend: 'down' },
  { id: 'r6', user: { id: 'p11', username: 'Игрок6', avatarUrl: getAvatar(11) }, rank: 6, points: 856, trend: 'up' },
  { id: 'r7', user: { id: 'p12', username: 'Игрок7', avatarUrl: getAvatar(12) }, rank: 7, points: 798, trend: 'down' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', user: { id: 'n_u1', username: 'Игрок8', avatarUrl: getAvatar(20) }, message: 'Applied to your contest', time: '11:30', isRead: false },
  { id: 'n2', user: { id: 'n_u2', username: 'Игрок9', avatarUrl: getAvatar(21) }, message: 'Has accepted your application for...', time: '09:11', isRead: true },
  { id: 'n3', user: { id: 'n_u3', username: 'Система', avatarUrl: getAvatar(22) }, message: 'The status of the competition has changed', time: '07:24', isRead: true },
];