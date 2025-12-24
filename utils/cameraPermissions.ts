export type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'error';

export async function requestCameraPermission(): Promise<PermissionStatus> {
  try {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return 'error';
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    // Освобождаем stream сразу после проверки
    stream.getTracks().forEach(track => track.stop());
    return 'granted';
  } catch (error: any) {
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      return 'denied';
    }
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return 'error';
    }
    return 'error';
  }
}

export async function checkCameraPermission(): Promise<PermissionStatus> {
  try {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      // Fallback для браузеров без Permissions API
      return 'prompt';
    }

    const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
    const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });

    if (cameraPermission.state === 'granted' && microphonePermission.state === 'granted') {
      return 'granted';
    }
    if (cameraPermission.state === 'denied' || microphonePermission.state === 'denied') {
      return 'denied';
    }
    return 'prompt';
  } catch (error) {
    // Permissions API может не поддерживаться, возвращаем prompt
    return 'prompt';
  }
}

