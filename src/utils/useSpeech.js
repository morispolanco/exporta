import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const voiceRef = useRef(null);
  const utteranceRef = useRef(null);

  // Load Spanish voice
  const loadVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    // Preference order: es-419 (Latin American), es-ES, any es-*
    const preferred = [
      voices.find(v => v.lang === 'es-419'),
      voices.find(v => v.lang === 'es-MX'),
      voices.find(v => v.lang === 'es-US'),
      voices.find(v => v.lang === 'es-GT'),
      voices.find(v => v.lang.startsWith('es-')),
      voices.find(v => v.lang === 'es'),
    ].find(Boolean);

    voiceRef.current = preferred || null;
    setVoiceReady(true);
  }, []);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
    loadVoice();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoice);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoice);
      window.speechSynthesis.cancel();
    };
  }, [loadVoice]);

  const speak = useCallback((text, { rate = 1.0, pitch = 1.0, onEnd } = {}) => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'es-GT';
    utter.rate = rate;
    utter.pitch = pitch;
    if (voiceRef.current) utter.voice = voiceRef.current;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utter.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [isSupported]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, cancel, isSpeaking, isSupported, voiceReady };
}
