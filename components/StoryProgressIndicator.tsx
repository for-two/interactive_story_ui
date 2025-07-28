'use client';

import { Scene, GameState } from '@/types/story';

interface StoryProgressIndicatorProps {
  currentScene: Scene;
  gameState: GameState;
  totalScenes: number;
  onRestart?: () => void;
}

export default function StoryProgressIndicator({ 
  currentScene, 
  gameState, 
  totalScenes, 
  onRestart 
}: StoryProgressIndicatorProps) {
  const progressPercentage = (gameState.history.length / totalScenes) * 100;
  const isEnding = currentScene.isEnding;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
      {/* 左側：進行状況バー */}
      <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
        {/* プログレスリング */}
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-600"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-gradient-to-r from-blue-400 to-purple-500"
              stroke="url(#progress-gradient)"
              strokeWidth="3"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={`${progressPercentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* 情報表示 */}
        <div className="text-white">
          <div className="text-sm font-medium">
            {currentScene.title || 'ストーリー進行中'}
          </div>
          <div className="text-xs text-gray-300">
            シーン {gameState.history.length} / {totalScenes}
          </div>
        </div>

        {/* ステータスインジケーター */}
        <div className="flex items-center space-x-1">
          {isEnding ? (
            <div className="flex items-center space-x-1 text-yellow-400">
              <span className="animate-pulse">👑</span>
              <span className="text-xs font-medium">完了</span>
            </div>
          ) : gameState.isTextComplete ? (
            <div className="flex items-center space-x-1 text-green-400">
              <span className="animate-pulse">✨</span>
              <span className="text-xs font-medium">選択中</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-blue-400">
              <span className="animate-pulse">📖</span>
              <span className="text-xs font-medium">読書中</span>
            </div>
          )}
        </div>
      </div>

      {/* 右側：コントロールボタン */}
      <div className="flex items-center space-x-2">
        {/* 設定ボタン */}
        <button className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center group">
          <span className="text-lg group-hover:animate-spin">⚙️</span>
        </button>

        {/* リスタートボタン */}
        {onRestart && (
          <button 
            onClick={onRestart}
            className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
            title="最初からやり直す"
          >
            <span className="text-lg group-hover:animate-bounce">🔄</span>
          </button>
        )}
      </div>

      {/* 下部：章インジケーター */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalScenes) }).map((_, index) => {
              const isActive = index < gameState.history.length;
              const isCurrent = index === gameState.history.length - 1;
              
              return (
                <div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${isCurrent 
                      ? 'bg-yellow-400 scale-150 animate-pulse' 
                      : isActive 
                        ? 'bg-blue-400' 
                        : 'bg-gray-600'
                    }
                  `}
                />
              );
            })}
            {totalScenes > 5 && (
              <span className="text-xs text-gray-400 ml-2">
                +{totalScenes - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 