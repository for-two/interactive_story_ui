'use client';

import { useState } from 'react';
import { Choice } from '@/types/story';

interface EnhancedChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  isVisible?: boolean;
}

export default function EnhancedChoiceButtons({ 
  choices, 
  onChoiceSelect, 
  isVisible = true 
}: EnhancedChoiceButtonsProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice(choice.id);
    setTimeout(() => {
      onChoiceSelect(choice);
    }, 800);
  };

  if (!isVisible) return null;

  const getChoiceIcon = (index: number) => {
    const icons = ['🌟', '⚡', '🔮', '🌙', '☀️', '🌸', '⭐', '🎭'];
    return icons[index % icons.length];
  };

  const getChoiceAccent = (index: number) => {
    const accents = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-red-500 to-pink-600',
      'from-yellow-500 to-orange-600',
      'from-indigo-500 to-blue-600',
      'from-purple-500 to-pink-600'
    ];
    return accents[index % accents.length];
  };

  return (
    <div className="mt-12 space-y-6 relative">
      {/* 背景装飾 */}
      <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl blur-xl"></div>
      
      {/* タイトル */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2 animate-fade-in">
          ✨ あなたの選択は？ ✨
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
      </div>

      {/* 選択肢ボタン */}
      <div className="space-y-4">
        {choices.map((choice, index) => (
          <div
            key={choice.id}
            className="relative group"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both'
            }}
          >
            {/* ホバー時の光のエフェクト */}
            {hoveredChoice === choice.id && !selectedChoice && (
              <div className={`absolute -inset-2 bg-gradient-to-r ${getChoiceAccent(index)} opacity-30 rounded-xl blur-lg animate-pulse`}></div>
            )}

            {/* 選択時のエフェクト */}
            {selectedChoice === choice.id && (
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-50 rounded-2xl blur-xl animate-pulse"></div>
            )}

            <button
              onClick={() => handleChoiceClick(choice)}
              onMouseEnter={() => setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
              disabled={selectedChoice !== null}
              className={`
                relative w-full px-8 py-6 text-left rounded-xl border-2 
                transition-all duration-500 transform backdrop-blur-sm
                group-hover:scale-105 active:scale-95
                ${selectedChoice === choice.id 
                  ? 'bg-gradient-to-r from-yellow-600/80 to-yellow-500/80 border-yellow-400 scale-105 shadow-2xl shadow-yellow-400/30' 
                  : selectedChoice 
                    ? 'bg-gray-800/60 border-gray-600 opacity-50 scale-95' 
                    : `bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-600 hover:border-gray-400 shadow-lg hover:shadow-xl`
                }
                focus:outline-none focus:ring-4 focus:ring-blue-400/50
                disabled:cursor-not-allowed overflow-hidden
                animate-slide-up
              `}
            >
              {/* ボタン内の装飾グラデーション */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getChoiceAccent(index)} opacity-10 rounded-xl`}></div>
              
              {/* ホバー時のシマー効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex items-center space-x-4">
                {/* アイコン */}
                <div className={`
                  text-3xl transition-all duration-300
                  ${hoveredChoice === choice.id ? 'animate-bounce scale-125' : ''}
                  ${selectedChoice === choice.id ? 'animate-spin' : ''}
                `}>
                  {getChoiceIcon(index)}
                </div>
                
                {/* テキスト */}
                <div className="flex-1">
                  <span className={`
                    font-medium text-base leading-relaxed block
                    ${selectedChoice === choice.id 
                      ? 'text-yellow-100' 
                      : 'text-white group-hover:text-blue-100'
                    }
                  `}>
                    {choice.text}
                  </span>
                </div>

                {/* 矢印インジケーター */}
                <div className={`
                  transition-all duration-300 text-xl
                  ${hoveredChoice === choice.id 
                    ? 'translate-x-2 text-blue-300' 
                    : selectedChoice === choice.id 
                      ? 'translate-x-4 text-yellow-300' 
                      : 'text-gray-500'
                  }
                `}>
                  →
                </div>
              </div>

              {/* 選択時のプログレスバー */}
              {selectedChoice === choice.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400/30 rounded-b-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-yellow-300 animate-pulse"></div>
                </div>
              )}
            </button>

            {/* 番号インジケーター */}
            <div className={`
              absolute -left-3 top-1/2 transform -translate-y-1/2 
              w-8 h-8 rounded-full flex items-center justify-center
              text-sm font-bold transition-all duration-300
              ${selectedChoice === choice.id 
                ? 'bg-yellow-400 text-gray-900 scale-110' 
                : hoveredChoice === choice.id 
                  ? 'bg-blue-500 text-white scale-110' 
                  : 'bg-gray-700 text-gray-300'
              }
            `}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* 下部装飾 */}
      <div className="text-center mt-8 opacity-60">
        <p className="text-sm text-gray-400">
          💫 選択肢をクリックして物語を進めましょう 💫
        </p>
      </div>
    </div>
  );
} 