'use client';

import { useState, useEffect } from 'react';
import { Story, Scene, GameState, Choice, StoryText } from '@/types/story';
import EnhancedTypewriterText from './EnhancedTypewriterText';
import EnhancedChoiceButtons from './EnhancedChoiceButtons';
import ParticleBackground from './ParticleBackground';
import StoryProgressIndicator from './StoryProgressIndicator';

interface EnhancedStoryDisplayProps {
  story: Story;
  onSceneChange?: (sceneId: string) => void;
  onStoryEnd?: () => void;
}

export default function EnhancedStoryDisplay({ 
  story, 
  onSceneChange, 
  onStoryEnd 
}: EnhancedStoryDisplayProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: story.startSceneId,
    currentTextIndex: 0,
    isTextComplete: false,
    history: []
  });

  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [displayedTexts, setDisplayedTexts] = useState<StoryText[]>([]);
  const [showChoices, setShowChoices] = useState(false);
  const [sceneTransition, setSceneTransition] = useState(false);

  // 現在のシーンを取得
  useEffect(() => {
    const scene = story.scenes.find(s => s.id === gameState.currentSceneId);
    if (scene) {
      // シーン遷移アニメーション
      setSceneTransition(true);
      setTimeout(() => {
        setCurrentScene(scene);
        onSceneChange?.(scene.id);
        
        // 新しいシーンに移動したときのリセット
        setDisplayedTexts([]);
        setShowChoices(false);
        setGameState(prev => ({
          ...prev,
          currentTextIndex: 0,
          isTextComplete: false,
          history: [...prev.history.filter(id => id !== scene.id), scene.id]
        }));
        setSceneTransition(false);
      }, 300);
    }
  }, [gameState.currentSceneId, story.scenes, onSceneChange]);

  // テキスト表示完了時の処理
  const handleTextComplete = () => {
    if (!currentScene) return;

    const nextIndex = gameState.currentTextIndex + 1;
    
    if (nextIndex < currentScene.texts.length) {
      // 次のテキストがある場合
      setGameState(prev => ({
        ...prev,
        currentTextIndex: nextIndex
      }));
      setDisplayedTexts(prev => [...prev, currentScene.texts[nextIndex - 1]]);
    } else {
      // 全てのテキストが表示完了
      setDisplayedTexts(prev => [...prev, currentScene.texts[nextIndex - 1]]);
      setGameState(prev => ({
        ...prev,
        isTextComplete: true
      }));
      
      if (currentScene.choices && currentScene.choices.length > 0) {
        setShowChoices(true);
      } else if (currentScene.isEnding) {
        onStoryEnd?.();
      }
    }
  };

  // 選択肢選択時の処理
  const handleChoiceSelect = (choice: Choice) => {
    setGameState(prev => ({
      ...prev,
      currentSceneId: choice.nextSceneId,
      currentTextIndex: 0,
      isTextComplete: false
    }));
  };

  // 最初のテキストを開始
  useEffect(() => {
    if (currentScene && displayedTexts.length === 0 && !sceneTransition) {
      setTimeout(() => {
        setDisplayedTexts([currentScene.texts[0]]);
      }, 500);
    }
  }, [currentScene, displayedTexts.length, sceneTransition]);

  // リスタート機能
  const restartStory = () => {
    setGameState({
      currentSceneId: story.startSceneId,
      currentTextIndex: 0,
      isTextComplete: false,
      history: []
    });
  };

  const getParticleColors = () => {
    if (!currentScene) return ['#ffffff', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6'];
    
    // シーンの背景に基づいてパーティクルの色を変更
    if (currentScene.background?.includes('green')) {
      return ['#ffffff', '#34d399', '#10b981', '#059669', '#047857'];
    } else if (currentScene.background?.includes('purple')) {
      return ['#ffffff', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'];
    } else if (currentScene.background?.includes('blue')) {
      return ['#ffffff', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];
    } else if (currentScene.background?.includes('red')) {
      return ['#ffffff', '#f87171', '#ef4444', '#dc2626', '#b91c1c'];
    }
    return ['#ffffff', '#fbbf24', '#60a5fa', '#a78bfa', '#f472b6'];
  };

  const getTextStyle = (textIndex: number) => {
    // 特定のテキストに応じてスタイルを決定
    if (!currentScene) return 'normal';
    
    const text = currentScene.texts[textIndex]?.text || '';
    if (text.includes('！') || text.includes('!')) return 'dramatic';
    if (text.includes('「') && text.includes('」')) return 'whisper';
    return 'normal';
  };

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <ParticleBackground particleCount={30} />
        <div className="relative z-10 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-white text-xl font-medium">ストーリーをロード中...</div>
          <div className="text-gray-300 text-sm mt-2">✨ 魔法の世界への扉を開いています ✨</div>
        </div>
      </div>
    );
  }

  const currentText = currentScene.texts[gameState.currentTextIndex];

  return (
    <div className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${currentScene.background || 'bg-gray-900'}`}>
      {/* パーティクル背景 */}
      <ParticleBackground 
        particleCount={40} 
        colors={getParticleColors()}
      />

      {/* 進行状況インジケーター */}
      <StoryProgressIndicator
        currentScene={currentScene}
        gameState={gameState}
        totalScenes={story.scenes.length}
        onRestart={restartStory}
      />

      {/* シーン遷移オーバーレイ */}
      {sceneTransition && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="text-white text-2xl font-bold animate-pulse">
            シーン切り替え中...
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-20 max-w-4xl">
        {/* シーンタイトル */}
        {currentScene.title && (
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-white drop-shadow-2xl relative z-10">
                {currentScene.title}
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full blur-xl"></div>
            </div>
            <div className="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
          </div>
        )}

        {/* テキスト表示エリア */}
        <div className="relative mb-8">
          {/* 装飾的な背景 */}
          <div className="absolute -inset-6 bg-gradient-to-r from-black/30 via-black/40 to-black/30 rounded-3xl backdrop-blur-md border border-white/10"></div>
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl blur-xl"></div>
          
          <div className="relative z-10 p-8 min-h-[250px] flex flex-col justify-center">
            <div className="space-y-6">
              {/* 既に表示されたテキスト */}
              {displayedTexts.slice(0, -1).map((text, index) => (
                <div key={text.id} className="opacity-75">
                  <EnhancedTypewriterText
                    text={text.text}
                    speed={0}
                    isActive={false}
                    textStyle={getTextStyle(index)}
                  />
                </div>
              ))}
              
              {/* 現在表示中のテキスト */}
              {currentText && !sceneTransition && (
                <EnhancedTypewriterText
                  key={`${currentScene.id}-${gameState.currentTextIndex}`}
                  text={currentText.text}
                  speed={currentText.speed}
                  delay={currentText.delay}
                  onComplete={handleTextComplete}
                  isActive={true}
                  textStyle={getTextStyle(gameState.currentTextIndex)}
                />
              )}
            </div>
          </div>
        </div>

        {/* 選択肢ボタン */}
        {showChoices && currentScene.choices && !sceneTransition && (
          <EnhancedChoiceButtons
            choices={currentScene.choices}
            onChoiceSelect={handleChoiceSelect}
            isVisible={gameState.isTextComplete}
          />
        )}

        {/* エンディング表示 */}
        {currentScene.isEnding && gameState.isTextComplete && (
          <div className="text-center mt-16 space-y-8 animate-fade-in">
            <div className="relative">
              <div className="text-4xl font-bold text-white drop-shadow-2xl animate-pulse">
                ✨ ～ 完 ～ ✨
              </div>
              <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 rounded-full blur-2xl"></div>
            </div>
            
            <div className="space-y-4">
              <p className="text-xl text-blue-200 leading-relaxed">
                素晴らしい冒険をありがとうございました！
              </p>
              <p className="text-gray-300">
                あなたの選択が物語を彩りました 🌟
              </p>
            </div>

            <button
              onClick={restartStory}
              className="px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              🔄 新たな冒険を始める
            </button>
          </div>
        )}
      </div>

      {/* 装飾的な光のエフェクト */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
} 