'use client';

import { useState, useEffect } from 'react';
import { Story, Scene, GameState, Choice, StoryText } from '@/types/story';
import TypewriterText from './TypewriterText';
import ChoiceButtons from './ChoiceButtons';

interface StoryDisplayProps {
  story: Story;
  onSceneChange?: (sceneId: string) => void;
  onStoryEnd?: () => void;
}

export default function StoryDisplay({ 
  story, 
  onSceneChange, 
  onStoryEnd 
}: StoryDisplayProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: story.startSceneId,
    currentTextIndex: 0,
    isTextComplete: false,
    history: []
  });

  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [displayedTexts, setDisplayedTexts] = useState<StoryText[]>([]);
  const [showChoices, setShowChoices] = useState(false);

  // 現在のシーンを取得
  useEffect(() => {
    const scene = story.scenes.find(s => s.id === gameState.currentSceneId);
    if (scene) {
      setCurrentScene(scene);
      onSceneChange?.(scene.id);
      
      // 新しいシーンに移動したときのリセット
      setDisplayedTexts([]);
      setShowChoices(false);
      setGameState(prev => ({
        ...prev,
        currentTextIndex: 0,
        isTextComplete: false,
        history: [...prev.history, scene.id]
      }));
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
    if (currentScene && displayedTexts.length === 0) {
      setDisplayedTexts([currentScene.texts[0]]);
    }
  }, [currentScene, displayedTexts.length]);

  // リスタート機能
  const restartStory = () => {
    setGameState({
      currentSceneId: story.startSceneId,
      currentTextIndex: 0,
      isTextComplete: false,
      history: []
    });
  };

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">ストーリーをロード中...</div>
      </div>
    );
  }

  const currentText = currentScene.texts[gameState.currentTextIndex];

  return (
    <div className={`min-h-screen transition-all duration-1000 ${currentScene.background || 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* シーンタイトル */}
        {currentScene.title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              {currentScene.title}
            </h2>
          </div>
        )}

        {/* テキスト表示エリア */}
        <div className="bg-black bg-opacity-40 rounded-lg p-6 mb-6 min-h-[200px] backdrop-blur-sm">
          <div className="space-y-4">
            {/* 既に表示されたテキスト */}
            {displayedTexts.slice(0, -1).map((text) => (
              <div key={text.id}>
                <TypewriterText
                  text={text.text}
                  speed={0} // 既に表示済みなので即座に表示
                  isActive={false}
                  className="opacity-80"
                />
              </div>
            ))}
            
            {/* 現在表示中のテキスト */}
            {currentText && (
              <TypewriterText
                key={`${currentScene.id}-${gameState.currentTextIndex}`}
                text={currentText.text}
                speed={currentText.speed}
                delay={currentText.delay}
                onComplete={handleTextComplete}
                isActive={true}
              />
            )}
          </div>
        </div>

        {/* 選択肢ボタン */}
        {showChoices && currentScene.choices && (
          <ChoiceButtons
            choices={currentScene.choices}
            onChoiceSelect={handleChoiceSelect}
            isVisible={gameState.isTextComplete}
          />
        )}

        {/* エンディング表示 */}
        {currentScene.isEnding && gameState.isTextComplete && (
          <div className="text-center mt-8 space-y-4">
            <div className="text-2xl font-bold text-white drop-shadow-lg">
              ～ 完 ～
            </div>
            <button
              onClick={restartStory}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
            >
              最初からやり直す
            </button>
          </div>
        )}

        {/* デバッグ情報（開発用） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
            <div>シーン: {currentScene.id}</div>
            <div>テキスト: {gameState.currentTextIndex + 1}/{currentScene.texts.length}</div>
            <div>完了: {gameState.isTextComplete ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    </div>
  );
} 