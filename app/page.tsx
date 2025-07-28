'use client';

import { useState } from 'react';
import EnhancedStoryDisplay from '@/components/EnhancedStoryDisplay';
import ParticleBackground from '@/components/ParticleBackground';
import { sampleStory } from '@/data/sampleStory';

export default function Home() {
  const [currentSceneId, setCurrentSceneId] = useState<string>('');
  const [isStoryStarted, setIsStoryStarted] = useState(false);

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId);
  };

  const handleStoryEnd = () => {
    console.log('ストーリーが完了しました！');
  };

  const startStory = () => {
    setIsStoryStarted(true);
  };

  if (!isStoryStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* パーティクル背景 */}
        <ParticleBackground 
          particleCount={60} 
          colors={['#ffffff', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6', '#34d399']}
        />
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)'
            }}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto px-4">
          {/* メインタイトル */}
          <div className="space-y-6 animate-fade-in">
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl">
                {sampleStory.title}
              </h1>
              <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <p className="text-2xl text-blue-100 leading-relaxed font-light">
              {sampleStory.description}
            </p>
            
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
          </div>
          
          {/* 機能紹介 */}
          <div className="grid md:grid-cols-3 gap-8 text-gray-300">
            <div className="space-y-3 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-white">ノベル風表示</h3>
              <p className="text-sm leading-relaxed">
                美しいタイピングアニメーションでストーリーが展開されます
              </p>
            </div>
            
            <div className="space-y-3 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white">分岐システム</h3>
              <p className="text-sm leading-relaxed">
                あなたの選択で物語の展開が変わります
              </p>
            </div>
            
            <div className="space-y-3 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-white">リッチな演出</h3>
              <p className="text-sm leading-relaxed">
                パーティクルやアニメーションで没入感を演出
              </p>
            </div>
          </div>

          {/* スタートボタン */}
          <div className="space-y-6">
            <button
              onClick={startStory}
              className="group relative px-12 py-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-400 hover:via-blue-400 hover:to-purple-400 text-white text-2xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>🚀</span>
                <span>冒険を始める</span>
                <span>✨</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <div className="space-y-2 text-sm text-gray-400">
              <p>💡 ヒント: テキストをクリックすると早送りできます</p>
              <p>🎮 進行状況はリアルタイムで表示されます</p>
              <p>🔄 いつでもリスタートできます</p>
            </div>
          </div>

          {/* 装飾的な要素 */}
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30" style={{ animationDelay: '0s' }}>🌟</div>
          <div className="absolute top-20 right-20 text-4xl animate-bounce opacity-30" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-bounce opacity-30" style={{ animationDelay: '2s' }}>🔮</div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce opacity-30" style={{ animationDelay: '3s' }}>⭐</div>
        </div>
      </div>
    );
  }

  return (
    <EnhancedStoryDisplay 
      story={sampleStory}
      onSceneChange={handleSceneChange}
      onStoryEnd={handleStoryEnd}
    />
  );
}
