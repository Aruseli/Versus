'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { IconBack } from '@/components/Icons';
import { Button } from '@/components/Shared';
import { useBattleCreationStore } from '@/stores/battleCreationStore';
import { checkCameraPermission, PermissionStatus } from '@/utils/cameraPermissions';

const MAX_RECORDING_TIME = 60; // секунд

export const CreateRecordVideoScreen = () => {
  const router = useRouter();
  const { setRecordedVideo } = useBattleCreationStore();
  
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [finalRecordingTime, setFinalRecordingTime] = useState(0);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRecorded, setHasRecorded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Проверка разрешений при загрузке
  useEffect(() => {
    checkCameraPermission().then(status => {
      setPermissionStatus(status);
      if (status === 'granted') {
        startCamera();
      }
    });
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true, // Всегда запрашиваем аудио, потом можем отключить через toggle
      });
      
      setStream(mediaStream);
      setPermissionStatus('granted');
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionStatus('denied');
        setError('Доступ к камере отклонен. Разрешите доступ в настройках устройства.');
      } else if (err.name === 'NotFoundError') {
        setError('Камера не найдена. Убедитесь, что устройство имеет камеру.');
      } else {
        setError('Не удалось получить доступ к камере.');
      }
      setPermissionStatus('error');
    }
  };

  const requestPermission = async () => {
    try {
      const status = await checkCameraPermission();
      if (status === 'granted') {
        await startCamera();
      } else {
        setError('Разрешите доступ к камере и микрофону в настройках устройства.');
      }
    } catch (err) {
      setError('Произошла ошибка при запросе разрешений.');
    }
  };

  const switchCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode },
        audio: !isMuted,
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Error switching camera:', err);
      setError('Не удалось переключить камеру.');
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      const newMutedState = !isMuted;
      audioTracks.forEach(track => {
        track.enabled = newMutedState;
      });
      setIsMuted(newMutedState);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    try {
      const chunks: Blob[] = [];
      setRecordedChunks(chunks);

      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus',
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(blob, url);
        setHasRecorded(true);
        setIsRecording(false);
        setFinalRecordingTime(recordingTime);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Таймер
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= MAX_RECORDING_TIME) {
            // Автоматическая остановка при достижении лимита
            if (recorder && recorder.state === 'recording') {
              recorder.stop();
            }
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
            }
            return MAX_RECORDING_TIME;
          }
          return newTime;
        });
      }, 1000);
    } catch (err: any) {
      console.error('Error starting recording:', err);
      setError('Не удалось начать запись. Попробуйте еще раз.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      setFinalRecordingTime(recordingTime);
      mediaRecorder.stop();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const retakeVideo = () => {
    setHasRecorded(false);
    setRecordedChunks([]);
    setRecordingTime(0);
    setFinalRecordingTime(0);
    if (stream) {
      startCamera();
    }
  };

  const handleBack = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    router.push('/create/rules');
  };

  const handleContinue = () => {
    if (hasRecorded) {
      router.push('/create/preview');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col relative overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 px-6 pt-6 pb-4 flex items-center gap-4 bg-linear-to-b from-background/80 to-transparent backdrop-blur-sm">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 touch-manipulation"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <IconBack size={24} className="text-white" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">Запись видео</h2>
        </div>
      </div>

      {/* Video Preview/Recording Area */}
      <div className="flex-1 flex items-center justify-center relative bg-black">
        {permissionStatus !== 'granted' ? (
          <div className="flex flex-col items-center justify-center px-6 text-center space-y-6">
            <div className="text-7xl" style={{ fontSize: '80px' }}>
              📹
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Доступ к камере</h3>
              <p className="text-muted">Для записи видео нужен доступ к камере и микрофону</p>
            </div>
            {error && (
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 max-w-md">
                <p className="text-sm text-accent">{error}</p>
              </div>
            )}
            <Button onClick={requestPermission} variant="primary" className="touch-manipulation" style={{ minHeight: '56px' }}>
              Разрешить доступ
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                <span className="text-white font-semibold text-lg">{formatTime(recordingTime)}</span>
              </div>
            )}

            {/* Controls Overlay */}
            {!isRecording && !hasRecorded && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-center gap-6">
                  {/* Switch Camera */}
                  <button
                    onClick={switchCamera}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center touch-manipulation"
                    style={{ minHeight: '48px', minWidth: '48px' }}
                  >
                    <span className="text-2xl">🔄</span>
                  </button>

                  {/* Record Button */}
                  <button
                    onClick={startRecording}
                    className="w-20 h-20 rounded-full bg-accent border-4 border-white flex items-center justify-center touch-manipulation shadow-lg"
                    style={{ minHeight: '80px', minWidth: '80px' }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white"></div>
                  </button>

                  {/* Microphone Toggle */}
                  <button
                    onClick={toggleMicrophone}
                    className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center touch-manipulation ${
                      isMuted ? 'bg-accent/20' : 'bg-white/20'
                    }`}
                    style={{ minHeight: '48px', minWidth: '48px' }}
                  >
                    <span className="text-2xl">{isMuted ? '🔇' : '🎤'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* After Recording Controls */}
            {hasRecorded && !isRecording && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-black/80 to-transparent">
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg mb-2">Видео записано!</p>
                    <p className="text-muted text-sm">Длительность: {formatTime(finalRecordingTime || recordingTime || 0)}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={retakeVideo}
                      variant="outline"
                      className="flex-1 touch-manipulation"
                      style={{ minHeight: '56px' }}
                    >
                      Перезаписать
                    </Button>
                    <Button
                      onClick={handleContinue}
                      variant="primary"
                      className="flex-1 touch-manipulation"
                      style={{ minHeight: '56px' }}
                    >
                      Далее
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Stop Recording Button (when recording) */}
            {isRecording && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-black/80 to-transparent">
                <Button
                  onClick={stopRecording}
                  variant="primary"
                  className="w-full touch-manipulation"
                  style={{ minHeight: '56px' }}
                >
                  Остановить запись
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

