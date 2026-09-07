// Interactive Cultural Stories for LangLearn across supported languages (hi, ta, te, ml, kn, en)

export const culturalStories = [
  // HINDI STORY
  {
    id: 'hi-story-1',
    languageId: 'hi',
    title: 'चाय की टपरी पर',
    titleEn: 'At the Chai Stall',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 15,
    coverEmoji: '☕',
    description: 'A morning conversation at a bustling Indian chai stall between two friends.',
    segments: [
      {
        speaker: 'राहुल (Rahul)',
        avatar: '👨‍🦱',
        text: 'नमस्ते भैया! दो कप गरमा-गरम अदरक वाली चाय बना दीजिए।',
        translation: 'Hello brother! Please make two cups of piping hot ginger tea.',
        pronunciation: 'Namaste bhaiya! Do cup garma-garam adrak wali chai bana dijiye.',
        audioText: 'नमस्ते भैया! दो कप गरमा-गरम अदरक वाली चाय बना दीजिए।',
      },
      {
        speaker: 'चायवाला (Chai Vendor)',
        avatar: '👨',
        text: 'हाँ बाबूजी! अभी बनाता हूँ। चीनी कितनी डालूँ?',
        translation: 'Yes sir! Making it right now. How much sugar should I add?',
        pronunciation: 'Haan babuji! Abhi banata hoon. Cheeni kitni daalun?',
        audioText: 'हाँ बाबूजी! अभी बनाता हूँ। चीनी कितनी डालूँ?',
      },
      {
        isCheckpoint: true,
        question: 'What kind of tea did Rahul order?',
        options: ['Ginger tea (अदरक वाली चाय)', 'Green tea', 'Black coffee', 'Lemon water'],
        correctAnswer: 'Ginger tea (अदरक वाली चाय)',
        explanation: 'Rahul specifically asked for "अदरक वाली चाय" (ginger tea).',
      },
    ],
  },

  // TAMIL STORY
  {
    id: 'ta-story-1',
    languageId: 'ta',
    title: 'சென்னையில் ஃபில்டர் காபி',
    titleEn: 'Filter Coffee in Chennai',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 15,
    coverEmoji: '☕',
    description: 'Enjoying traditional South Indian Filter Coffee.',
    segments: [
      {
        speaker: 'கார்த்திக் (Karthik)',
        avatar: '👨',
        text: 'அண்ணா! இரண்டு சூடான ஃபில்டர் காபி தாருங்கள்.',
        translation: 'Brother! Please give two hot filter coffees.',
        pronunciation: 'Anna! Irandu soodaana filter coffee thaarungal.',
        audioText: 'அண்ணா! இரண்டு சூடான ஃபில்டர் காபி தாருங்கள்.',
      },
      {
        isCheckpoint: true,
        question: 'What did Karthik order?',
        options: ['Filter Coffee', 'Tea', 'Water', 'Juice'],
        correctAnswer: 'Filter Coffee',
        explanation: 'Karthik asked for "சூடான ஃபில்டர் காபி".',
      },
    ],
  },

  // TELUGU STORY
  {
    id: 'te-story-1',
    languageId: 'te',
    title: 'హైదరాబాదీ బిర్యానీ హోటల్',
    titleEn: 'At the Hyderabadi Biryani Hotel',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 15,
    coverEmoji: '🍲',
    description: 'Ordering delicious Hyderabadi Biryani.',
    segments: [
      {
        speaker: 'రాజేష్ (Rajesh)',
        avatar: '👨',
        text: 'నమస్కారం! ఒక వేడి వేడి చికెన్ బిర్యానీ ఇవ్వండి.',
        translation: 'Hello! Please give one piping hot chicken biryani.',
        pronunciation: 'Namaskaram! Oka vedi vedi chicken biryani ivvandi.',
        audioText: 'నమస్కారం! ఒక వేడి వేడి చికెన్ బిర్యానీ ఇవ్వండి.',
      },
      {
        isCheckpoint: true,
        question: 'What dish did Rajesh order?',
        options: ['Biryani', 'Dosa', 'Idli', 'Roti'],
        correctAnswer: 'Biryani',
        explanation: 'Rajesh ordered "చికెన్ బిర్యానీ".',
      },
    ],
  },

  // MALAYALAM STORY
  {
    id: 'ml-story-1',
    languageId: 'ml',
    title: 'കേരളത്തിലെ ചായക്കട',
    titleEn: 'At a Kerala Tea Stall',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 15,
    coverEmoji: '🍌',
    description: 'Enjoying tea and Pazham pori by the Backwaters.',
    segments: [
      {
        speaker: 'വിഷ്ണു (Vishnu)',
        avatar: '👨',
        text: 'ചേട്ടാ! നല്ല ചൂടുള്ള ഒരു ചായയും പഴംപൊരിയും തരൂ.',
        translation: 'Brother! Please give one hot tea and banana fritter.',
        pronunciation: 'Chetta! Nalla chudulla oru chayayum pazhamporiyum tharoo.',
        audioText: 'ചേട്ടാ! നല്ല ചൂടുള്ള ഒരു ചായയും പഴംപൊരിയും തരൂ.',
      },
      {
        speaker: 'ചായക്കടക്കാരൻ (Tea Vendor)',
        avatar: '👴',
        text: 'ഇതാ ചൂടുള്ള ചായ തയ്യാർ! ആകെ ഇരുപത് രൂപ.',
        translation: 'Here is your hot tea! Total twenty rupees.',
        pronunciation: 'Itha chudulla chaya thayyar! Aake irupathu roopa.',
        audioText: 'ഇതാ ചൂടുള്ള ചായ തയ്യാർ! ആകെ ഇരുപത് രൂപ.',
      },
      {
        isCheckpoint: true,
        question: 'What snack did Vishnu order with tea?',
        options: ['Pazham pori (பழம்பொரி / banana fritter)', 'Samosa', 'Vada', 'Biscuits'],
        correctAnswer: 'Pazham pori (பழம்பொரி / banana fritter)',
        explanation: 'Vishnu asked for "പഴംപൊരി" (banana fritter).',
      },
    ],
  },

  // KANNADA STORY
  {
    id: 'kn-story-1',
    languageId: 'kn',
    title: 'ಬೆಂಗಳೂರಿನ ದರ್ಶಿನಿ ಕಾಫಿ',
    titleEn: 'Bengaluru Darshini Coffee',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 15,
    coverEmoji: '☕',
    description: 'Morning breakfast at a popular Bengaluru Darshini.',
    segments: [
      {
        speaker: 'ಸುರೇಶ್ (Suresh)',
        avatar: '👨',
        text: 'ಅಣ್ಣಾ! ಒಂದು ಬಿಸಿ ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಒಂದು ಕಪ್ ಕಾಫಿ ಕೊಡಿ.',
        translation: 'Brother! Please give one hot masala dosa and a cup of coffee.',
        pronunciation: 'Anna! Ondu bisi masala dose mattu ondu cup coffee kodi.',
        audioText: 'ಅಣ್ಣಾ! ಒಂದು ಬಿಸಿ ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ಒಂದು ಕಪ್ ಕಾಫಿ ಕೊಡಿ.',
      },
      {
        isCheckpoint: true,
        question: 'What breakfast item did Suresh order?',
        options: ['Masala Dosa (ಮಸಾಲೆ ದೋಸೆ)', 'Idli', 'Puri', 'Vada'],
        correctAnswer: 'Masala Dosa (ಮಸಾಲೆ ದೋಸೆ)',
        explanation: 'Suresh ordered "ಮಸಾಲೆ ದೋಸೆ".',
      },
    ],
  },
]

export const getStoriesByLanguage = (languageId) => {
  return culturalStories.filter((s) => s.languageId === languageId)
}

export const getStoryById = (storyId) => {
  return culturalStories.find((s) => s.id === storyId)
}
