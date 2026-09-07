export const rajasthaniLessons = [
  // UNIT 1: FUNDAMENTALS & ESSENTIALS
  {
    id: 'raj-greetings',
    name: 'Greetings & Salutations',
    nameNative: 'राम राम सा और खम्मा घणी',
    unit: 'Unit 1: Fundamentals',
    order: 1,
    vocabulary: [
      { word: 'खम्मा घणी', translation: 'Greetings / Royal Respect', pronunciation: 'khamma ghani', example: 'खम्मा घणी सा, थे क्यां हो?' },
      { word: 'राम राम सा', translation: 'Hello / Traditional Salutation', pronunciation: 'ram ram sa', example: 'राम राम सा, पधारो म्हारे देश' },
      { word: 'घणो आभार', translation: 'Thank you very much', pronunciation: 'ghano aabhar', example: 'आपरो घणो आभार सा' },
      { word: 'कृपा कर', translation: 'Please', pronunciation: 'kripa kar', example: 'कृपा कर बिराजो' },
      { word: 'पाछा मिलस्यां', translation: 'See you again / Goodbye', pronunciation: 'paacha milsyaan', example: 'पाछा मिलस्यां सा!' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "खम्मा घणी" mean?',
        options: ['Greetings / Hello', 'Thank you', 'Please', 'Goodbye'],
        correctAnswer: 'Greetings / Hello',
        xp: 10,
      },
      {
        type: 'listening',
        prompt: 'Listen to the audio and select what you hear',
        audioText: 'राम राम सा',
        options: ['खम्मा घणी', 'राम राम सा', 'घणो आभार', 'पाछा मिलस्यां'],
        correctAnswer: 'राम राम सा',
        xp: 15,
      },
      {
        type: 'speaking',
        prompt: 'Say this royal greeting aloud: "खम्मा घणी सा"',
        targetWord: 'खम्मा घणी सा',
        pronunciation: 'khamma ghani sa',
        correctAnswer: 'खम्मा घणी सा',
        xp: 15,
      },
      {
        type: 'translation',
        prompt: 'Translate "Thank you" to Rajasthani',
        correctAnswer: 'घणो आभार',
        wordBank: ['घणो आभार', 'खम्मा घणी', 'कृपा कर', 'हाँ'],
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match Rajasthani greetings with meanings',
        pairs: [
          { word: 'खम्मा घणी', meaning: 'Greetings' },
          { word: 'राम राम सा', meaning: 'Hello' },
          { word: 'घणो आभार', meaning: 'Thank you' },
          { word: 'पाछा मिलस्यां', meaning: 'See you again' },
        ],
        xp: 20,
      },
    ],
  },
  {
    id: 'raj-everyday',
    name: 'Everyday Essentials',
    nameNative: 'दैनिक बोलचाल रा शब्द',
    unit: 'Unit 1: Fundamentals',
    order: 2,
    vocabulary: [
      { word: 'पाणी', translation: 'Water', pronunciation: 'paani', example: 'म्हाने पाणी पावो' },
      { word: 'घर', translation: 'Home / House', pronunciation: 'ghar', example: 'ओ म्हारो घर है' },
      { word: 'भाईबंद', translation: 'Friend / Companion', pronunciation: 'bhaiband', example: 'वो म्हारो साचो भाईबंद है' },
      { word: 'पोथी', translation: 'Book', pronunciation: 'pothi', example: 'पोथी बांचो' },
      { word: 'हाँ', translation: 'Yes', pronunciation: 'haan', example: 'हाँ, मैं त्यार हूँ' },
      { word: 'ना', translation: 'No', pronunciation: 'naa', example: 'ना सा' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "पाणी" mean?',
        options: ['Water', 'Home', 'Friend', 'Book'],
        correctAnswer: 'Water',
        xp: 10,
      },
      {
        type: 'sentence-order',
        prompt: 'Arrange words: "This is my home"',
        sentence: 'ओ म्हारो घर है',
        words: ['है', 'ओ', 'घर', 'म्हारो'],
        correctAnswer: 'ओ म्हारो घर है',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match words with meanings',
        pairs: [
          { word: 'पाणी', meaning: 'Water' },
          { word: 'घर', meaning: 'Home' },
          { word: 'भाईबंद', meaning: 'Friend' },
          { word: 'पोथी', meaning: 'Book' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 2: NUMBERS & DAILY LIFE
  {
    id: 'raj-numbers',
    name: 'Numbers 1 to 10',
    nameNative: 'गिनती १-१०',
    unit: 'Unit 2: Daily Life',
    order: 3,
    vocabulary: [
      { word: 'एक', translation: 'One', pronunciation: 'ek', example: 'एक कप चाय' },
      { word: 'दो', translation: 'Two', pronunciation: 'do', example: 'दो टिकट' },
      { word: 'तीन', translation: 'Three', pronunciation: 'teen', example: 'तीन जणा' },
      { word: 'चार', translation: 'Four', pronunciation: 'chaar', example: 'चार कमरा' },
      { word: 'पाँच', translation: 'Five', pronunciation: 'paanch', example: 'पाँच मिनट' },
      { word: 'दस', translation: 'Ten', pronunciation: 'das', example: 'दस रुपिया' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "एक" mean?',
        options: ['One', 'Two', 'Three', 'Ten'],
        correctAnswer: 'One',
        xp: 10,
      },
      {
        type: 'fill-blank',
        prompt: 'Sequence: एक, दो, ___ , चार',
        options: ['तीन', 'पाँच', 'दस', 'छह'],
        correctAnswer: 'तीन',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match numbers in Rajasthani',
        pairs: [
          { word: 'एक', meaning: 'One' },
          { word: 'दो', meaning: 'Two' },
          { word: 'तीन', meaning: 'Three' },
          { word: 'दस', meaning: 'Ten' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 3: FOOD & DINING
  {
    id: 'raj-food',
    name: 'Food & Royal Dal Baati',
    nameNative: 'जीमण और दाल बाटी',
    unit: 'Unit 3: Food & Dining',
    order: 4,
    vocabulary: [
      { word: 'खाणो', translation: 'Food / Meal', pronunciation: 'khaano', example: 'चोखो खाणो' },
      { word: 'चाय', translation: 'Tea', pronunciation: 'chaay', example: 'गरम चाय' },
      { word: 'दूध', translation: 'Milk', pronunciation: 'doodh', example: 'दूध पियो' },
      { word: 'दाल बाटी चूरमा', translation: 'Dal Baati Churma', pronunciation: 'daal baati churma', example: 'राजस्थान री प्रसिद्ध दाल बाटी' },
      { word: 'घेवर', translation: 'Ghewar (Sweet)', pronunciation: 'ghewar', example: 'मीठो घेवर' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "खाणो" mean?',
        options: ['Food', 'Tea', 'Milk', 'Water'],
        correctAnswer: 'Food',
        xp: 10,
      },
      {
        type: 'speaking',
        prompt: 'Say: "दाल बाटी चूरमा"',
        targetWord: 'दाल बाटी चूरमा',
        pronunciation: 'daal baati churma',
        correctAnswer: 'दाल बाटी चूरमा',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match food vocabulary',
        pairs: [
          { word: 'खाणो', meaning: 'Food' },
          { word: 'चाय', meaning: 'Tea' },
          { word: 'दाल बाटी चूरमा', meaning: 'Dal Baati Churma' },
          { word: 'घेवर', meaning: 'Ghewar' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 4: FAMILY & RELATIONS
  {
    id: 'raj-family',
    name: 'Family & Relations',
    nameNative: 'कुटुंब और नातो',
    unit: 'Unit 4: Family & Relations',
    order: 5,
    vocabulary: [
      { word: 'मां', translation: 'Mother', pronunciation: 'maan', example: 'म्हारी मां' },
      { word: 'बाबो सा', translation: 'Father', pronunciation: 'baabo sa', example: 'म्हारा बाबो सा' },
      { word: 'भाई', translation: 'Brother', pronunciation: 'bhai', example: 'म्हारो मोटो भाई' },
      { word: 'बाई सा', translation: 'Sister / Respectful Sister', pronunciation: 'baai sa', example: 'म्हारी बाई सा' },
      { word: 'कुटुंब', translation: 'Family', pronunciation: 'kutumb', example: 'म्हारो प्यारो कुटुंब' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "बाबो सा" mean?',
        options: ['Father', 'Mother', 'Sister', 'Brother'],
        correctAnswer: 'Father',
        xp: 10,
      },
      {
        type: 'listening',
        prompt: 'Listen and select what you hear',
        audioText: 'कुटुंब',
        options: ['मां', 'बाबो सा', 'भाई', 'कुटुंब'],
        correctAnswer: 'कुटुंब',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match family relations',
        pairs: [
          { word: 'मां', meaning: 'Mother' },
          { word: 'बाबो सा', meaning: 'Father' },
          { word: 'भाई', meaning: 'Brother' },
          { word: 'बाई सा', meaning: 'Sister' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 5: TRAVEL & DIRECTIONS
  {
    id: 'raj-travel',
    name: 'Travel & Heritage Places',
    nameNative: 'सफर और रास्ता',
    unit: 'Unit 5: Travel & Places',
    order: 6,
    vocabulary: [
      { word: 'कठै', translation: 'Where', pronunciation: 'kathai', example: 'स्टेशन कठै है सा?' },
      { word: 'रस्तो', translation: 'Road / Street', pronunciation: 'rasto', example: 'सीधो रस्तो' },
      { word: 'बजार', translation: 'Market', pronunciation: 'bazaar', example: 'जोहरी बजार' },
      { word: 'गढ', translation: 'Fort / Palace', pronunciation: 'gadh', example: 'मेहरानगढ' },
      { word: 'दावने', translation: 'Right side', pronunciation: 'daavne', example: 'दावने मुडो' },
      { word: 'डावे', translation: 'Left side', pronunciation: 'daave', example: 'डावे मुडो' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "कठै" mean?',
        options: ['Where', 'When', 'Why', 'How'],
        correctAnswer: 'Where',
        xp: 10,
      },
      {
        type: 'sentence-order',
        prompt: 'Arrange: "Where is the fort?"',
        sentence: 'गढ कठै है',
        words: ['है', 'गढ', 'कठै'],
        correctAnswer: 'गढ कठै है',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match travel terms',
        pairs: [
          { word: 'कठै', meaning: 'Where' },
          { word: 'रस्तो', meaning: 'Road' },
          { word: 'गढ', meaning: 'Fort' },
          { word: 'दावने', meaning: 'Right side' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 6: SHOPPING & BAZAARS
  {
    id: 'raj-shopping',
    name: 'Shopping & Bazaars',
    nameNative: 'हाट और मोलभाव',
    unit: 'Unit 6: Shopping & Bazaars',
    order: 7,
    vocabulary: [
      { word: 'दाम', translation: 'Price / Cost', pronunciation: 'daam', example: 'इणरो दाम कांई है?' },
      { word: 'रुपिया', translation: 'Rupees', pronunciation: 'rupiya', example: 'सो रुपिया' },
      { word: 'महंगो', translation: 'Expensive', pronunciation: 'mehango', example: 'घणो महंगो है' },
      { word: 'सस्तो', translation: 'Cheap / Affordable', pronunciation: 'sasto', example: 'सस्तो माल' },
      { word: 'दुकान', translation: 'Shop', pronunciation: 'dukaan', example: 'बापूबजार री दुकान' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "दाम" mean?',
        options: ['Price', 'Shop', 'Money', 'Clothes'],
        correctAnswer: 'Price',
        xp: 10,
      },
      {
        type: 'speaking',
        prompt: 'Say: "इणरो दाम कांई है" (What is its price?)',
        targetWord: 'इणरो दाम कांई है',
        pronunciation: 'inro daam kaani hai',
        correctAnswer: 'इणरो दाम कांई है',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match shopping terms',
        pairs: [
          { word: 'दाम', meaning: 'Price' },
          { word: 'महंगो', meaning: 'Expensive' },
          { word: 'सस्तो', meaning: 'Cheap' },
          { word: 'दुकान', meaning: 'Shop' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 7: HEALTH & EMERGENCY
  {
    id: 'raj-health',
    name: 'Health & Medical Assistance',
    nameNative: 'तबीयत और इलाज',
    unit: 'Unit 7: Health & Wellness',
    order: 8,
    vocabulary: [
      { word: 'डाकदर', translation: 'Doctor', pronunciation: 'daakdar', example: 'डाकदर सा ने बुलाओ' },
      { word: 'दवाई', translation: 'Medicine', pronunciation: 'dawaii', example: 'टेम पे दवाई लो' },
      { word: 'दवाखाणो', translation: 'Hospital', pronunciation: 'dawakhaano', example: 'बडो दवाखाणो' },
      { word: 'दुख पावे', translation: 'Pain / Sickness', pronunciation: 'dukh paave', example: 'माथो दुख पावे' },
      { word: 'मदद', translation: 'Help', pronunciation: 'madad', example: 'कृपा कर मदद करो' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "दवाई" mean?',
        options: ['Medicine', 'Doctor', 'Hospital', 'Pain'],
        correctAnswer: 'Medicine',
        xp: 10,
      },
      {
        type: 'fill-blank',
        prompt: 'Complete: "कृपा कर ___ करो" (Please help)',
        options: ['मदद', 'दवाई', 'डाकदर', 'दुख'],
        correctAnswer: 'मदद',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match medical vocabulary',
        pairs: [
          { word: 'डाकदर', meaning: 'Doctor' },
          { word: 'दवाई', meaning: 'Medicine' },
          { word: 'दवाखाणो', meaning: 'Hospital' },
          { word: 'मदद', meaning: 'Help' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 8: WORK & PROFESSIONAL LIFE
  {
    id: 'raj-work',
    name: 'Work & Community',
    nameNative: 'काम-धंधो और चौपाल',
    unit: 'Unit 8: Work & Professional',
    order: 9,
    vocabulary: [
      { word: 'काम', translation: 'Work / Job', pronunciation: 'kaam', example: 'आज घणो काम है' },
      { word: 'दफ्तर', translation: 'Office', pronunciation: 'daftar', example: 'दफ्तर रो टेम' },
      { word: 'सभा', translation: 'Meeting / Gathering', pronunciation: 'sabha', example: 'चौपाल री सभा' },
      { word: 'टेम', translation: 'Time', pronunciation: 'tem', example: 'सही टेम पर आओ' },
      { word: 'संदेशो', translation: 'Message', pronunciation: 'sandesho', example: 'संदेशो भेजो' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "दफ्तर" mean?',
        options: ['Office', 'Meeting', 'Time', 'Message'],
        correctAnswer: 'Office',
        xp: 10,
      },
      {
        type: 'matching',
        prompt: 'Match workplace vocabulary',
        pairs: [
          { word: 'काम', meaning: 'Work' },
          { word: 'दफ्तर', meaning: 'Office' },
          { word: 'सभा', meaning: 'Meeting' },
          { word: 'टेम', meaning: 'Time' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 9: CULTURE & CELEBRATIONS
  {
    id: 'raj-festivals',
    name: 'Festivals & Rajasthani Folk Culture',
    nameNative: 'त्योहार और राजस्थानी संस्कृति',
    unit: 'Unit 9: Culture & Celebrations',
    order: 10,
    vocabulary: [
      { word: 'त्योहार', translation: 'Festival', pronunciation: 'tyohaar', example: 'तीज और गणगौर रो त्योहार' },
      { word: 'बधाई', translation: 'Congratulations / Wishes', pronunciation: 'badhaai', example: 'घणी घणी बधाई सा' },
      { word: 'खुशी', translation: 'Happiness / Joy', pronunciation: 'khushi', example: 'बडी खुशी री बात' },
      { word: 'घूमर', translation: 'Ghoomar Dance', pronunciation: 'ghoomar', example: 'राजस्थानी घूमर नृत्य' },
      { word: 'गीत', translation: 'Folk Song / Music', pronunciation: 'geet', example: 'केसरिया बालम गीत' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "घूमर" refer to?',
        options: ['Traditional Dance', 'Sweet Dish', 'Folk Song', 'Dress'],
        correctAnswer: 'Traditional Dance',
        xp: 10,
      },
      {
        type: 'speaking',
        prompt: 'Say: "पधारो म्हारे देश" (Welcome to my land)',
        targetWord: 'पधारो म्हारे देश',
        pronunciation: 'padhaaro mhaare desh',
        correctAnswer: 'पधारो म्हारे देश',
        xp: 15,
      },
      {
        type: 'matching',
        prompt: 'Match cultural terms',
        pairs: [
          { word: 'त्योहार', meaning: 'Festival' },
          { word: 'बधाई', meaning: 'Congratulations' },
          { word: 'घूमर', meaning: 'Ghoomar Dance' },
          { word: 'गीत', meaning: 'Folk Song' },
        ],
        xp: 20,
      },
    ],
  },

  // UNIT 10: FLUENCY & IDIOMS
  {
    id: 'raj-mastery',
    name: 'Fluency & Rajasthani Kahavata',
    nameNative: 'कहावतां और प्रवीणता',
    unit: 'Unit 10: Fluency & Mastery',
    order: 11,
    vocabulary: [
      { word: 'ऊँट रे मुंह में जीरा', translation: 'A drop in the ocean / Too little', pronunciation: 'oont re munh mein jeera', example: 'इत्ती सी मदद ऊँट रे मुंह में जीरा ज्यूं है' },
      { word: 'आप मरे बिना सरग नी मिले', translation: 'One must experience struggle to achieve success', pronunciation: 'aap mare bina sarag ni mile', example: 'खुद मेहनत करो, आप मरे बिना सरग नी मिले' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does the proverb "ऊँट रे मुंह में जीरा" signify?',
        options: ['Too small an amount / A drop in ocean', 'Camel loves cumin', 'Feed animals', 'Desert life'],
        correctAnswer: 'Too small an amount / A drop in ocean',
        xp: 15,
      },
      {
        type: 'reading',
        prompt: 'Read this Rajasthani passage and answer:',
        passage: 'मानसिंह जयपुर गयो और हवामहल देख्यो। गुलाबी पत्थरां सूं बण्यो हवामहल देख र वो घणो राजी होयो।',
        question: 'Which monument did Maan Singh visit in Jaipur?',
        options: ['Hawa Mahal (हवामहल)', 'Amer Fort', 'City Palace', 'Jantar Mantar'],
        correctAnswer: 'Hawa Mahal (हवामहल)',
        xp: 20,
      },
      {
        type: 'matching',
        prompt: 'Match Rajasthani proverbs',
        pairs: [
          { word: 'ऊँट रे मुंह में जीरा', meaning: 'Too little / Drop in ocean' },
          { word: 'आप मरे बिना सरग नी मिले', meaning: 'Personal effort needed for success' },
        ],
        xp: 25,
      },
    ],
  },
]
