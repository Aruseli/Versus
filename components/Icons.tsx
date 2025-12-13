
import { 
  Home, 
  Trophy, 
  Bell, 
  User, 
  MessageCircle, 
  Search, 
  SlidersHorizontal, 
  MoreHorizontal, 
  Plus, 
  Share2, 
  Eye, 
  MessageSquare,
  ArrowLeft,
  ChevronDown,
  Triangle,
  Play,
  Users,
  Swords
} from 'lucide-react';

export const IconHome = Home;
export const IconTrophy = Trophy;
export const IconBell = Bell;
export const IconUser = User;
export const IconMessage = MessageCircle;
export const IconSearch = Search;
export const IconFilter = SlidersHorizontal;
export const IconMore = MoreHorizontal;
export const IconPlus = Plus;
export const IconShare = Share2;
export const IconEye = Eye;
export const IconComment = MessageSquare;
export const IconBack = ArrowLeft;
export const IconChevronDown = ChevronDown;
export const IconTrend = Triangle;
export const IconPlay = Play;
export const IconGroup = Users;

// New Minimalist Logo
export const VsLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };
  const textSizes = { sm: 'text-xs', md: 'text-lg', lg: 'text-xl' };
  
  return (
    <div className={`${sizes[size]} rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative overflow-hidden shadow-xl`}>
      <div className="absolute inset-0 bg-linear-to-tr from-primary/40 to-accent/40 opacity-50"></div>
      <span className={`relative z-10 font-bold italic tracking-tighter text-white ${textSizes[size]}`}>VS</span>
    </div>
  );
};