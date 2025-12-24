'use client';

import { useRouter } from 'next/navigation';
import { MOCK_NOTIFICATIONS } from '@/constants';
import { Input } from '@/components/Input';

export const NotificationsScreen = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-white pt-6 px-4 pb-24">
      <h1 className="text-center text-2xl font-bold mb-6 tracking-wide drop-shadow-md text-zinc-200">Notification</h1>

      <div className="mb-6">
        <Input
          leftIcon="search"
          placeholder="Search..."
          variant="minimal"
          size="sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        {MOCK_NOTIFICATIONS.map(notif => (
            <button
              key={notif.id}
              onClick={() => router.push(`/notifications/${notif.id}`)}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer touch-manipulation text-left"
              style={{ minHeight: '44px' }}
            >
                <div className="relative shrink-0">
                    <img src={notif.user.avatarUrl} className="w-12 h-12 rounded-full object-cover" alt="" />
                    {!notif.isRead && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold text-sm text-zinc-100">{notif.user.username}</h4>
                        <span className="text-xs text-zinc-500">{notif.time}</span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-tight line-clamp-2">
                        {notif.message}
                    </p>
                </div>
            </button>
        ))}
         {/* Mock extra notification for "Sergio and 4 others" */}
         <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer">
             <div className="relative shrink-0 w-12 h-12">
                 <img src="https://picsum.photos/seed/s1/50/50" className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-background z-10" alt="" />
                 <img src="https://picsum.photos/seed/s2/50/50" className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-background z-0 grayscale opacity-70" alt="" />
             </div>
             <div className="flex-1 min-w-0 pt-0.5 ml-1">
                 <div className="flex justify-between items-baseline mb-0.5">
                     <h4 className="font-bold text-sm text-zinc-100">Sergio and 4 others</h4>
                     <span className="text-xs text-zinc-500">11:30</span>
                 </div>
                 <p className="text-sm text-zinc-400 leading-tight">
                     Has accepted your application for...
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
}