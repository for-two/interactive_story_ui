// ストーリーのテキストブロック
export interface StoryText {
  id: string;
  text: string;
  delay?: number; // ミリ秒単位のテキスト表示遅延
  speed?: number; // 文字ごとのタイピング速度（ミリ秒）
}

// 選択肢のオプション
export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  condition?: string; // 将来的な条件分岐用
}

// シーン（場面）
export interface Scene {
  id: string;
  title?: string;
  texts: StoryText[];
  choices?: Choice[];
  background?: string; // 背景画像やスタイル
  music?: string; // BGM（将来実装用）
  isEnding?: boolean; // エンディングフラグ
}

// ストーリー全体
export interface Story {
  id: string;
  title: string;
  description: string;
  scenes: Scene[];
  startSceneId: string;
}

// ゲーム状態
export interface GameState {
  currentSceneId: string;
  currentTextIndex: number;
  choices?: Choice[];
  isTextComplete: boolean;
  history: string[]; // 通過したシーンのID
} 