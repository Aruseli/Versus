'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IconBack, IconPlay, IconPause, IconVolume2, IconVolumeX, IconMaximize } from '@/components/Icons';
import { MOCK_BATTLES } from '@/constants';

export const VideoPlayerScreen = () => {
  const params = useParams();
  const router = useRouter();
  const battleId = params.id as string;
  const battle = MOCK_BATTLES.find(b => b.id === battleId) || MOCK_BATTLES[2];

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isMuted1, setIsMuted1] = useState(false);
  const [isMuted2, setIsMuted2] = useState(false);
  const [fullScreenMode, setFullScreenMode] = useState<'none' | 'participant1' | 'participant2'>('none');
  const [currentTime1, setCurrentTime1] = useState(0);
  const [currentTime2, setCurrentTime2] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [duration2, setDuration2] = useState(0);

  // Моковые видео URL (в реальном приложении будут реальные URL)
  const videoUrl1 = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`;
  const videoUrl2 = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`;

  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (video1) {
      video1.addEventListener('loadedmetadata', () => {
        setDuration1(video1.duration);
      });
      video1.addEventListener('timeupdate', () => {
        setCurrentTime1(video1.currentTime);
      });
    }

    if (video2) {
      video2.addEventListener('loadedmetadata', () => {
        setDuration2(video2.duration);
      });
      video2.addEventListener('timeupdate', () => {
        setCurrentTime2(video2.currentTime);
      });
    }

    return () => {
      if (video1) {
        video1.removeEventListener('loadedmetadata', () => {});
        video1.removeEventListener('timeupdate', () => {});
      }
      if (video2) {
        video2.removeEventListener('loadedmetadata', () => {});
        video2.removeEventListener('timeupdate', () => {});
      }
    };
  }, []);

  const handlePlayPause1 = () => {
    const video = video1Ref.current;
    if (video) {
      if (isPlaying1) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying1(!isPlaying1);
    }
  };

  const handlePlayPause2 = () => {
    const video = video2Ref.current;
    if (video) {
      if (isPlaying2) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying2(!isPlaying2);
    }
  };

  const handleSyncPlay = () => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (video1 && video2) {
      video1.play();
      video2.play();
      setIsPlaying1(true);
      setIsPlaying2(true);
    }
  };

  const handleSyncPause = () => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;
    if (video1 && video2) {
      video1.pause();
      video2.pause();
      setIsPlaying1(false);
      setIsPlaying2(false);
    }
  };

  const handleMute1 = () => {
    const video = video1Ref.current;
    if (video) {
      video.muted = !isMuted1;
      setIsMuted1(!isMuted1);
    }
  };

  const handleMute2 = () => {
    const video = video2Ref.current;
    if (video) {
      video.muted = !isMuted2;
      setIsMuted2(!isMuted2);
    }
  };

  const handleFullScreen = (participant: 'participant1' | 'participant2') => {
    setFullScreenMode(fullScreenMode === participant ? 'none' : participant);
  };

  const handleSeek1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = video1Ref.current;
    if (video) {
      const time = parseFloat(e.target.value);
      video.currentTime = time;
      setCurrentTime1(time);
    }
  };

  const handleSeek2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = video2Ref.current;
    if (video) {
      const time = parseFloat(e.target.value);
      video.currentTime = time;
      setCurrentTime2(time);
    }
  };

  const handleVote = () => {
    router.push(`/battle/${battleId}/vote`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (fullScreenMode === 'participant1') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col relative" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => setFullScreenMode('none')}
            className="p-2 bg-black/50 backdrop-blur-md rounded-full touch-manipulation"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <IconBack size={24} className="text-white" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <video
            ref={video1Ref}
            src={videoUrl1}
            className="w-full h-full object-contain"
            playsInline
            muted={isMuted1}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent" style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max={duration1 || 0}
              value={currentTime1}
              onChange={handleSeek1}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer touch-manipulation"
              style={{ minHeight: '44px' }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause1}
                  className="p-3 bg-white/10 rounded-full touch-manipulation"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  {isPlaying1 ? <IconPause size={20} /> : <IconPlay size={20} />}
                </button>
                <button
                  onClick={handleMute1}
                  className="p-3 bg-white/10 rounded-full touch-manipulation"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  {isMuted1 ? <IconVolumeX size={20} /> : <IconVolume2 size={20} />}
                </button>
                <span className="text-sm text-white/80" style={{ fontSize: '14px' }}>
                  {formatTime(currentTime1)} / {formatTime(duration1)}
                </span>
              </div>
              <div className="text-sm text-white/60" style={{ fontSize: '14px' }}>
                {battle.participant1.username}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fullScreenMode === 'participant2') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col relative" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => setFullScreenMode('none')}
            className="p-2 bg-black/50 backdrop-blur-md rounded-full touch-manipulation"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <IconBack size={24} className="text-white" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <video
            ref={video2Ref}
            src={videoUrl2}
            className="w-full h-full object-contain"
            playsInline
            muted={isMuted2}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/80 to-transparent" style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max={duration2 || 0}
              value={currentTime2}
              onChange={handleSeek2}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer touch-manipulation"
              style={{ minHeight: '44px' }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause2}
                  className="p-3 bg-white/10 rounded-full touch-manipulation"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  {isPlaying2 ? <IconPause size={20} /> : <IconPlay size={20} />}
                </button>
                <button
                  onClick={handleMute2}
                  className="p-3 bg-white/10 rounded-full touch-manipulation"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  {isMuted2 ? <IconVolumeX size={20} /> : <IconVolume2 size={20} />}
                </button>
                <span className="text-sm text-white/80" style={{ fontSize: '14px' }}>
                  {formatTime(currentTime2)} / {formatTime(duration2)}
                </span>
              </div>
              <div className="text-sm text-white/60" style={{ fontSize: '14px' }}>
                {battle.participant2?.username}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative" style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}>
      {/* Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 bg-black/50 backdrop-blur-md rounded-full touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <IconBack size={24} className="text-white" />
        </button>
        <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full">
          <span className="text-sm font-medium text-white" style={{ fontSize: '14px' }}>
            {battle.title}
          </span>
        </div>
      </div>

      {/* Split Screen Videos */}
      <div className="flex-1 flex relative">
        {/* Left Video - Participant 1 */}
        <div className="flex-1 relative bg-black">
          <video
            ref={video1Ref}
            src={videoUrl1}
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted1}
          />
          <div className="absolute top-2 left-2 z-10">
            <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
              <span className="text-xs font-medium text-white" style={{ fontSize: '12px' }}>
                {battle.participant1.username}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={handlePlayPause1}
              className="p-4 bg-black/50 backdrop-blur-md rounded-full touch-manipulation opacity-0 hover:opacity-100 transition-opacity"
              style={{ minHeight: '56px', minWidth: '56px' }}
            >
              {isPlaying1 ? <IconPause size={24} className="text-white" /> : <IconPlay size={24} className="text-white" />}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black via-black/80 to-transparent z-10">
            <input
              type="range"
              min="0"
              max={duration1 || 0}
              value={currentTime1}
              onChange={handleSeek1}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer touch-manipulation"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-white/80" style={{ fontSize: '12px' }}>
                {formatTime(currentTime1)} / {formatTime(duration1)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMute1}
                  className="p-1.5 touch-manipulation"
                  style={{ minHeight: '32px', minWidth: '32px' }}
                >
                  {isMuted1 ? <IconVolumeX size={16} className="text-white" /> : <IconVolume2 size={16} className="text-white" />}
                </button>
                <button
                  onClick={() => handleFullScreen('participant1')}
                  className="p-1.5 touch-manipulation"
                  style={{ minHeight: '32px', minWidth: '32px' }}
                >
                  <IconMaximize size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-white/20 z-10"></div>

        {/* Right Video - Participant 2 */}
        <div className="flex-1 relative bg-black">
          {battle.participant2 ? (
            <>
              <video
                ref={video2Ref}
                src={videoUrl2}
                className="w-full h-full object-cover"
                playsInline
                muted={isMuted2}
              />
              <div className="absolute top-2 right-2 z-10">
                <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
                  <span className="text-xs font-medium text-white" style={{ fontSize: '12px' }}>
                    {battle.participant2.username}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  onClick={handlePlayPause2}
                  className="p-4 bg-black/50 backdrop-blur-md rounded-full touch-manipulation opacity-0 hover:opacity-100 transition-opacity"
                  style={{ minHeight: '56px', minWidth: '56px' }}
                >
                  {isPlaying2 ? <IconPause size={24} className="text-white" /> : <IconPlay size={24} className="text-white" />}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black via-black/80 to-transparent z-10">
                <input
                  type="range"
                  min="0"
                  max={duration2 || 0}
                  value={currentTime2}
                  onChange={handleSeek2}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer touch-manipulation"
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-white/80" style={{ fontSize: '12px' }}>
                    {formatTime(currentTime2)} / {formatTime(duration2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMute2}
                      className="p-1.5 touch-manipulation"
                      style={{ minHeight: '32px', minWidth: '32px' }}
                    >
                      {isMuted2 ? <IconVolumeX size={16} className="text-white" /> : <IconVolume2 size={16} className="text-white" />}
                    </button>
                    <button
                      onClick={() => handleFullScreen('participant2')}
                      className="p-1.5 touch-manipulation"
                      style={{ minHeight: '32px', minWidth: '32px' }}
                    >
                      <IconMaximize size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/30 text-sm" style={{ fontSize: '14px' }}>Waiting for participant</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/90 to-transparent z-20" style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handleSyncPlay}
            className="px-6 py-3 bg-primary rounded-full font-medium text-white touch-manipulation"
            style={{ minHeight: '44px' }}
          >
            Play Both
          </button>
          <button
            onClick={handleSyncPause}
            className="px-6 py-3 bg-surfaceLight/50 rounded-full font-medium text-white touch-manipulation"
            style={{ minHeight: '44px' }}
          >
            Pause Both
          </button>
        </div>
        {battle.participant2 && (
          <button
            onClick={handleVote}
            className="w-full py-4 bg-primary rounded-full font-semibold text-white shadow-lg shadow-primary/30 touch-manipulation"
            style={{ minHeight: '56px', fontSize: '16px' }}
          >
            Проголосовать
          </button>
        )}
      </div>
    </div>
  );
};

