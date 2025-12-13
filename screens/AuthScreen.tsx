'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VsLogo } from '@/components/Icons';
import { Button } from '@/components/Shared';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export const AuthScreen = ({ onAuthenticated }: AuthScreenProps) => {
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setIsLoading(true);
    // Simulate API call - фиктивная авторизация, сразу пропускаем
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 500);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API verification - фиктивная авторизация
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 500);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-background overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2670&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40 grayscale" 
          alt="Sports background" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-6 pb-12">
        <div className="mb-8 self-center">
            <VsLogo size="lg" />
        </div>

        <div className="w-full bg-surfaceLight/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 'input' ? (
              <motion.div
                key="input-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-zinc-400 text-sm mb-6">Enter your phone number or email to continue.</p>
                
                <form onSubmit={handleSendCode} className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Email or Phone"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3.5 text-base shadow-primary/25"
                  >
                    {isLoading ? 'Sending...' : 'Continue'}
                  </Button>
                </form>

                <div className="relative my-6 text-center">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5"></div>
                    <span className="relative px-3 text-xs text-zinc-500 uppercase tracking-widest bg-background/0 backdrop-blur-sm z-10">
                        Or continue with
                    </span>
                </div>

                <button 
                  onClick={onAuthenticated}
                  className="w-full bg-white text-black font-semibold rounded-xl py-3.5 flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors active:scale-[0.98]"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">Enter code</h2>
                <p className="text-zinc-400 text-sm mb-6">
                    We sent a code to <span className="text-white font-medium">{inputValue}</span>.
                    <button onClick={() => setStep('input')} className="text-primary ml-2 hover:underline">Edit</button>
                </p>

                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                    <div className="flex gap-3 justify-between">
                        {[0, 1, 2, 3].map((i) => (
                            <input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-full aspect-square bg-black/20 border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        ))}
                    </div>

                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3.5 text-base mt-2"
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Enter'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-zinc-500">Didn't receive the code? <button className="text-primary font-medium hover:underline">Resend</button></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-center text-[10px] text-zinc-600 mt-6 px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}