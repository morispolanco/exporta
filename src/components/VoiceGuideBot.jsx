import { useState, useEffect } from 'react';
import { useSpeech } from '../utils/useSpeech';

const TOUR_STEPS = [
  {
    target: 'general',
    text: "¡Hola! Soy tu asistente de AgroExport Intelligence. Estoy aquí para ayudarte a llevar los productos de Guatemala al mundo. ¿Te gustaría un breve recorrido?",
    btnText: "¡Empecemos!"
  },
  {
    target: 'sidebar',
    text: "En el panel de la izquierda verás nuestros módulos clave. Cubrimos desde normativas de sostenibilidad como EUDR hasta logística para café, cardamomo y banano.",
    btnText: "Siguiente"
  },
  {
    target: 'chat',
    text: "Este es nuestro centro de inteligencia. Puedes pedirme proformas, contratos, análisis de precios o calendarios de cosecha específicos para tu región.",
    btnText: "Entendido"
  },
  {
    target: 'final',
    text: "Para comenzar, solo necesitas ingresar tu clave de OpenRouter. ¡Estoy listo para trabajar contigo en tu próxima exportación!",
    btnText: "¡Listo!"
  }
];

export default function VoiceGuideBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const { speak, cancel, isSpeaking } = useSpeech();

  const startTour = () => {
    setIsOpen(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(-1);
      cancel();
    }
  };

  const closeBot = () => {
    setIsOpen(false);
    setCurrentStep(-1);
    cancel();
  };

  useEffect(() => {
    if (isOpen && currentStep >= 0) {
      speak(TOUR_STEPS[currentStep].text);
    }
  }, [currentStep, isOpen, speak]);

  if (!isOpen && currentStep === -1) {
    return (
      <button className="guide-bot-trigger" onClick={startTour} title="Ayuda y Recorrido">
        <span className="bot-emoji">🤖</span>
      </button>
    );
  }

  const step = TOUR_STEPS[currentStep];

  return (
    <div className={`guide-bot-container step-${step.target}`}>
      <div className="guide-bot-bubble">
        <div className="guide-bot-header">
          <span className="bot-emoji-small">🤖</span>
          <strong>Asistente Guía</strong>
          <button className="btn-close-mini" onClick={closeBot}>&times;</button>
        </div>
        <p className="guide-bot-text">{step.text}</p>
        <div className="guide-bot-actions">
          <button className="btn-guide-next" onClick={nextStep}>
            {step.btnText}
          </button>
        </div>
        {isSpeaking && <div className="voice-indicator"><span></span><span></span><span></span></div>}
      </div>
    </div>
  );
}
