'use client';

import { useState } from 'react';
import { Choice } from '@/types/story';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  isVisible?: boolean;
}

export default function ChoiceButtons({ 
  choices, 
  onChoiceSelect, 
  isVisible = true 
}: ChoiceButtonsProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice(choice.id);
    // 少し遅延を入れてアニメーション効果を見せる
    setTimeout(() => {
      onChoiceSelect(choice);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="mt-8 space-y-4 animate-fade-in">
      {choices.map((choice, index) => (
        <button
          key={choice.id}
          onClick={() => handleChoiceClick(choice)}
          disabled={selectedChoice !== null}
          className={`
            w-full px-6 py-4 text-left rounded-lg border-2 
            transition-all duration-300 transform
            ${selectedChoice === choice.id 
              ? 'bg-blue-600 border-blue-400 scale-105 shadow-lg' 
              : selectedChoice 
                ? 'bg-gray-600 border-gray-500 opacity-50' 
                : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500 hover:scale-102 hover:shadow-md'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            disabled:cursor-not-allowed
          `}
          style={{
            animationDelay: `${index * 200}ms`,
            animationFillMode: 'both'
          }}
        >
          <span className="text-white font-medium text-base leading-relaxed">
            {choice.text}
          </span>
          {selectedChoice === choice.id && (
            <div className="mt-2">
              <div className="w-full bg-blue-300 rounded-full h-1">
                <div className="bg-blue-100 h-1 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
} 