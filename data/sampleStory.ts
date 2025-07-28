import { Story } from '@/types/story';

export const sampleStory: Story = {
  id: 'sample-story',
  title: '魔法の森の冒険',
  description: '神秘的な森で不思議な出会いが待っています',
  startSceneId: 'forest-entrance',
  scenes: [
    {
      id: 'forest-entrance',
      title: '森の入り口',
      texts: [
        {
          id: 'intro-1',
          text: 'あなたは古い地図を手に、伝説の魔法の森にやってきました。',
          delay: 1000,
          speed: 50
        },
        {
          id: 'intro-2',
          text: '深い緑に包まれた森の奥から、微かに光が見えています。',
          delay: 500,
          speed: 50
        },
        {
          id: 'intro-3',
          text: 'どちらの道を選びますか？',
          delay: 800,
          speed: 30
        }
      ],
      choices: [
        {
          id: 'choice-light',
          text: '光の方向へ向かう',
          nextSceneId: 'fairy-grove'
        },
        {
          id: 'choice-dark',
          text: '暗い小道を進む',
          nextSceneId: 'dark-path'
        },
        {
          id: 'choice-rest',
          text: '森の入り口で休憩する',
          nextSceneId: 'rest-area'
        }
      ],
      background: 'bg-gradient-to-b from-green-400 to-green-600'
    },
    {
      id: 'fairy-grove',
      title: '妖精の小さな空き地',
      texts: [
        {
          id: 'fairy-1',
          text: '光に導かれて歩いていくと、小さな空き地に出ました。',
          speed: 40
        },
        {
          id: 'fairy-2',
          text: 'そこには美しい妖精が舞い踊っていました。',
          delay: 1200,
          speed: 45
        },
        {
          id: 'fairy-3',
          text: '「ようこそ、勇敢な旅人よ。あなたに贈り物をしましょう」',
          delay: 1000,
          speed: 35
        }
      ],
      choices: [
        {
          id: 'accept-gift',
          text: '贈り物を受け取る',
          nextSceneId: 'magical-ending'
        },
        {
          id: 'decline-gift',
          text: '丁寧に断る',
          nextSceneId: 'humble-ending'
        }
      ],
      background: 'bg-gradient-to-b from-purple-300 via-pink-300 to-yellow-300'
    },
    {
      id: 'dark-path',
      title: '暗い小道',
      texts: [
        {
          id: 'dark-1',
          text: '暗い小道を慎重に進んでいきます。',
          speed: 60
        },
        {
          id: 'dark-2',
          text: '突然、大きな狼が現れました！',
          delay: 2000,
          speed: 30
        },
        {
          id: 'dark-3',
          text: 'しかし、よく見ると狼の目には知性の光が宿っています。',
          delay: 1500,
          speed: 40
        }
      ],
      choices: [
        {
          id: 'talk-wolf',
          text: '狼に話しかける',
          nextSceneId: 'wolf-friend'
        },
        {
          id: 'run-away',
          text: '急いで逃げる',
          nextSceneId: 'forest-entrance'
        }
      ],
      background: 'bg-gradient-to-b from-gray-700 to-gray-900'
    },
    {
      id: 'rest-area',
      title: '森の入り口での休憩',
      texts: [
        {
          id: 'rest-1',
          text: 'あなたは森の入り口で一息つくことにしました。',
          speed: 50
        },
        {
          id: 'rest-2',
          text: '風が心地よく、鳥のさえずりが聞こえてきます。',
          delay: 1000,
          speed: 45
        },
        {
          id: 'rest-3',
          text: '十分に休んだので、また冒険を始めましょう。',
          delay: 2000,
          speed: 40
        }
      ],
      choices: [
        {
          id: 'restart',
          text: '再び冒険を始める',
          nextSceneId: 'forest-entrance'
        }
      ],
      background: 'bg-gradient-to-b from-blue-300 to-green-400'
    },
    {
      id: 'wolf-friend',
      title: '狼との出会い',
      texts: [
        {
          id: 'wolf-1',
          text: '「怖がらないで。私は森の守護者です」',
          speed: 40
        },
        {
          id: 'wolf-2',
          text: '狼が人の言葉で話しかけてきました。',
          delay: 1000,
          speed: 45
        },
        {
          id: 'wolf-3',
          text: '「あなたの勇気に敬意を表し、森の秘密をお教えしましょう」',
          delay: 1200,
          speed: 35
        }
      ],
      choices: [
        {
          id: 'learn-secret',
          text: '秘密を聞く',
          nextSceneId: 'wisdom-ending'
        }
      ],
      background: 'bg-gradient-to-b from-indigo-400 to-purple-600'
    },
    {
      id: 'magical-ending',
      title: '魔法の贈り物',
      texts: [
        {
          id: 'magic-end-1',
          text: '妖精があなたに光る小さな石を渡しました。',
          speed: 40
        },
        {
          id: 'magic-end-2',
          text: '「この石があれば、いつでも森に戻ってこられます」',
          delay: 1500,
          speed: 35
        },
        {
          id: 'magic-end-3',
          text: 'あなたは魔法の力を手に入れ、新たな冒険の扉が開かれました。',
          delay: 2000,
          speed: 45
        }
      ],
      background: 'bg-gradient-to-b from-yellow-300 via-orange-300 to-pink-400',
      isEnding: true
    },
    {
      id: 'humble-ending',
      title: '謙虚な心',
      texts: [
        {
          id: 'humble-end-1',
          text: '妖精は微笑みながら頷きました。',
          speed: 40
        },
        {
          id: 'humble-end-2',
          text: '「あなたの謙虚さこそが真の宝物です」',
          delay: 1500,
          speed: 35
        },
        {
          id: 'humble-end-3',
          text: 'あなたは心豊かになって森を後にしました。',
          delay: 2000,
          speed: 45
        }
      ],
      background: 'bg-gradient-to-b from-green-300 via-blue-300 to-purple-300',
      isEnding: true
    },
    {
      id: 'wisdom-ending',
      title: '森の知恵',
      texts: [
        {
          id: 'wisdom-end-1',
          text: '狼は森の古い歴史と自然の大切さを教えてくれました。',
          speed: 40
        },
        {
          id: 'wisdom-end-2',
          text: 'あなたは深い知恵を得て、自然とより深いつながりを感じました。',
          delay: 2000,
          speed: 45
        },
        {
          id: 'wisdom-end-3',
          text: '新たな視点を持って、人生の道のりを歩んでいくでしょう。',
          delay: 2000,
          speed: 40
        }
      ],
      background: 'bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600',
      isEnding: true
    }
  ]
}; 