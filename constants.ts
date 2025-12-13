import { Battle, Notification, RankingEntry, User } from '@/types';

// Helper to generate placeholder images
const getAvatar = (id: number) => `https://picsum.photos/seed/user${id}/200/200`;
const getCover = (id: number) => `https://picsum.photos/seed/cover${id}/800/600`;

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'Beckhan_Dukaev',
  avatarUrl: getAvatar(99),
};

export const MOCK_STORIES: User[] = [
  { id: 's1', username: 'News', avatarUrl: getAvatar(101) },
  { id: 's2', username: 'Dmitry_23', avatarUrl: getAvatar(102) },
  { id: 's3', username: 'Legion_95', avatarUrl: getAvatar(103) },
  { id: 's4', username: 'Tam_Khan', avatarUrl: getAvatar(104) },
  { id: 's5', username: 'Predator', avatarUrl: getAvatar(105) },
];

export const MOCK_BATTLES: Battle[] = [
  {
    id: 'b1',
    title: 'Clean and jerk: 80 kg',
    category: 'CrossFit',
    status: 'active',
    participant1: { id: 'p1', username: 'Aegir_Bjorn', avatarUrl: getAvatar(1) },
    participant2: { id: 'p2', username: 'Beckhan_Dukaev', avatarUrl: getAvatar(99) },
  },
  {
    id: 'b2',
    title: 'Slam Dunk',
    category: 'Basketball',
    status: 'waiting',
    participant1: { id: 'p3', username: 'Robert_Gun', avatarUrl: getAvatar(3) },
  },
  {
    id: 'b3',
    title: 'Slam Dunk',
    category: 'Basketball',
    status: 'finished',
    participant1: { id: 'p4', username: 'Jordan_Kilganon', avatarUrl: getAvatar(4) },
    participant2: { id: 'p5', username: 'Filip_Nisiewicz', avatarUrl: getAvatar(5) },
    winnerId: 'p4',
    date: '12.08.25',
    stats: { views: 6700, comments: 256, shares: 148 }
  },
  {
    id: 'b4',
    title: 'Mathematics',
    category: 'Intellectual',
    status: 'finished',
    participant1: { id: 'p6', username: 'Sveta_Lim', avatarUrl: getAvatar(6) },
    participant2: { id: 'p7', username: 'Dinara_Rahi', avatarUrl: getAvatar(7) },
    winnerId: 'p6',
  },
];

export const MOCK_RANKING: RankingEntry[] = [
  { id: 'r1', user: { id: 'p2', username: 'Beckhan_Dukaev', avatarUrl: getAvatar(99) }, rank: 1, points: 1241, trend: 'same' },
  { id: 'r2', user: { id: 'p1', username: 'Aegir_Bjorn', avatarUrl: getAvatar(1) }, rank: 2, points: 1000, trend: 'up' },
  { id: 'r3', user: { id: 'p8', username: 'Charles_Korbla', avatarUrl: getAvatar(8) }, rank: 3, points: 996, trend: 'down' },
  { id: 'r4', user: { id: 'p9', username: 'Donovan87', avatarUrl: getAvatar(9) }, rank: 4, points: 991, trend: 'up' },
  { id: 'r5', user: { id: 'p10', username: 'Big_John', avatarUrl: getAvatar(10) }, rank: 5, points: 904, trend: 'down' },
  { id: 'r6', user: { id: 'p11', username: 'Robbert_Sm', avatarUrl: getAvatar(11) }, rank: 6, points: 856, trend: 'up' },
  { id: 'r7', user: { id: 'p12', username: 'Lion_1988', avatarUrl: getAvatar(12) }, rank: 7, points: 798, trend: 'down' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', user: { id: 'n_u1', username: 'Anatoly_Lesik', avatarUrl: getAvatar(20) }, message: 'Applied to your contest', time: '11:30', isRead: false },
  { id: 'n2', user: { id: 'n_u2', username: 'Evgeniy_mironov', avatarUrl: getAvatar(21) }, message: 'Has accepted your application for...', time: '09:11', isRead: true },
  { id: 'n3', user: { id: 'n_u3', username: 'System', avatarUrl: getAvatar(22) }, message: 'The status of the competition has changed', time: '07:24', isRead: true },
];