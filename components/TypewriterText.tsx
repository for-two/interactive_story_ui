'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ミリ秒単位での1文字あたりの表示速度
  delay?: number; // 開始前の遅延時間
  onComplete?: () => void; // テキスト表示完了時のコールバック
  className?: string;
  isActive?: boolean; // このテキストがアクティブかどうか
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  onComplete, 
  className = "",
  isActive = true 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isActive || hasStarted) return;

    const delayTimer = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
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

  // 全文を即座に表示する関数（クリック時用）
  const skipAnimation = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
      onComplete?.();
    }
  };

  return (
    <div 
      className={`transition-opacity duration-300 ${className}`}
      onClick={skipAnimation}
    >
      <p className="text-lg leading-relaxed text-white drop-shadow-lg">
        {displayedText}
        {isTyping && (
          <span className="animate-pulse ml-1 text-yellow-300">▋</span>
        )}
      </p>
    </div>
  );
} 