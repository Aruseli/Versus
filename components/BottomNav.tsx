'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IconHome, IconTrophy, IconBell, IconUser, IconPlus } from './Icons';

export const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes('/battle/') || pathname.includes('/create/')) return null;

  const NavItem = ({ to, icon: Icon, activePaths }: { to: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; activePaths: string[] }) => {
    const isActive = activePaths.includes(pathname);
    return (
      <button 
        onClick={() => router.push(to)}
        className={`relative flex flex-col items-center justify-center w-10 h-10 transition-all duration-300 group`}
      >
        <Icon 
            size={22} 
            strokeWidth={isActive ? 2.5 : 2} 
            className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} 
        />
        {isActive && (
            <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
        )}
      </button>
    );
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] z-50">
        <div className="bg-surfaceLight/80 backdrop-blur-xl border border-white/10 rounded-4xl h-[72px] px-6 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <NavItem to="/home" icon={IconHome} activePaths={['/home']} />
            <NavItem to="/ranking" icon={IconTrophy} activePaths={['/ranking']} />
            
            {/* Modern Create Button */}
            <div className="-mt-8 relative group cursor-pointer">
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <button 
                  onClick={() => router.push('/create/discipline')}
                  className="w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center transform group-hover:scale-105 group-active:scale-95 transition-all duration-300 relative z-10 border border-white/10 touch-manipulation"
                >
                    <IconPlus size={26} strokeWidth={2.5} />
                </button>
            </div>

            <NavItem to="/notifications" icon={IconBell} activePaths={['/notifications']} />
            <NavItem to="/profile" icon={IconUser} activePaths={['/profile']} />
        </div>
    </div>
  );
}