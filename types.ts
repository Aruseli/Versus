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

export type Discipline = 'CrossFit' | 'Basketball' | 'Intellectual' | 'Weightlifting' | 'Running' | 'Yoga' | 'MartialArts' | 'Swimming';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';

export type PresetRule = {
  id: string;
  name: string;
  description: string;
  discipline: Discipline;
};

export type Vote = {
  id: string;
  battleId: string;
  voterId: string;
  votedFor: string; // participantId
  timestamp: Date;
};

export type VotingResult = {
  battleId: string;
  participant1Votes: number;
  participant2Votes: number;
  totalVotes: number;
  winnerId?: string;
};

export type SearchFilters = {
  query?: string;
  categories?: string[];
  statuses?: BattleStatus[];
  sortBy?: 'date' | 'popularity' | 'status';
};