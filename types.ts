export type User = {
  id: string;
  username: string;
  avatarUrl: string;
};

export type BattleStatus = 'active' | 'waiting' | 'finished';

export type Battle = {
  id: string;
  title: string;
  category: string;
  status: BattleStatus;
  participant1: User;
  participant2?: User; // Optional if waiting
  winnerId?: string;
  date?: string;
  stats?: {
    views: number;
    comments: number;
    shares: number;
  };
};

export type Notification = {
  id: string;
  user: User;
  message: string;
  time: string;
  isRead: boolean;
};

export type RankingEntry = {
  id: string;
  user: User;
  rank: number;
  points: number;
  trend: 'up' | 'down' | 'same';
};

export type TabType = 'competition' | 'participation' | 'results';
export type ProfileTabType = 'competition' | 'awards' | 'ranking';