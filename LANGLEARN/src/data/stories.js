// Interactive Cultural Micro-Stories for LangLearn
// These stories are dialogue-based to help users practice conversational skills.

export const culturalStories = [
  // --- HINDI ---
  {
    id: 'hi-story-1',
    languageId: 'hi',
    title: 'बाज़ार में मोलभाव',
    titleEn: 'Bargaining at the Market',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 10,
    coverEmoji: '🛍️',
    description: 'Learn how to bargain for fresh vegetables in a busy Indian market.',
    segments: [
      { speaker: 'राहुल', avatar: '👨🏽', text: 'नमस्ते भइया, ये सेब कैसे दिए?', translation: 'Hello brother, how much for these apples?', pronunciation: 'Namaste bhaiya, ye seb kaise diye?', audioText: 'नमस्ते भइया, ये सेब कैसे दिए?' },
      { speaker: 'दुकानदार', avatar: '👳🏽‍♂️', text: 'नमस्ते! सेब दो सौ रुपये किलो हैं।', translation: 'Hello! Apples are two hundred rupees a kilo.', pronunciation: 'Namaste! Seb do sau rupaye kilo hain.', audioText: 'नमस्ते! सेब दो सौ रुपये किलो हैं।' },
      { isCheckpoint: true, question: 'How much are the apples per kilo?', options: ['100 Rupees', '200 Rupees', '50 Rupees', '500 Rupees'], correctAnswer: '200 Rupees', explanation: 'दो सौ (do sau) means 200.' },
      { speaker: 'राहुल', avatar: '👨🏽', text: 'दो सौ तो बहुत महँगे हैं! कुछ कम कीजिए।', translation: 'Two hundred is very expensive! Please reduce it a bit.', pronunciation: 'Do sau toh bahut mahenge hain! Kuch kam kijiye.', audioText: 'दो सौ तो बहुत महँगे हैं! कुछ कम कीजिए।' },
      { speaker: 'दुकानदार', avatar: '👳🏽‍♂️', text: 'आपके लिए एक सौ अस्सी रुपये लगा दूँगा।', translation: 'For you, I will make it one hundred and eighty rupees.', pronunciation: 'Aapke liye ek sau assi rupaye laga dunga.', audioText: 'आपके लिए एक सौ अस्सी रुपये लगा दूँगा।' },
      { isCheckpoint: true, question: 'What price did the shopkeeper offer?', options: ['150 Rupees', '180 Rupees', '190 Rupees', '100 Rupees'], correctAnswer: '180 Rupees', explanation: 'एक सौ अस्सी (ek sau assi) means 180.' },
      { speaker: 'राहुल', avatar: '👨🏽', text: 'ठीक है, एक किलो दे दीजिए।', translation: 'Okay, give me one kilo.', pronunciation: 'Theek hai, ek kilo de dijiye.', audioText: 'ठीक है, एक किलो दे दीजिए।' }
    ]
  },
  
  // --- TAMIL ---
  {
    id: 'ta-story-1',
    languageId: 'ta',
    title: 'பழைய வீட்டின் ரகசியம்',
    titleEn: 'Secret of the Old House',
    level: 'Intermediate',
    rewardXP: 40,
    rewardGems: 15,
    coverEmoji: '🗝️',
    description: 'A suspenseful short dialogue about discovering an old key.',
    segments: [
      { speaker: 'கார்த்திக்', avatar: '👦🏽', text: 'கவிதா, இங்கே பார்! நான் ஒரு பழைய சாவியை கண்டுபிடித்தேன்.', translation: 'Kavitha, look here! I found an old key.', pronunciation: 'Kavitha, inge paar! Naan oru pazhaiya saaviyai kandupidithen.', audioText: 'கவிதா, இங்கே பார்! நான் ஒரு பழைய சாவியை கண்டுபிடித்தேன்.' },
      { speaker: 'கவிதா', avatar: '👧🏽', text: 'இது எங்கே இருந்தது? இது மிகவும் பழமையானதாகத் தெரிகிறது!', translation: 'Where was this? It looks very old!', pronunciation: 'Idhu enge irundhadhu? Idhu migavum pazhamaiyaanadhaaga therigiradhu!', audioText: 'இது எங்கே இருந்தது? இது மிகவும் பழமையானதாகத் தெரிகிறது!' },
      { isCheckpoint: true, question: 'What did Karthik find?', options: ['A book (புத்தகம்)', 'A key (சாவி)', 'A toy (பொம்மை)', 'Money (பணம்)'], correctAnswer: 'A key (சாவி)', explanation: 'சாவி (saavi) means key in Tamil.' },
      { speaker: 'கார்த்திக்', avatar: '👦🏽', text: 'தாத்தாவின் பழைய பெட்டிக்குள் இருந்தது.', translation: 'It was inside grandfather\'s old box.', pronunciation: 'Thaathaavin pazhaiya pettikkul irundhadhu.', audioText: 'தாத்தாவின் பழைய பெட்டிக்குள் இருந்தது.' },
      { speaker: 'கவிதா', avatar: '👧🏽', text: 'வா, மாடியில் உள்ள ரகசிய அறையைத் திறந்து பார்ப்போம்!', translation: 'Come, let\'s go open the secret room upstairs and see!', pronunciation: 'Vaa, maadiyil ulla ragasiya araiyai thirandhu paarppom!', audioText: 'வா, மாடியில் உள்ள ரகசிய அறையைத் திறந்து பார்ப்போம்!' },
      { isCheckpoint: true, question: 'Where is the secret room located?', options: ['Garden (தோட்டம்)', 'Kitchen (சமையலறை)', 'Upstairs (மாடியில்)', 'Basement (கீழே)'], correctAnswer: 'Upstairs (மாடியில்)', explanation: 'மாடியில் (maadiyil) means upstairs.' }
    ]
  },

  // --- MALAYALAM ---
  {
    id: 'ml-story-1',
    languageId: 'ml',
    title: 'ചായക്കടയിലെ വിശേഷങ്ങൾ',
    titleEn: 'Chat at the Tea Stall',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 10,
    coverEmoji: '☕',
    description: 'A casual morning conversation at a local Kerala tea stall.',
    segments: [
      { speaker: 'രവി', avatar: '👨🏽', text: 'ചേട്ടാ, ഒരു ചൂടു ചായ തരുമോ?', translation: 'Brother, can you give me a hot tea?', pronunciation: 'Chetta, oru choodu chaya tharumo?', audioText: 'ചേട്ടാ, ഒരു ചൂടു ചായ തരുമോ?' },
      { speaker: 'ചായക്കടക്കാരൻ', avatar: '👲🏽', text: 'ഇതാ, ചൂടുള്ള ചായ. കൂടെ പരിപ്പുവട വേണോ?', translation: 'Here is hot tea. Do you want Parippu Vada with it?', pronunciation: 'Itha, choodulla chaya. Koode parippuvada veno?', audioText: 'ഇതാ, ചൂടുള്ള ചായ. കൂടെ പരിപ്പുവട വേണോ?' },
      { isCheckpoint: true, question: 'What did Ravi ask for?', options: ['Coffee (കാപ്പി)', 'Tea (ചായ)', 'Water (വെള്ളം)', 'Milk (പാൽ)'], correctAnswer: 'Tea (ചായ)' },
      { speaker: 'രവി', avatar: '👨🏽', text: 'അതെ, രണ്ട് പരിപ്പുവട കൂടി തരൂ.', translation: 'Yes, please give two Parippu Vadas as well.', pronunciation: 'Athe, randu parippuvada koodi tharoo.', audioText: 'അതെ, രണ്ട് പരിപ്പുവട കൂടി തരൂ.' },
      { speaker: 'ചായക്കടക്കാരൻ', avatar: '👲🏽', text: 'മൊത്തം മുപ്പത് രൂപയായി.', translation: 'Total is thirty rupees.', pronunciation: 'Motham muppathu roopayayi.', audioText: 'മൊത്തം മുപ്പത് രൂപയായി.' },
      { isCheckpoint: true, question: 'What is the total bill amount?', options: ['20 Rupees', '30 Rupees', '40 Rupees', '50 Rupees'], correctAnswer: '30 Rupees' }
    ]
  },

  // --- TELUGU ---
  {
    id: 'te-story-1',
    languageId: 'te',
    title: 'కొత్త ఊరు',
    titleEn: 'The New Town',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 10,
    coverEmoji: '🗺️',
    description: 'Asking for directions in a new town in Telugu.',
    segments: [
      { speaker: 'అనిల్', avatar: '👨🏽', text: 'నమస్కారం అండి, రైల్వే స్టేషన్ ఇక్కడి నుండి ఎంత దూరం?', translation: 'Hello sir, how far is the railway station from here?', pronunciation: 'Namaskaram andi, railway station ikkadi nundi entha dooram?', audioText: 'నమస్కారం అండి, రైల్వే స్టేషన్ ఇక్కడి నుండి ఎంత దూరం?' },
      { speaker: 'పెద్దాయన', avatar: '👴🏽', text: 'ఇక్కడికి చాలా దగ్గరే బాబు. నడిచి వెళితే పది నిమిషాలు పడుతుంది.', translation: 'It is very near from here son. If you walk, it takes ten minutes.', pronunciation: 'Ikkadiki chala daggare babu. Nadichi velithe padi nimishalu paduthundi.', audioText: 'ఇక్కడికి చాలా దగ్గరే బాబు. నడిచి వెళితే పది నిమిషాలు పడుతుంది.' },
      { isCheckpoint: true, question: 'How long does it take to walk to the station?', options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'], correctAnswer: '10 minutes' },
      { speaker: 'అనిల్', avatar: '👨🏽', text: 'ఏ దారిలో వెళ్ళాలి?', translation: 'Which way should I go?', pronunciation: 'Ye daarilo vellali?', audioText: 'ఏ దారిలో వెళ్ళాలి?' },
      { speaker: 'పెద్దాయన', avatar: '👴🏽', text: 'తిన్నగా వెళ్లి, కుడి వైపు తిరగండి.', translation: 'Go straight and turn right.', pronunciation: 'Thinnaga velli, kudi vaipu thiragandi.', audioText: 'తిన్నగా వెళ్లి, కుడి వైపు తిరగండి.' },
      { isCheckpoint: true, question: 'Which direction should he turn?', options: ['Left (ఎడమ)', 'Right (కుడి)', 'Straight (తిన్నగా)', 'Back (వెనక్కి)'], correctAnswer: 'Right (కుడి)' },
      { speaker: 'అనిల్', avatar: '👨🏽', text: 'ధన్యవాదాలు అండి!', translation: 'Thank you sir!', pronunciation: 'Dhanyavadalu andi!', audioText: 'ధన్యవాదాలు అండి!' }
    ]
  },

  // --- KANNADA ---
  {
    id: 'kn-story-1',
    languageId: 'kn',
    title: 'ಪುಸ್ತಕದ ಅಂಗಡಿ',
    titleEn: 'The Bookshop',
    level: 'Beginner',
    rewardXP: 30,
    rewardGems: 10,
    coverEmoji: '📚',
    description: 'A conversation buying a book at a bookstore.',
    segments: [
      { speaker: 'ಗ್ರಾಹಕ', avatar: '👩🏽', text: 'ನಮಸ್ಕಾರ, ಇಲ್ಲಿ ಕನ್ನಡ ಕಥೆಗಳ ಪುಸ್ತಕಗಳು ಸಿಗುತ್ತವೆಯಾ?', translation: 'Hello, are Kannada story books available here?', pronunciation: 'Namaskara, illi Kannada kathegala pustakagalu siguttaveya?', audioText: 'ನಮಸ್ಕಾರ, ಇಲ್ಲಿ ಕನ್ನಡ ಕಥೆಗಳ ಪುಸ್ತಕಗಳು ಸಿಗುತ್ತವೆಯಾ?' },
      { speaker: 'ಅಂಗಡಿಯವನು', avatar: '👨🏽‍💼', text: 'ಹೌದು ಮೇಡಂ, ಅಲ್ಲಿ ಎರಡನೇ ಕಪಾಟಿನಲ್ಲಿ ಇವೆ.', translation: 'Yes madam, they are there in the second shelf.', pronunciation: 'Houdu madam, alli eradane kapatinali ive.', audioText: 'ಹೌದು ಮೇಡಂ, ಅಲ್ಲಿ ಎರಡನೇ ಕಪಾಟಿನಲ್ಲಿ ಇವೆ.' },
      { isCheckpoint: true, question: 'Which shelf has the Kannada story books?', options: ['First shelf (ಮೊದಲನೇ)', 'Second shelf (ಎರಡನೇ)', 'Third shelf (ಮೂರನೇ)', 'Fourth shelf (ನಾಲ್ಕನೇ)'], correctAnswer: 'Second shelf (ಎರಡನೇ)' },
      { speaker: 'ಗ್ರಾಹಕ', avatar: '👩🏽', text: 'ಈ ಪುಸ್ತಕದ ಬೆಲೆ ಎಷ್ಟು?', translation: 'What is the price of this book?', pronunciation: 'Ee pustakada bele eshtu?', audioText: 'ಈ ಪುಸ್ತಕದ ಬೆಲೆ ಎಷ್ಟು?' },
      { speaker: 'ಅಂಗಡಿಯವನು', avatar: '👨🏽‍💼', text: 'ಅದರ ಬೆಲೆ ನೂರು ರೂಪಾಯಿಗಳು.', translation: 'Its price is one hundred rupees.', pronunciation: 'Adara bele nooru roopayigalu.', audioText: 'ಅದರ ಬೆಲೆ ನೂರು ರೂಪಾಯಿಗಳು.' },
      { isCheckpoint: true, question: 'What is the price of the book?', options: ['50 Rupees', '100 Rupees', '150 Rupees', '200 Rupees'], correctAnswer: '100 Rupees' }
    ]
  }
]

export const getStoriesByLanguage = (languageId) => {
  return culturalStories.filter((s) => s.languageId === languageId)
}

export const getStoryById = (storyId) => {
  return culturalStories.find((s) => s.id === storyId)
}
