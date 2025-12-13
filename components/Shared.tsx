'use client';

export const Avatar = ({ url, size = 'md', className = '', bordered = true }: { url: string; size?: 'sm'|'md'|'lg'|'xl'; className?: string; bordered?: boolean }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', // Slightly smaller for modern look
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };
  
  return (
    <div className={`rounded-full overflow-hidden ${bordered ? 'border border-white/10 ring-2 ring-black/20' : ''} ${sizeClasses[size]} ${className}`}>
      <img src={url} alt="avatar" className="w-full h-full object-cover" />
    </div>
  );
};

export const StoryCircle = ({ username, url }: { username: string; url: string }) => (
  <div className="flex flex-col items-center gap-2 min-w-[72px] group cursor-pointer">
    {/* Gradient border effect using a parent div */}
    <div className="w-[64px] h-[64px] rounded-full p-[2px] bg-linear-to-b from-primary to-surfaceLight group-hover:from-accent group-hover:to-primary transition-all duration-300">
      <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
        <img src={url} alt={username} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
    </div>
    <span className="text-[11px] font-medium text-muted group-hover:text-white transition-colors truncate w-full text-center tracking-wide">{username}</span>
  </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; className?: string }) => {
  const base = "px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primaryGlow",
    secondary: "bg-surfaceLight text-white border border-white/5 hover:bg-white/10",
    outline: "border border-white/10 text-muted hover:text-white hover:border-white/20",
    ghost: "bg-transparent text-muted hover:text-white"
  };
  return <button className={`${base} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>{children}</button>;
};