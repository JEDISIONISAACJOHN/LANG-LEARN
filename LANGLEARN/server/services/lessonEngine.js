/**
 * Dynamic Lesson Engine — LangLearn
 *
 * Generates personalized lessons, assessment questions, and learning plans
 * based on: target language, age range, goal, level, and performance history.
 *
 * NO AI provider names, model names, or endpoint URLs are ever returned to the client.
 * The client only sees: "Generating your personalized lesson..."
 */

// ── Vocabulary banks per language ────────────────────────────────────────────
const VOCABULARY_BANKS = {
  hi: {
    greetings: [
      { word: 'नमस्कार', translation: 'Hello / Greetings', pronunciation: 'namaskar', example: 'नमस्कार, आप कैसे हैं?' },
      { word: 'धन्यवाद', translation: 'Thank you', pronunciation: 'dhanyavaad', example: 'बहुत धन्यवाद' },
      { word: 'कृपया', translation: 'Please', pronunciation: 'kripya', example: 'कृपया बैठिए' },
      { word: 'अलविदा', translation: 'Goodbye', pronunciation: 'alvida', example: 'अलविदा, फिर मिलेंगे' },
      { word: 'शुभ प्रभात', translation: 'Good morning', pronunciation: 'shubh prabhat', example: 'शुभ प्रभात!' },
      { word: 'माफ़ करना', translation: 'Sorry / Excuse me', pronunciation: 'maaf karna', example: 'माफ़ करना, मुझे देर हो गई' },
    ],
    travel: [
      { word: 'रेलगाड़ी', translation: 'Train', pronunciation: 'relgadi', example: 'रेलगाड़ी कब आएगी?' },
      { word: 'बस', translation: 'Bus', pronunciation: 'bas', example: 'बस स्टेशन कहाँ है?' },
      { word: 'होटल', translation: 'Hotel', pronunciation: 'hotel', example: 'होटल में कमरा चाहिए' },
      { word: 'दाएं', translation: 'Right', pronunciation: 'dayen', example: 'दाएं मुड़ो' },
      { word: 'बाएं', translation: 'Left', pronunciation: 'bayen', example: 'बाएं मुड़ो' },
      { word: 'कितना', translation: 'How much', pronunciation: 'kitna', example: 'इसका दाम कितना है?' },
    ],
    food: [
      { word: 'पानी', translation: 'Water', pronunciation: 'paani', example: 'एक गिलास पानी दीजिए' },
      { word: 'खाना', translation: 'Food', pronunciation: 'khaana', example: 'खाना बहुत अच्छा है' },
      { word: 'चाय', translation: 'Tea', pronunciation: 'chaay', example: 'एक चाय लेना' },
      { word: 'रोटी', translation: 'Bread / Roti', pronunciation: 'roti', example: 'रोटी और दाल' },
      { word: 'मीठा', translation: 'Sweet', pronunciation: 'meetha', example: 'मुझे मीठा पसंद है' },
    ],
    conversation: [
      { word: 'आप', translation: 'You (formal)', pronunciation: 'aap', example: 'आप कैसे हैं?' },
      { word: 'मैं', translation: 'I / Me', pronunciation: 'main', example: 'मैं ठीक हूँ' },
      { word: 'हाँ', translation: 'Yes', pronunciation: 'haan', example: 'हाँ, बिल्कुल' },
      { word: 'नहीं', translation: 'No', pronunciation: 'nahin', example: 'नहीं, धन्यवाद' },
      { word: 'क्या', translation: 'What', pronunciation: 'kya', example: 'क्या आप ठीक हैं?' },
      { word: 'कहाँ', translation: 'Where', pronunciation: 'kahan', example: 'बाज़ार कहाँ है?' },
    ],
  },
  mr: {
    greetings: [
      { word: 'नमस्कार', translation: 'Hello / Greetings', pronunciation: 'namaskar', example: 'नमस्कार, तुम्ही कसे आहात?' },
      { word: 'धन्यवाद', translation: 'Thank you', pronunciation: 'dhanyavaad', example: 'खूप खूप धन्यवाद' },
      { word: 'कृपया', translation: 'Please', pronunciation: 'krupaya', example: 'कृपया येथे बसा' },
      { word: 'पुन्हा भेटू', translation: 'See you again', pronunciation: 'punha bhetu', example: 'पुन्हा भेटू!' },
      { word: 'शुभ सकाळ', translation: 'Good morning', pronunciation: 'shubh sakal', example: 'शुभ सकाळ!' },
      { word: 'माफ करा', translation: 'Sorry / Excuse me', pronunciation: 'maaf kara', example: 'माफ करा, उशीर झाला' },
    ],
    travel: [
      { word: 'रेल्वे', translation: 'Railway / Train', pronunciation: 'railway', example: 'रेल्वे स्थानक कुठे आहे?' },
      { word: 'बस', translation: 'Bus', pronunciation: 'bas', example: 'बस कधी येईल?' },
      { word: 'हॉटेल', translation: 'Hotel', pronunciation: 'hotel', example: 'हॉटेलमध्ये जागा आहे का?' },
      { word: 'उजवीकडे', translation: 'Right', pronunciation: 'ujvikade', example: 'उजवीकडे वळा' },
      { word: 'डावीकडे', translation: 'Left', pronunciation: 'davikade', example: 'डावीकडे वळा' },
      { word: 'किती', translation: 'How much', pronunciation: 'kiti', example: 'हे किती आहे?' },
    ],
    food: [
      { word: 'पाणी', translation: 'Water', pronunciation: 'paani', example: 'एक ग्लास पाणी द्या' },
      { word: 'जेवण', translation: 'Food / Meal', pronunciation: 'jevan', example: 'जेवण कधी होईल?' },
      { word: 'चहा', translation: 'Tea', pronunciation: 'chaha', example: 'एक चहा द्या' },
      { word: 'भाकरी', translation: 'Flatbread', pronunciation: 'bhakri', example: 'भाकरी आणि भाजी' },
      { word: 'गोड', translation: 'Sweet', pronunciation: 'god', example: 'मला गोड आवडते' },
    ],
    conversation: [
      { word: 'तुम्ही', translation: 'You (formal)', pronunciation: 'tumhi', example: 'तुम्ही कसे आहात?' },
      { word: 'मी', translation: 'I / Me', pronunciation: 'mi', example: 'मी ठीक आहे' },
      { word: 'हो', translation: 'Yes', pronunciation: 'ho', example: 'हो, नक्कीच' },
      { word: 'नाही', translation: 'No', pronunciation: 'nahi', example: 'नाही, धन्यवाद' },
      { word: 'काय', translation: 'What', pronunciation: 'kaay', example: 'काय हवे आहे?' },
      { word: 'कुठे', translation: 'Where', pronunciation: 'kuthe', example: 'बाजार कुठे आहे?' },
    ],
  },
  ta: {
    greetings: [
      { word: 'வணக்கம்', translation: 'Hello / Greetings', pronunciation: 'vanakkam', example: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?' },
      { word: 'நன்றி', translation: 'Thank you', pronunciation: 'nandri', example: 'உங்கள் உதவிக்கு மிக்க நன்றி' },
      { word: 'தயவுசெய்து', translation: 'Please', pronunciation: 'thayavuseidhu', example: 'தயவுசெய்து அமருங்கள்' },
      { word: 'போய் வருகிறேன்', translation: 'Goodbye', pronunciation: 'poi varugiren', example: 'மீண்டும் சந்திப்போம், போய் வருகிறேன்' },
      { word: 'காலை வணக்கம்', translation: 'Good morning', pronunciation: 'kaalai vanakkam', example: 'இனிய காலை வணக்கம்' },
      { word: 'மன்னிக்கவும்', translation: 'Sorry / Excuse me', pronunciation: 'mannikkavum', example: 'மன்னிக்கவும், தாமதமாகிவிட்டது' },
    ],
    travel: [
      { word: 'ரயில்', translation: 'Railway / Train', pronunciation: 'rayil', example: 'ரயில் நிலையம் எங்கே?' },
      { word: 'பேருந்து', translation: 'Bus', pronunciation: 'perunthu', example: 'பேருந்து எப்போது வரும்?' },
      { word: 'விடுதி', translation: 'Hotel', pronunciation: 'viduthi', example: 'விடுதியில் அறை உள்ளதா?' },
      { word: 'வலது', translation: 'Right', pronunciation: 'valadhu', example: 'வலதுபுறம் திரும்புங்கள்' },
      { word: 'இடது', translation: 'Left', pronunciation: 'idadhu', example: 'இடதுபுறம் செல்லுங்கள்' },
      { word: 'எவ்வளவு', translation: 'How much', pronunciation: 'evvalavu', example: 'இதன் விலை எவ்வளவு?' },
    ],
    food: [
      { word: 'தண்ணீர்', translation: 'Water', pronunciation: 'thanneer', example: 'எனக்கு தண்ணீர் வேண்டும்' },
      { word: 'உணவு', translation: 'Food / Meal', pronunciation: 'unavu', example: 'சுவையான உணவு' },
      { word: 'தேநீர்', translation: 'Tea', pronunciation: 'the-neer', example: 'சூடான தேநீர்' },
      { word: 'சோறு', translation: 'Rice', pronunciation: 'sooru', example: 'சாம்பார் சோறு' },
      { word: 'இனிப்பு', translation: 'Sweet', pronunciation: 'inippu', example: 'பாரம்பரிய இனிப்பு' },
    ],
    conversation: [
      { word: 'நீங்கள்', translation: 'You (formal)', pronunciation: 'neengal', example: 'நீங்கள் எப்படி இருக்கிறீர்கள்?' },
      { word: 'நான்', translation: 'I / Me', pronunciation: 'naan', example: 'நான் நன்றாக இருக்கிறேன்' },
      { word: 'ஆம்', translation: 'Yes', pronunciation: 'aam', example: 'ஆம், நான் தயார்' },
      { word: 'இல்லை', translation: 'No', pronunciation: 'illai', example: 'இல்லை, நன்றி' },
      { word: 'என்ன', translation: 'What', pronunciation: 'enna', example: 'உங்களுக்கு என்ன வேண்டும்?' },
      { word: 'எங்கே', translation: 'Where', pronunciation: 'engae', example: 'சந்தை எங்கே இருக்கிறது?' },
    ],
  },
  ml: {
    greetings: [
      { word: 'നമസ്കാരം', translation: 'Hello / Greetings', pronunciation: 'namaskaram', example: 'നമസ്കാരം, സുഖമാണോ?' },
      { word: 'നന്ദി', translation: 'Thank you', pronunciation: 'nandi', example: 'നിങ്ങളുടെ സഹായത്തിന് നന്ദി' },
      { word: 'ദയവായി', translation: 'Please', pronunciation: 'dayavayi', example: 'ദയവായി ഇരിക്കൂ' },
      { word: 'വിട', translation: 'Goodbye', pronunciation: 'vida', example: 'പിന്നെ കാണാം, വിട' },
      { word: 'സുപ്രഭാതം', translation: 'Good morning', pronunciation: 'suprabhatham', example: 'സുപ്രഭാതം കൂട്ടുകാരാ' },
      { word: 'ക്ഷമിക്കണം', translation: 'Sorry / Excuse me', pronunciation: 'kshamikanam', example: 'ക്ഷമിക്കണം, എനിക്ക് വൈകി' },
    ],
    travel: [
      { word: 'ട്രെയിൻ', translation: 'Train', pronunciation: 'train', example: 'ട്രെയിൻ എപ്പോഴാണ് വരുന്നത്?' },
      { word: 'ബസ്', translation: 'Bus', pronunciation: 'bus', example: 'ബസ് സ്റ്റാൻഡ് എവിടെയാണ്?' },
      { word: 'ഹോട്ടൽ', translation: 'Hotel', pronunciation: 'hotel', example: 'ഹോട്ടൽ എവിടെയാണ്?' },
      { word: 'വലത്ത്', translation: 'Right', pronunciation: 'valathu', example: 'വലത്തോട്ട് തിരിയുക' },
      { word: 'ഇടത്ത്', translation: 'Left', pronunciation: 'idathu', example: 'ഇടത്തോട്ട് തിരിയുക' },
      { word: 'എത്ര', translation: 'How much', pronunciation: 'ethra', example: 'ഇതിന് എത്രയാകും?' },
    ],
    food: [
      { word: 'വെള്ളം', translation: 'Water', pronunciation: 'vellam', example: 'കുറച്ചു വെള്ളം തരുമോ?' },
      { word: 'ഭക്ഷണം', translation: 'Food', pronunciation: 'bhakshanam', example: 'ഭക്ഷണം വളരെ നല്ലതാണ്' },
      { word: 'ചായ', translation: 'Tea', pronunciation: 'chaya', example: 'ഒരു ചായ എടുക്കട്ടെ' },
      { word: 'ചോറ്', translation: 'Rice', pronunciation: 'choru', example: 'ചോറും കറിയും' },
      { word: 'മധുരം', translation: 'Sweet', pronunciation: 'madhuram', example: 'എനിക്ക് മധുരം ഇഷ്ടമാണ്' },
    ],
    conversation: [
      { word: 'നിങ്ങൾ', translation: 'You (formal)', pronunciation: 'ningal', example: 'നിങ്ങൾക്ക് സുഖമാണോ?' },
      { word: 'ഞാൻ', translation: 'I / Me', pronunciation: 'njan', example: 'ഞാൻ സുഖമായിരിക്കുന്നു' },
      { word: 'അതെ', translation: 'Yes', pronunciation: 'athe', example: 'അതെ, തീർച്ചയായും' },
      { word: 'ഇല്ല', translation: 'No', pronunciation: 'illa', example: 'ഇല്ല, നന്ദി' },
      { word: 'എന്ത്', translation: 'What', pronunciation: 'enthu', example: 'നിങ്ങൾക്ക് എന്ത് വേണം?' },
      { word: 'എവിടെ', translation: 'Where', pronunciation: 'evide', example: 'മാർക്കറ്റ് എവിടെയാണ്?' },
    ],
  },
  te: {
    greetings: [
      { word: 'నమస్కారం', translation: 'Hello / Greetings', pronunciation: 'namaskaram', example: 'నమస్కారం, మీరు ఎలా ఉన్నారు?' },
      { word: 'ధన్యవాదాలు', translation: 'Thank you', pronunciation: 'dhanyavadalu', example: 'చాలా ధన్యవాదాలు' },
      { word: 'దయచేసి', translation: 'Please', pronunciation: 'dayachesi', example: 'దయచేసి కూర్చోండి' },
      { word: 'వెళ్లి వస్తాను', translation: 'Goodbye', pronunciation: 'velli vastanu', example: 'మళ్ళీ కలుద్దాం, వెళ్లి వస్తాను' },
      { word: 'శుభోదయం', translation: 'Good morning', pronunciation: 'shubhodayam', example: 'శుభోదయం!' },
      { word: 'క్షమించండి', translation: 'Sorry / Excuse me', pronunciation: 'kshamincandi', example: 'క్షమించండి, ఆలస్యమైంది' },
    ],
    travel: [
      { word: 'రైలు', translation: 'Train', pronunciation: 'railu', example: 'రైలు ఎప్పుడు వస్తుంది?' },
      { word: 'బస్సు', translation: 'Bus', pronunciation: 'bassu', example: 'బస్సు స్టాండ్ ఎక్కడ ఉంది?' },
      { word: 'హోటల్', translation: 'Hotel', pronunciation: 'hotel', example: 'హోటల్ ఎక్కడ ఉంది?' },
      { word: 'కుడి', translation: 'Right', pronunciation: 'kudi', example: 'కుడి వైపుకు తిరగండి' },
      { word: 'ఎడమ', translation: 'Left', pronunciation: 'edama', example: 'ఎడమ వైపుకు వెళ్ళండి' },
      { word: 'ఎంత', translation: 'How much', pronunciation: 'entha', example: 'దీని ధర ఎంత?' },
    ],
    food: [
      { word: 'నీరు', translation: 'Water', pronunciation: 'neeru', example: 'కొంచెం నీరు ఇవ్వండి' },
      { word: 'ఆహారం', translation: 'Food', pronunciation: 'aharam', example: 'ఆహారం చాలా బాగుంది' },
      { word: 'టీ', translation: 'Tea', pronunciation: 'tea', example: 'ఒక టీ ఇవ్వండి' },
      { word: 'అన్నం', translation: 'Rice', pronunciation: 'annam', example: 'అన్నం మరియు పప్పు' },
      { word: 'తీపి', translation: 'Sweet', pronunciation: 'teepi', example: 'నాకు తీపి అంటే ఇష్టం' },
    ],
    conversation: [
      { word: 'మీరు', translation: 'You (formal)', pronunciation: 'meeru', example: 'మీరు ఎలా ఉన్నారు?' },
      { word: 'నేను', translation: 'I / Me', pronunciation: 'nenu', example: 'నేను బాగున్నాను' },
      { word: 'అవును', translation: 'Yes', pronunciation: 'avunu', example: 'అవును, తప్పకుండా' },
      { word: 'కాదు', translation: 'No', pronunciation: 'kaadu', example: 'కాదు, ధన్యవాదాలు' },
      { word: 'ఏమిటి', translation: 'What', pronunciation: 'emiti', example: 'మీకు ఏమి కావాలి?' },
      { word: 'ఎక్కడ', translation: 'Where', pronunciation: 'ekkada', example: 'మార్కెట్ ఎక్కడ ఉంది?' },
    ],
  },
  kn: {
    greetings: [
      { word: 'ನಮಸ್ಕಾರ', translation: 'Hello / Greetings', pronunciation: 'namaskara', example: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?' },
      { word: 'ಧನ್ಯವಾದಗಳು', translation: 'Thank you', pronunciation: 'dhanyavadagalu', example: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು' },
      { word: 'ದಯವಿಟ್ಟು', translation: 'Please', pronunciation: 'dayavittu', example: 'ದಯವಿಟ್ಟು ಕುಳಿತುಕೊಳ್ಳಿ' },
      { word: 'ಹೋಗಿ ಬರುತ್ತೇನೆ', translation: 'Goodbye', pronunciation: 'hogi baruthene', example: 'ಮತ್ತೆ ಸಿಗೋಣ, ಹೋಗಿ ಬರುತ್ತೇನೆ' },
      { word: 'ಶುಭೋದಯ', translation: 'Good morning', pronunciation: 'shubhODaya', example: 'ಶುಭೋದಯ!' },
      { word: 'ಕ್ಷಮಿಸಿ', translation: 'Sorry / Excuse me', pronunciation: 'kshamisi', example: 'ಕ್ಷಮಿಸಿ, ತಡವಾಯಿತು' },
    ],
    travel: [
      { word: 'ರೈಲು', translation: 'Train', pronunciation: 'railu', example: 'ರೈಲು ಯಾವಾಗ ಬರುತ್ತದೆ?' },
      { word: 'ಬಸ್ಸು', translation: 'Bus', pronunciation: 'bassu', example: 'ಬಸ್ಸು ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?' },
      { word: 'ಹೋಟೆಲ್', translation: 'Hotel', pronunciation: 'hotel', example: 'ಹೋಟೆಲ್ ಎಲ್ಲಿದೆ?' },
      { word: 'ಬಲ', translation: 'Right', pronunciation: 'bala', example: 'ಬಲಕ್ಕೆ ತಿರುಗಿ' },
      { word: 'ಎಡ', translation: 'Left', pronunciation: 'eda', example: 'ಎಡಕ್ಕೆ ಹೋಗಿ' },
      { word: 'ಎಷ್ಟು', translation: 'How much', pronunciation: 'eshtu', example: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?' },
    ],
    food: [
      { word: 'ನೀರು', translation: 'Water', pronunciation: 'neeru', example: 'ಸ್ವಲ್ಪ ನೀರು ಕೊಡಿ' },
      { word: 'ಆಹಾರ', translation: 'Food', pronunciation: 'aahara', example: 'ಆಹಾರ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ' },
      { word: 'ಟೀ', translation: 'Tea', pronunciation: 'tea', example: 'ಒಂದು ಟೀ ಕೊಡಿ' },
      { word: 'ಅನ್ನ', translation: 'Rice', pronunciation: 'anna', example: 'ಅನ್ನ ಮತ್ತು ಸಾರು' },
      { word: 'ಸಿಹಿ', translation: 'Sweet', pronunciation: 'sihi', example: 'ನನಗೆ ಸಿಹಿ ಇಷ್ಟ' },
    ],
    conversation: [
      { word: 'ನೀವು', translation: 'You (formal)', pronunciation: 'neevu', example: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?' },
      { word: 'ನಾನು', translation: 'I / Me', pronunciation: 'naanu', example: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ' },
      { word: 'ಹೌದು', translation: 'Yes', pronunciation: 'houdu', example: 'ಹೌದು, ಖಂಡಿತ' },
      { word: 'ಇಲ್ಲ', translation: 'No', pronunciation: 'illa', example: 'ಇಲ್ಲ, ಧನ್ಯವಾದಗಳು' },
      { word: 'ಏನು', translation: 'What', pronunciation: 'enu', example: 'ನಿಮಗೆ ಏನು ಬೇಕು?' },
      { word: 'ಎಲ್ಲಿ', translation: 'Where', pronunciation: 'elli', example: 'ಮಾರುಕಟ್ಟೆ ಎಲ್ಲಿದೆ?' },
    ],
  },
}

// Fallback vocabulary for unsupported languages
const FALLBACK_VOCAB = {
  greetings: [
    { word: 'नमस्ते', translation: 'Hello', pronunciation: 'namaste', example: 'नमस्ते!' },
    { word: 'धन्यवाद', translation: 'Thank you', pronunciation: 'dhanyavaad', example: 'धन्यवाद!' },
    { word: 'अलविदा', translation: 'Goodbye', pronunciation: 'alvida', example: 'अलविदा!' },
  ],
  travel: [
    { word: 'बस', translation: 'Bus', pronunciation: 'bas', example: 'बस कहाँ है?' },
    { word: 'होटल', translation: 'Hotel', pronunciation: 'hotel', example: 'होटल है?' },
    { word: 'कितना', translation: 'How much', pronunciation: 'kitna', example: 'कितना है?' },
  ],
  food: [
    { word: 'पानी', translation: 'Water', pronunciation: 'paani', example: 'पानी दो' },
    { word: 'खाना', translation: 'Food', pronunciation: 'khaana', example: 'खाना है?' },
  ],
  conversation: [
    { word: 'हाँ', translation: 'Yes', pronunciation: 'haan', example: 'हाँ' },
    { word: 'नहीं', translation: 'No', pronunciation: 'nahin', example: 'नहीं' },
    { word: 'क्या', translation: 'What', pronunciation: 'kya', example: 'क्या?' },
  ],
  tech: [
    { word: 'टेक्नोलॉजी', translation: 'Technology', pronunciation: 'technology', example: 'नयी टेक्नोलॉजी' },
    { word: 'कंप्यूटर', translation: 'Computer', pronunciation: 'computer', example: 'मेरा कंप्यूटर' },
  ],
  arts: [
    { word: 'कला', translation: 'Art', pronunciation: 'kala', example: 'सुंदर कला' },
    { word: 'संगीत', translation: 'Music', pronunciation: 'sangeet', example: 'अच्छा संगीत' },
  ],
  sports: [
    { word: 'खेल', translation: 'Sport / Game', pronunciation: 'khel', example: 'मुझे खेल पसंद है' },
    { word: 'गेंद', translation: 'Ball', pronunciation: 'gend', example: 'गेंद लाओ' },
  ],
}

// ── Topic map per goal ───────────────────────────────────────────────────────
const GOAL_TOPICS = {
  travel:       ['greetings', 'travel', 'food'],
  conversation: ['greetings', 'conversation', 'food'],
  work:         ['greetings', 'conversation', 'food'],
  study:        ['greetings', 'conversation', 'food'],
  family:       ['greetings', 'conversation', 'food'],
  culture:      ['greetings', 'conversation', 'food'],
  fun:          ['greetings', 'food', 'conversation'],
}

// ── Age-based pacing config ──────────────────────────────────────────────────
const AGE_CONFIG = {
  child:       { maxVocab: 3, exercisesPerLesson: 4, complexity: 'simple',    tone: 'playful' },
  teen:        { maxVocab: 5, exercisesPerLesson: 5, complexity: 'moderate',  tone: 'casual' },
  'young-adult': { maxVocab: 6, exercisesPerLesson: 6, complexity: 'standard', tone: 'friendly' },
  adult:       { maxVocab: 6, exercisesPerLesson: 6, complexity: 'standard',  tone: 'professional' },
  senior:      { maxVocab: 4, exercisesPerLesson: 4, complexity: 'simple',    tone: 'clear' },
}

// ── Get vocab bank for a language/goal combo ─────────────────────────────────
function getVocabForGoal(languageId, goal, interests = '') {
  const bank = VOCABULARY_BANKS[languageId] || FALLBACK_VOCAB
  const topics = GOAL_TOPICS[goal] || ['greetings', 'conversation', 'food']
  
  const activeTopics = [...topics]
  const interestLower = (interests || '').toLowerCase()
  if (interestLower && bank[interestLower] && !activeTopics.includes(interestLower)) {
    activeTopics.push(interestLower)
  } else if (interestLower && FALLBACK_VOCAB[interestLower] && !activeTopics.includes(interestLower)) {
    activeTopics.push(interestLower)
  }

  const result = []
  for (const topic of activeTopics) {
    const topicVocab = bank[topic] || FALLBACK_VOCAB[topic] || []
    result.push(...topicVocab)
  }
  // Deduplicate by word
  const seen = new Set()
  return result.filter((v) => {
    if (seen.has(v.word)) return false
    seen.add(v.word)
    return true
  })
}

// ── Generate exercises from vocab ────────────────────────────────────────────
function generateExercises(vocab, ageConfig, lessonIndex = 0, learningStyle = 'balanced') {
  const exercises = []
  const maxItems = Math.min(vocab.length, ageConfig.maxVocab)
  const selectedVocab = vocab.slice(0, maxItems)
  const style = (learningStyle || 'balanced').toLowerCase()

  // 1. Multiple choice — what does X mean?
  if (selectedVocab.length >= 1 && style !== 'auditory') {
    const target = selectedVocab[0]
    const distractors = vocab
      .filter((v) => v.word !== target.word)
      .map((v) => v.translation)
      .slice(0, 3)
    const options = [...distractors, target.translation].sort(() => Math.random() - 0.5)
    exercises.push({
      id: `ex-mcq-${lessonIndex}-0`,
      type: 'multiple-choice',
      prompt: `What does "${target.word}" mean?`,
      options,
      correctAnswer: target.translation,
      xp: 10,
    })
  }

  // 2. Listening exercise — TTS audio + select word
  if (selectedVocab.length >= 2 && style !== 'kinesthetic') {
    const target = selectedVocab[1]
    const distractors = selectedVocab
      .filter((v) => v.word !== target.word)
      .map((v) => v.word)
      .slice(0, 3)
    const options = [...distractors, target.word].sort(() => Math.random() - 0.5)
    exercises.push({
      id: `ex-listen-${lessonIndex}-1`,
      type: 'listening',
      prompt: 'Listen to the audio and select what you hear',
      audioText: target.word,
      options,
      correctAnswer: target.word,
      xp: 15,
    })
  }

  // 3. Speaking exercise — TTS model + STT
  if (selectedVocab.length >= 1 && style !== 'visual') {
    const target = selectedVocab[lessonIndex % selectedVocab.length] || selectedVocab[0]
    exercises.push({
      id: `ex-speak-${lessonIndex}-2`,
      type: 'speaking',
      prompt: `Say this word aloud:`,
      targetWord: target.word,
      pronunciation: target.pronunciation,
      correctAnswer: target.word,
      xp: 15,
    })
  }

  // 4. Translation exercise
  if (selectedVocab.length >= 3 && ageConfig.complexity !== 'simple') {
    const target = selectedVocab[2]
    exercises.push({
      id: `ex-trans-${lessonIndex}-3`,
      type: 'translation',
      prompt: `Translate "${target.translation}" to the target language`,
      correctAnswer: target.word,
      wordBank: selectedVocab.map((v) => v.word).sort(() => Math.random() - 0.5),
      xp: 15,
    })
  }

  // 5. Matching (for older kids/adults with enough vocab)
  if (selectedVocab.length >= 4 && ageConfig.complexity !== 'simple' && style !== 'auditory') {
    const pairs = selectedVocab.slice(0, 4).map((v) => ({ word: v.word, meaning: v.translation }))
    exercises.push({
      id: `ex-match-${lessonIndex}-4`,
      type: 'matching',
      prompt: 'Match the words with their meanings',
      pairs,
      xp: 20,
    })
  }

  // Ensure minimum exercises based on ageConfig if some were skipped
  while (exercises.length > 0 && exercises.length < ageConfig.exercisesPerLesson) {
    // Add extra multiple-choice if we need more exercises
    const randomVocab = selectedVocab[Math.floor(Math.random() * selectedVocab.length)]
    exercises.push({
      id: `ex-mcq-extra-${lessonIndex}-${exercises.length}`,
      type: 'multiple-choice',
      prompt: `Review: What does "${randomVocab.word}" mean?`,
      options: [randomVocab.translation, 'Dummy A', 'Dummy B', 'Dummy C'].sort(() => Math.random() - 0.5),
      correctAnswer: randomVocab.translation,
      xp: 10,
    })
  }

  return exercises.slice(0, ageConfig.exercisesPerLesson)
}

// ── Build a lesson object ─────────────────────────────────────────────────────
function buildLesson(languageId, goal, ageRange, lessonIndex, level, learningStyle = 'balanced', interests = 'culture') {
  const ageConfig = AGE_CONFIG[ageRange] || AGE_CONFIG['adult']
  const allVocab = getVocabForGoal(languageId, goal, interests)

  // Rotate vocab windows per lesson (different words each lesson)
  const windowSize = ageConfig.maxVocab
  const offset = (lessonIndex * windowSize) % Math.max(allVocab.length, 1)
  const window = [
    ...allVocab.slice(offset),
    ...allVocab.slice(0, offset),
  ].slice(0, windowSize)

  const topicLabels = {
    0: 'Greetings & Introductions',
    1: 'Common Phrases',
    2: 'Essential Vocabulary',
    3: 'Practical Expressions',
    4: 'Everyday Conversations',
    5: 'Real-world Situations',
    6: 'Advanced Practice',
  }
  const lessonName = topicLabels[lessonIndex] || `Lesson ${lessonIndex + 1}`

  const exercises = generateExercises(window, ageConfig, lessonIndex, learningStyle)

  return {
    id: `${languageId}-dynamic-${lessonIndex}`,
    name: lessonName,
    nameNative: lessonName,
    unit: lessonIndex < 3 ? 'Unit 1: Foundations' : lessonIndex < 6 ? 'Unit 2: Building Skills' : 'Unit 3: Fluency',
    order: lessonIndex + 1,
    isDynamic: true,
    vocabulary: window,
    exercises,
  }
}

// ── Generate a personalized learning plan ────────────────────────────────────
export function generateLearningPlan({ languageId, ageRange, goal, level, assessmentScore, dailyGoal }) {
  const ageConfig = AGE_CONFIG[ageRange] || AGE_CONFIG['adult']
  const topics = GOAL_TOPICS[goal] || ['greetings', 'conversation', 'food']

  const focusAreas = {
    travel:       ['Travel phrases', 'Directions', 'Restaurants', 'Transport', 'Practical vocabulary'],
    conversation: ['Everyday conversation', 'Essential vocabulary', 'Listening', 'Speaking'],
    work:         ['Professional vocabulary', 'Formal greetings', 'Numbers', 'Business phrases'],
    study:        ['Grammar', 'Reading', 'Writing', 'Academic vocabulary'],
    family:       ['Family terms', 'Everyday conversation', 'Emotions', 'Celebrations'],
    culture:      ['Cultural phrases', 'Traditions', 'Food & festivals', 'Poetry & proverbs'],
    fun:          ['Popular phrases', 'Entertainment', 'Games', 'Stories'],
  }[goal] || ['Everyday conversation', 'Essential vocabulary', 'Listening', 'Speaking']

  const startingLevel = assessmentScore !== null && assessmentScore !== undefined
    ? (assessmentScore <= 30 ? 'Beginner' : assessmentScore <= 60 ? 'Elementary' : assessmentScore <= 80 ? 'Intermediate' : 'Advanced')
    : 'Beginner'

  const totalLessons = dailyGoal <= 5 ? 20 : dailyGoal <= 10 ? 30 : dailyGoal <= 15 ? 40 : 50

  return {
    startingLevel,
    goal: goal.charAt(0).toUpperCase() + goal.slice(1),
    dailyPractice: `${dailyGoal} min`,
    focusAreas,
    agePersonalization: {
      tone: ageConfig.tone,
      complexity: ageConfig.complexity,
      lessonsPerDay: Math.max(1, Math.floor(dailyGoal / 10)),
    },
    totalLessons,
    recommendedFirstLesson: 'Greetings & Introductions',
    generatedAt: new Date().toISOString(),
  }
}

// ── Get dynamic lessons for a user ───────────────────────────────────────────
export function getDynamicLessons({ languageId, goal, ageRange, level, learningStyle, interests, count = 10 }) {
  const lessons = []
  for (let i = 0; i < count; i++) {
    lessons.push(buildLesson(languageId, goal, ageRange, i, level, learningStyle, interests))
  }
  return lessons
}

// ── Get a single dynamic lesson by index ─────────────────────────────────────
export function getDynamicLesson({ languageId, goal, ageRange, level, learningStyle, interests, lessonIndex }) {
  return buildLesson(languageId, goal, ageRange, lessonIndex, level, learningStyle, interests)
}

// ── Generate dynamic assessment questions ────────────────────────────────────
export function generateAssessmentQuestions({ languageId, ageRange, goal, interests, count = 6 }) {
  const ageConfig = AGE_CONFIG[ageRange] || AGE_CONFIG['adult']
  const allVocab = getVocabForGoal(languageId, goal || 'conversation', interests)
  const shuffled = allVocab.sort(() => Math.random() - 0.5)
  const questions = []

  // Q1: Multiple choice vocabulary
  if (shuffled.length >= 1) {
    const target = shuffled[0]
    const distractors = shuffled.filter((v) => v.word !== target.word).map((v) => v.translation).slice(0, 3)
    questions.push({
      type: 'multiple-choice',
      prompt: `What does "${target.word}" mean?`,
      options: [...distractors, target.translation].sort(() => Math.random() - 0.5),
      correctAnswer: target.translation,
      xp: 10,
    })
  }

  // Q2: Listening (TTS) question
  if (shuffled.length >= 2) {
    const target = shuffled[1]
    const distractors = shuffled.filter((v) => v.word !== target.word).map((v) => v.word).slice(0, 3)
    questions.push({
      type: 'listening',
      prompt: 'Listen to the audio and select what you hear',
      audioText: target.word,
      options: [...distractors, target.word].sort(() => Math.random() - 0.5),
      correctAnswer: target.word,
      xp: 15,
    })
  }

  // Q3: Speaking (STT) question
  if (shuffled.length >= 3) {
    const target = shuffled[2]
    questions.push({
      type: 'speaking',
      prompt: `Say this word aloud:`,
      targetWord: target.word,
      pronunciation: target.pronunciation,
      correctAnswer: target.word,
      xp: 15,
    })
  }

  // Q4–Q6: More multiple choice
  for (let i = 3; i < Math.min(shuffled.length, count); i++) {
    const target = shuffled[i]
    const distractors = shuffled.filter((v) => v.word !== target.word).map((v) => v.translation).slice(0, 3)
    questions.push({
      type: 'multiple-choice',
      prompt: `What does "${target.word}" mean?`,
      options: [...distractors, target.translation].sort(() => Math.random() - 0.5),
      correctAnswer: target.translation,
      xp: 10,
    })
    if (questions.length >= count) break
  }

  return questions
}
