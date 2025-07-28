'use client';

import { useState, useEffect } from 'react';

interface EnhancedTypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  isActive?: boolean;
  textStyle?: 'normal' | 'dramatic' | 'whisper' | 'shout';
}

export default function EnhancedTypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  onComplete, 
  className = "",
  isActive = true,
  textStyle = 'normal'
}: EnhancedTypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (!isActive || hasStarted) return;

    const delayTimer = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentCharIndex(currentIndex);
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, delay, onComplete, isActive, hasStarted]);

  const skipAnimation = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
      onComplete?.();
    }
  };

  const getTextStyleClasses = () => {
    switch (textStyle) {
      case 'dramatic':
        return 'text-2xl font-bold text-red-200 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]';
      case 'whisper':
        return 'text-base italic text-blue-200 opacity-80 drop-shadow-sm';
      case 'shout':
        return 'text-xl font-black text-yellow-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.7)] animate-pulse';
      default:
        return 'text-lg text-white drop-shadow-lg';
    }
  };

  const renderTextWithEffects = () => {
    return displayedText.split('').map((char, index) => {
      const isNewChar = index === currentCharIndex && isTyping;
      return (
        <span
          key={index}
          className={`
            inline-block transition-all duration-150
            ${isNewChar ? 'animate-bounce text-yellow-300 scale-110' : ''}
            ${char === ' ' ? 'w-2' : ''}
          `}
          style={{
            animationDelay: `${index * 10}ms`,
            textShadow: isNewChar ? '0 0 20px currentColor' : undefined
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div 
      className={`transition-opacity duration-300 cursor-pointer relative ${className}`}
      onClick={skipAnimation}
    >
      {/* 背景エフェクト */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg opacity-50"></div>
      
      {/* メインテキスト */}
      <div className={`relative z-10 leading-relaxed ${getTextStyleClasses()}`}>
        {renderTextWithEffects()}
        
        {/* タイピングカーソル */}
        {isTyping && (
          <span className="ml-1 inline-block">
            <span className="animate-pulse text-yellow-300 text-xl font-bold">▋</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
          </span>
        )}
      </div>

      {/* デコレーションエフェクト */}
      {textStyle === 'dramatic' && (
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-lg blur-xl opacity-30 animate-pulse"></div>
      )}
      
      {textStyle === 'whisper' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-blue-400/10 rounded-lg blur-lg opacity-40"></div>
      )}

      {/* クリックインジケーター */}
      {isTyping && (
        <div className="absolute bottom-0 right-0 text-xs text-gray-400 animate-bounce">
          💬 クリックで早送り
        </div>
      )}
    </div>
  );
} 