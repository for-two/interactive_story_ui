# ✨ インタラクティブストーリーUI

美しいアニメーションと没入感のあるノベル風UIで楽しむインタラクティブストーリーアプリケーション

![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 概要

このアプリケーションは、現代的なWebテクノロジーを使用して作られたインタラクティブストーリー体験プラットフォームです。ノベルゲーム風のUI/UXで、ユーザーの選択によって物語が分岐する魅力的なストーリーテリング体験を提供します。

### 🌟 主な特徴

- **🎨 リッチなビジュアル体験**
  - 動的パーティクル背景アニメーション
  - シーンに応じた美しいグラデーション背景
  - 装飾的な光エフェクトと演出

- **📖 ノベル風テキスト表示**
  - タイピングアニメーション付きテキスト表示
  - 文字ごとのエフェクトとスタイル変更
  - クリック早送り機能

- **🎯 インタラクティブな選択システム**
  - 美しいアニメーション付き選択肢ボタン
  - ホバーエフェクトとフィードバック
  - アイコン付きの視覚的インジケーター

- **📊 進行状況の可視化**
  - サークル型プログレスインジケーター
  - 章表示とリアルタイム進行状況
  - ステータス表示（読書中/選択中/完了）

- **🔄 スムーズなトランジション**
  - シーン遷移アニメーション
  - フェードイン/アウトエフェクト
  - レスポンシブなインタラクション

## 🚀 クイックスタート

### 📋 必要な環境

- Node.js 18.0以上
- npm または yarn

### ⚡ インストール & 実行

```bash
# リポジトリのクローン
git clone git@github.com:for-two/interactive_story_ui.git
cd interactive_story_ui

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

アプリケーションは `http://localhost:3000` でアクセスできます。

## 🎮 使い方

### 基本操作

1. **ストーリー開始**: 「冒険を始める」ボタンをクリック
2. **テキスト早送り**: 表示中のテキストエリアをクリック
3. **選択肢選択**: お好みの選択肢ボタンをクリック
4. **リスタート**: 右上の🔄ボタンでストーリーを最初から

### 進行状況

- 左上の円形インジケーターで全体の進行状況を確認
- 画面下部のドットで現在の章位置を表示
- ステータスアイコンで現在の状態を確認

## 🏗️ プロジェクト構造

```
interactive_story_ui/
├── app/                          # Next.js App Router
│   └── page.tsx                  # メインページ
├── components/                   # Reactコンポーネント
│   ├── ParticleBackground.tsx    # パーティクル背景
│   ├── EnhancedTypewriterText.tsx # リッチテキスト表示
│   ├── EnhancedChoiceButtons.tsx # 選択肢ボタン
│   ├── StoryProgressIndicator.tsx # 進行状況表示
│   └── EnhancedStoryDisplay.tsx  # メインストーリー表示
├── data/                         # データ
│   └── sampleStory.ts           # サンプルストーリーデータ
├── types/                        # TypeScript型定義
│   └── story.ts                 # ストーリー関連型
└── tailwind.config.ts           # Tailwind CSS設定
```

## 🎨 技術スタック

### フロントエンド
- **Next.js 15.4.4** - React フレームワーク（App Router使用）
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **Canvas API** - パーティクルアニメーション

### 開発ツール
- **Turbopack** - 高速バンドラー
- **ESLint** - コード品質管理
- **Git** - バージョン管理

## 🎭 ストーリーシステム

### データ構造

```typescript
interface Story {
  id: string;
  title: string;
  description: string;
  scenes: Scene[];
  startSceneId: string;
}

interface Scene {
  id: string;
  title?: string;
  texts: StoryText[];
  choices?: Choice[];
  background?: string;
  isEnding?: boolean;
}
```

### カスタムストーリーの作成

1. `data/` フォルダに新しいストーリーファイルを作成
2. `Story` インターフェースに従ってデータを定義
3. メインページでストーリーデータをインポート

## 🎨 カスタマイズ

### テーマとスタイル

- `tailwind.config.ts` でカスタムアニメーションと色を設定
- `components/` でコンポーネントのスタイルを調整
- パーティクルの色やエフェクトをシーンごとにカスタマイズ可能

### アニメーション設定

```typescript
// カスタムアニメーション例
animation: {
  'custom-float': 'float 3s ease-in-out infinite',
  'custom-glow': 'glow 2s ease-in-out infinite alternate',
}
```

## 📱 レスポンシブ対応

- **デスクトップ**: フル機能での最適な体験
- **タブレット**: タッチ操作に最適化
- **モバイル**: 縦向き画面での読みやすいレイアウト

## 🔧 開発

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番用ビルド
npm run build

# 本番サーバー起動
npm start

# Lintチェック
npm run lint
```

### デバッグ機能

開発モードでは以下のデバッグ情報が表示されます：
- 現在のシーンID
- テキスト進行状況
- ゲーム状態

## 🌟 今後の拡張予定

- [ ] 🎵 BGM・効果音システム
- [ ] 💾 進行状況のセーブ・ロード機能
- [ ] 🏆 実績・バッジシステム
- [ ] 🌍 多言語対応
- [ ] 📊 アナリティクス機能
- [ ] 🎨 テーマ切り替え機能

## 🤝 コントリビューション

プルリクエストや Issue の投稿を歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🙏 謝辞

- パーティクルアニメーションのインスピレーション
- Tailwind CSS チームによる素晴らしいユーティリティ
- Next.js チームの継続的な革新

---

<div align="center">

**✨ 魔法の森で素晴らしい冒険をお楽しみください！ ✨**

Made with ❤️ using Next.js & TypeScript

</div>
