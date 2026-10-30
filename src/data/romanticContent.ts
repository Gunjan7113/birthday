export interface ConstellationNode {
  id: string;
  title: string;
  subtitle: string;
  thought: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface ObservationItem {
  id: string;
  tag: string;
  title: string;
  quote: string;
  detail: string;
  iconName: string;
}

export interface MixtapeTrack {
  id: string;
  title: string;
  duration: string;
  mood: string;
  gunjanNote: string;
  synthType?: 'piano' | 'starlight' | 'warm_pad' | 'nocturne';
  audioSrc?: string;
  videoSrc?: string;
  lyricsSnippet?: string;
}

export interface WishNote {
  id: string;
  tag: string;
  message: string;
}

export interface MoonProfile {
  name: string;
  birthdate: string;
  phaseName: string;
  illumination: string;
  imagePath: string;
  poeticDescription: string;
}

export interface PromiseSlide {
  id: string;
  order: string;
  promiseText: string;
  reflection: string;
}

export interface DeepTruthPoint {
  id: string;
  badge: string;
  title: string;
  quoteText: string;
  gunjanNote: string;
  imagePath: string;
}

export interface RomanticData {
  senderName: string;
  recipientName: string;
  isBirthdaySpecial: boolean;
  birthdayHeadline: string;
  heroKicker: string;
  heroHeadline: string;
  heroSubtitle: string;
  letter: {
    salutation: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    signOff: string;
    secretFoldedNote: string;
    date: string;
    tuckedWhisperReelText?: string;
    tuckedWhisperVoiceSrc?: string;
    tuckedWhisperHindiQuote?: string;
    tuckedWhisperEnglishQuote?: string;
  };
  moonPhases: {
    dikshit: MoonProfile;
    gunjan: MoonProfile;
    resonanceMessage: string;
  };
  constellations: ConstellationNode[];
  observations: ObservationItem[];
  tracks: MixtapeTrack[];
  wishes: WishNote[];
  promiseSlides: PromiseSlide[];
  deepTruths: DeepTruthPoint[];
  promisesVideoSrc?: string;
  closingQuote: string;
}

export const defaultRomanticData: RomanticData = {
  senderName: "Gunjan",
  recipientName: "Mahhhhh Chekuuuuu 🧸",
  isBirthdaySpecial: true,
  birthdayHeadline: "Happy Birthday, Mahhhhh Chekuuuuu 🧸 ✦",
  heroKicker: "A Birthday Sky for Someone Becoming Special",
  heroHeadline: "Happy Birthday, Mahhhhh Chekuuuuu 🧸. A little world built just for you.",
  heroSubtitle: "Today the world celebrates the day you arrived. For me, it's a quiet chance to express the things I sometimes leave unspoken — the growing warmth, the sincere curiosity, and how special you are becoming to me.",
  letter: {
    salutation: "Happy Birthday, Mahhhhh Chekuuuuu 🧸,",
    paragraph1: "Today is your day, and while everyone around you will wish you happiness, I wanted to give you something that belongs only to us. There are thoughts that feel too delicate to say out loud, and feelings that look better written down under a quiet midnight sky. I wanted to build this little universe away from all the noise, just to tell you what I've been noticing lately.",
    paragraph2: "Getting to know you has brought this effortless, gentle warmth into my days. Whether it's the steady calm in your voice when you talk about things you love, that subtle sense of humor that catches me completely off guard, or the quiet reassurance you naturally carry — you make ordinary moments feel memorable.",
    paragraph3: "I'm not here to rush anything or make grand, unrealistic promises. I just wanted to be honest about where my heart is right now: on your birthday, I find myself simply grateful that you exist, and genuinely happy discovering who you are. I hope this year brings you everything you quietly wish for.",
    signOff: "With all my fondness and warmth,",
    secretFoldedNote: "I don't really know what love is yet... but what I do know is that I like you so, so much. I like the warmth you bring into my days, the quiet comfort when we talk, and how effortlessly you make ordinary moments feel special. And when I came across this, it felt like everything I quietly wish for...",
    tuckedWhisperReelText: "staying single until someone's son decides to describe me like this",
    tuckedWhisperVoiceSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_3.52.36_PM_373f02ab.mp4",
    tuckedWhisperHindiQuote: "उसको कैसे रुलाया किसी ने? कैसे गुस्सा कर दिया उस पर? छोटी बच्ची सी तो है वो... कैसे खुद को संभालती होगी, सब सहकर? वो बस प्यार डिज़र्व करती है... मुझे सब देना है उसको... उसे मायूस नहीं देख सकता।",
    tuckedWhisperEnglishQuote: "“How could anyone ever hurt her or get angry at her? She is like an innocent child... How did she manage all this time holding everything in? She only deserves pure love. I want to give her the entire world... I can never bear to see her sad.”",
    date: "13 November · A Birthday Note by Gunjan"
  },
  moonPhases: {
    dikshit: {
      name: "Mahhhhh Chekuuuuu's Moon",
      birthdate: "13 November 2005",
      phaseName: "Waxing Gibbous",
      illumination: "88% Illuminated",
      imagePath: "/assets/aistudio/Screenshot_2026-10-28_181051_54ac9b84.png",
      poeticDescription: "On the night of 13 November 2005, the sky was crowned with this luminous, steady moon. Much like you, it carries a gentle, grounding radiance — calm, bright, and quietly captivating."
    },
    gunjan: {
      name: "Gunjan's Moon",
      birthdate: "27 August 2007",
      phaseName: "Waxing Gibbous",
      illumination: "98% Illuminated",
      imagePath: "/assets/aistudio/Screenshot_2026-10-28_181134_85f46107.png",
      poeticDescription: "On 27 August 2007, this near-full radiant moon shone over the late summer night. A curious, warm light looking up into the vast universe, destined to share this midnight sky with yours."
    },
    resonanceMessage: "Two souls born under two glowing moons — 13 November 2005 and 27 August 2007. Different chapters, yet looking up at the exact same celestial sky. When I see the moon tonight, I know we are connected beneath its gentle light."
  },
  constellations: [
    {
      id: "star-1",
      title: "The Birthday Wish",
      subtitle: "A silent wish for you",
      thought: "My quiet birthday wish for you: that you receive as much warmth, peace, and genuine happiness as you bring into the world.",
      x: 18,
      y: 42
    },
    {
      id: "star-2",
      title: "The Calm Presence",
      subtitle: "First impressions",
      thought: "How quickly conversations with you turn into a safe harbor. Even on chaotic days, your voice carries a steady, grounding calm.",
      x: 36,
      y: 24
    },
    {
      id: "star-3",
      title: "That Unfiltered Laugh",
      subtitle: "A favorite sound",
      thought: "The laugh you don't hold back when something is truly funny. It has this infectious spark that makes me instantly smile.",
      x: 52,
      y: 58
    },
    {
      id: "star-4",
      title: "Quiet Attentiveness",
      subtitle: "The little things",
      thought: "You remember small details I mentioned in passing days ago. It made me realize you truly listen, not just hear.",
      x: 70,
      y: 30
    },
    {
      id: "star-5",
      title: "The Curious Connection",
      subtitle: "Where we are now",
      thought: "A quiet curiosity that grows a little warmer every single day. On your birthday, I'm just so glad you're in my life.",
      x: 84,
      y: 52
    }
  ],
  observations: [
    {
      id: "obs-1",
      tag: "The Voice",
      title: "The effortless calm in your tone",
      quote: "It's rare to find someone whose mere presence feels like taking off heavy shoes after a long walk.",
      detail: "No matter how rushed the day has been, a simple message from you brings a gentle stillness.",
      iconName: "Volume2"
    },
    {
      id: "obs-2",
      tag: "The Humor",
      title: "That subtle, dry wit of yours",
      quote: "You have a knack for saying the funniest things with a completely straight face.",
      detail: "Catching me off guard is your superpower, and honestly, I wouldn't have it any other way.",
      iconName: "Sparkles"
    },
    {
      id: "obs-3",
      tag: "The Mind",
      title: "How your thoughts wander into depth",
      quote: "We can start talking about dinner and end up discussing life, space, and dreams.",
      detail: "I appreciate the depth of your mind just as much as the lightness of your banter.",
      iconName: "Compass"
    },
    {
      id: "obs-4",
      tag: "The Sincerity",
      title: "How genuine you are when it matters",
      quote: "In a world that loves games and masks, your straightforward honesty is so refreshing.",
      detail: "You never try to be someone you're not. That authenticity is what drew me in first.",
      iconName: "HeartHandshake"
    }
  ],
  tracks: [
    {
      id: "track-1",
      title: "01. Tere Liye Mandir (Hasti Reh Tu)",
      duration: "02:44",
      mood: "Live Concert · Deeply Romantic",
      gunjanNote: "“Tere liye mandir tere naam ka banaye... hasti reh tu...” This song carries all the feelings I could never put into ordinary words. Dedicated to you on your birthday, Mahhhhh Chekuuuuu 🧸.",
      audioSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_12.12.14_PM_b414a4fa.mp4",
      videoSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_12.12.14_PM_b414a4fa.mp4",
      lyricsSnippet: "“Tere liye mandir tere naam ka banaye... hasti reh tu... bolay jo tu sun na rahe hai... hazaar nazar teri utaron...”"
    },
    {
      id: "track-2",
      title: "02. Akhiyan De Saamne (Tu Te Taareyan)",
      duration: "00:33",
      mood: "Acoustic · Outshining the Stars",
      gunjanNote: "“Akhiyan de saamne tu baitha rawein der tak... Tu te taareyan ton vi sohna ae...” Just like these words, Mahhhhh Chekuuuuu 🧸, you truly outshine every star in this sky. Dedicated to you with all my fondness.",
      audioSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_1.07.18_PM_e615932d.mp4",
      videoSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_1.07.18_PM_e615932d.mp4",
      lyricsSnippet: "“Akhiyan de saamne tu baitha rawein der tak... vekhan tainu raat saari chadhdi sawer tak... tu te taareyan ton vi sohna ae, tere warga koi na hona ae...”",
      synthType: "starlight"
    },
    {
      id: "track-3",
      title: "03. Tu Hi Mera Jahaan (Chain Dil Da)",
      duration: "00:26",
      mood: "Heartfelt & Intimate",
      gunjanNote: "“Tu hi chain dil da mere... saah vi karti na main tere, bas tenu hi na khabar ve... tu hi mera jahaan...” Some feelings don't need a thousand words — you've gently become my peace and my little world.",
      audioSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_2.49.50_PM_7e00ed78.mp4",
      videoSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_2.49.50_PM_7e00ed78.mp4",
      lyricsSnippet: "“Tu hi chain dil da mere... saah vi karti na main tere, bas tenu hi na khabar ve... tu hi mera jahaan...”",
      synthType: "piano"
    },
    {
      id: "track-4",
      title: "04. Tera Naam Doon (Jo Pooche Koi)",
      duration: "00:15",
      mood: "Celebratory & Sweet",
      gunjanNote: "“Main keh doon sabhi ko ke tera hi hai yeh asar... jo pooche koi to tera naam doon...” A sweet birthday wish: celebrating your day with candles, quiet smiles, and making you feel special.",
      audioSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_2.52.06_PM_223d9c9c.mp4",
      videoSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_2.52.06_PM_223d9c9c.mp4",
      lyricsSnippet: "“Main keh doon sabhi ko ke tera hi hai yeh asar... jo pooche koi to tera naam doon...”",
      synthType: "nocturne"
    }
  ],
  wishes: [
    {
      id: "wish-bday",
      tag: "A Birthday Blessing",
      message: "Happy Birthday Mahhhhh Chekuuuuu 🧸! I hope this year brings you calm happiness, unexpected adventures, and people who appreciate you deeply."
    },
    {
      id: "wish-1",
      tag: "A Little Confession",
      message: "I caught myself re-reading our previous conversations yesterday. Don't let it get to your head, birthday boy, but you're quite charming."
    },
    {
      id: "wish-2",
      tag: "A Gentle Reminder",
      message: "You work hard and think so deeply about everything. Today, on your birthday, remember to pause, smile, and celebrate yourself."
    },
    {
      id: "wish-3",
      tag: "A Shy Truth",
      message: "Whenever I see your name pop up on my phone, my day gets noticeably brighter. Especially today."
    },
    {
      id: "wish-4",
      tag: "A Playful Bet",
      message: "I bet you didn't expect a whole cinematic digital universe for your birthday! Consider yourself officially cherished."
    },
    {
      id: "wish-5",
      tag: "A Soft Wish",
      message: "I hope whatever you are quietly working towards comes together beautifully. I'm always cheering for you from the sidelines."
    },
    {
      id: "wish-6",
      tag: "Unfiltered Warmth",
      message: "Thank you for being so easy to talk to, so kind, and so wonderfully yourself with me. Have the best birthday, Mahhhhh Chekuuuuu 🧸."
    }
  ],
  promisesVideoSrc: "/assets/aistudio/WhatsApp_Video_2026-10-30_at_2.51.20_PM_902ef18c.mp4",
  promiseSlides: [
    {
      id: "promise-1",
      order: "Firstly",
      promiseText: "I don't cheat.",
      reflection: "Loyalty isn't just a promise for me — it is the only way I know how to love. With you, you will always have my unwavering fidelity."
    },
    {
      id: "promise-2",
      order: "Secondly",
      promiseText: "When I love, I love completely.",
      reflection: "No half-measures, no games, and no reservations. When you have a place in my heart, you have all of it without question."
    },
    {
      id: "promise-3",
      order: "Thirdly",
      promiseText: "When it's you, it's only you.",
      reflection: "In a world full of noise and distractions, my attention doesn't wander. My thoughts always find their way back to you."
    },
    {
      id: "promise-4",
      order: "Fourthly",
      promiseText: "I don't love halfway — I give my heart, my loyalty, my time, and my everything.",
      reflection: "You will never have to doubt whether you matter to me. I give my full heart and intentional time."
    },
    {
      id: "promise-5",
      order: "Fifthly",
      promiseText: "I don't need options when I've already found the person I want.",
      reflection: "You are more than enough for me, Mahhhhh Chekuuuuu 🧸. Once my heart decides who it cares for, nobody else compares."
    },
    {
      id: "promise-6",
      order: "Sixthly",
      promiseText: "I may not be perfect, but I'll always be honest with you.",
      reflection: "I will always give you sincere truth, gentle communication, and a heart you can trust completely."
    },
    {
      id: "promise-7",
      order: "Seventhly",
      promiseText: "If I choose you, I choose you every single day.",
      reflection: "Not just when things are light and celebratory, but through ordinary days, difficult days, and everything in between."
    },
    {
      id: "promise-8",
      order: "And Lastly",
      promiseText: "I don't want a temporary love story with you — I want something real, something lasting, something that feels like home.",
      reflection: "I don't look for passing moments. I look for peace, warmth, and a connection that feels like a safe haven to come home to."
    }
  ],
  deepTruths: [
    {
      id: "truth-1",
      badge: "The Story of Us",
      title: "He Fell First, But She Fell Hardest",
      quoteText: "“He fell first. She knew, but she wasn't ready for any relationship. He showed his effort for her. Suddenly, she fell the hardest, and both fell even harder together. In the end, they both feel appreciated and still love each other.”",
      gunjanNote: "Mahhhhh Chekuuuuu 🧸, when I saw this, it felt like someone was narrating the silent story between us. You showed steady effort and gentle patience when I was reserved. Without me even realizing when the shift happened, you became the person I care about the deepest.",
      imagePath: "/assets/aistudio/WhatsApp_Image_2026-10-30_at_2.51.20_PM__1__6a4dae2f.jpeg"
    },
    {
      id: "truth-2",
      badge: "A Core Principle",
      title: "On Consistency, Effort & Staying Real",
      quoteText: "“If you talk to that woman every single day, and you are giving her your time, your attention, your compliments, and your presence, she will slowly become attached and start developing real emotions... Even if she never meant to. Feelings grow naturally over time. So before creating that bond, ask yourself if you're ready to stay consistent. Because suddenly pulling away can hurt more than you realize.. Emotional inconsistency is quite common in this generation.”",
      gunjanNote: "Your presence in my daily routine has become my safe space. In a generation full of mixed signals, what I value most with you is real consistency, quiet reassurance, and knowing that we genuinely mean what we say to each other.",
      imagePath: "/assets/aistudio/WhatsApp_Image_2026-10-30_at_2.51.20_PM_3a37227d.jpeg"
    }
  ],
  closingQuote: "Born under the same celestial moon — Happy Birthday, Mahhhhh Chekuuuuu 🧸. I'm so glad our paths crossed."
};
