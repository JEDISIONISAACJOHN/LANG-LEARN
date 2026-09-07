// Cross-lingual translation dictionary and prompt templates for LangLearn
// Supports: Hindi (hi), Tamil (ta), Telugu (te), Malayalam (ml), Kannada (kn), English (en)

export const promptTemplates = {
  // Meaning / Multiple Choice
  meaning: {
    en: (w) => `What does "${w}" mean?`,
    hi: (w) => `"${w}" का क्या अर्थ है?`,
    ta: (w) => `"${w}" என்பதன் பொருள் என்ன?`,
    te: (w) => `"${w}" అంటే ఏమిటి?`,
    ml: (w) => `"${w}" എന്നാൽ എന്താണ് അർത്ഥമാക്കുന്നത്?`,
    kn: (w) => `"${w}" ಎಂದರೆ ಏನು?`,
  },
  // Translate to Target
  translate_to_target: {
    en: (w, targetName) => `Translate "${w}" to ${targetName}`,
    hi: (w, targetName) => `"${w}" का ${targetName} में अनुवाद करें`,
    ta: (w, targetName) => `"${w}" ஐ ${targetName} மொழியில் மொழிபெயர்க்கவும்`,
    te: (w, targetName) => `"${w}" ను ${targetName} లో అనువదించండి`,
    ml: (w, targetName) => `"${w}" എന്ന പദം ${targetName}-ലേക്ക് തർജ്ജമ ചെയ്യുക`,
    kn: (w, targetName) => `"${w}" ಅನ್ನು ${targetName} ಭಾಷೆಗೆ ಅನುವಾದಿಸಿ`,
  },
  // Listening
  listening: {
    en: () => 'Select the word you hear',
    hi: () => 'सुने गए शब्द का चयन करें',
    ta: () => 'நீங்கள் கேட்கும் சொல்லைத் தேர்ந்தெடுக்கவும்',
    te: () => 'మీరు విన్న పదాన్ని ఎంచుకోండి',
    ml: () => 'നിങ്ങൾ കേൾക്കുന്ന വാക്ക് തിരഞ്ഞെടുക്കുക',
    kn: () => 'ನೀವು ಕೇಳುವ ಪದವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  // Speaking
  speaking: {
    en: (w) => `Tap the mic and speak: "${w}"`,
    hi: (w) => `माइक दबाएं और बोलें: "${w}"`,
    ta: (w) => `மைக்கை அழுத்தி பேசவும்: "${w}"`,
    te: (w) => `మైక్ నొక్కి మాట్లాడండి: "${w}"`,
    ml: (w) => `മൈക്ക് അമർത്തി പറയുക: "${w}"`,
    kn: (w) => `ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ: "${w}"`,
  },
  // Word Bank / Sentence builder
  word_bank: {
    en: (w) => `Build the correct translation for: "${w}"`,
    hi: (w) => `"${w}" का सही अनुवाद बनाएं:`,
    ta: (w) => `"${w}" என்பதற்கான சரியான மொழிபெயர்ப்பை உருவாக்குங்கள்:`,
    te: (w) => `"${w}" కొరకు సరైన అనువాదాన్ని రూపొందించండి:`,
    ml: (w) => `"${w}" എന്നതിന്റെ ശരിയായ തർജ്ജമ നിർമ്മിക്കുക:`,
    kn: (w) => `"${w}" ಗೆ ಸರಿಯಾದ ಅನುವಾದವನ್ನು ರಚಿಸಿ:`,
  },
  // Matching pairs
  matching: {
    en: () => 'Match the following words with their meanings',
    hi: () => 'शब्दों का उनके सही अर्थ से मिलान करें',
    ta: () => 'சொற்களை அவற்றின் அர்த்தங்களுடன் பொருத்தவும்',
    te: () => 'పదాలను వాటి అర్థాలతో సరిపోల్చండి',
    ml: () => 'വാക്കുകളെ അവയുടെ ശരിയായ അർത്ഥങ്ങളുമായി പൊരുത്തപ്പെടുത്തുക',
    kn: () => 'ಪದಗಳನ್ನು ಅವುಗಳ ಸರಿಯಾದ ಅರ್ಥಗಳೊಂದಿಗೆ ಜೋಡಿಸಿ',
  },
  // Sentence Ordering / Reorder
  sentence_order: {
    en: (w) => `Arrange the words in correct order: "${w}"`,
    hi: (w) => `शब्दों को सही क्रम में व्यवस्थित करें: "${w}"`,
    ta: (w) => `சொற்களை சரியான வரிசையில் அமைக்கவும்: "${w}"`,
    te: (w) => `పదాలను సరైన క్రమంలో అమర్చండి: "${w}"`,
    ml: (w) => `വാക്കുകളെ ശരിയായ ക്രമത്തിൽ ക്രമീകരിക്കുക: "${w}"`,
    kn: (w) => `ಪದಗಳನ್ನು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ: "${w}"`,
  },
  // Fill in the blank
  fill_blank: {
    en: () => 'Choose the missing word to complete the sentence',
    hi: () => 'वाक्य को पूरा करने के लिए गायब शब्द चुनें',
    ta: () => 'வாக்கியத்தை முடிக்க விடுபட்ட சொல்லைத் தேர்ந்தெடுக்கவும்',
    te: () => 'వాక్యాన్ని పూర్తి ಮಾಡಲು తప్పిపోయిన పదాన్ని ఎంచుకోండి',
    ml: () => 'വാചകം പൂർത്തിയാക്കാൻ വിട്ടുപോയ വാക്ക് തിരഞ്ഞെടുക്കുക',
    kn: () => 'ವಾಕ್ಯವನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಬಿಟ್ಟುಹೋದ ಪದವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  // Reading Comprehension
  reading: {
    en: () => 'Read the short text and answer the question below',
    hi: () => 'संक्षिप्त पाठ पढ़ें और नीचे दिए गए प्रश्न का उत्तर दें',
    ta: () => 'சிறுகுறிப்பைப் படித்து கீழே உள்ள கேள்விக்கு பதிலளிக்கவும்',
    te: () => 'చిన్న వచనాన్ని చదివి కింద ఇచ్చిన ప్రశ్నకు సమాధానం ఇవ్వండి',
    ml: () => 'ചെറിയ വചനം വായിച്ച് താഴെയുള്ള ചോദ്യത്തിന് ഉത്തരം നൽകുക',
    kn: () => 'ಸಣ್ಣ ಪಠ್ಯವನ್ನು ಓದಿ ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ',
  },
}

export function getPromptText(type, preferredLang = 'en', targetName = '', word = '') {
  const templates = promptTemplates[type] || promptTemplates.meaning
  const fn = templates[preferredLang] || templates.en

  switch (type) {
    case 'translate_to_target':
      return fn(word, targetName)
    case 'meaning':
    case 'speaking':
    case 'word_bank':
    case 'sentence_order':
      return fn(word)
    default:
      return fn()
  }
}

export const dictionary = [
  {
    wordId: 'hello',
    translations: {
      en: 'Hello',
      hi: 'नमस्ते',
      ta: 'வணக்கம்',
      te: 'నమస్కారం',
      ml: 'നമസ്കാരം',
      kn: 'ನಮಸ್ಕಾರ',
    },
  },
  {
    wordId: 'thank_you',
    translations: {
      en: 'Thank you',
      hi: 'धन्यवाद',
      ta: 'நன்றி',
      te: 'ధన్యవాదాలు',
      ml: 'നന്ദി',
      kn: 'ಧನ್ಯವಾದ',
    },
  },
  {
    wordId: 'please',
    translations: {
      en: 'Please',
      hi: 'कृपया',
      ta: 'தயவுசெய்து',
      te: 'దయచేసి',
      ml: 'ദയവായി',
      kn: 'ದಯವಿಟ್ಟು',
    },
  },
  {
    wordId: 'goodbye',
    translations: {
      en: 'Goodbye',
      hi: 'अलविदा',
      ta: 'பிரியாவிடை',
      te: 'సెలవు',
      ml: 'വിട',
      kn: 'ವಿದಾಯ',
    },
  },
  {
    wordId: 'yes',
    translations: {
      en: 'Yes',
      hi: 'हाँ',
      ta: 'ஆம்',
      te: 'అవును',
      ml: 'അതെ',
      kn: 'ಹೌದು',
    },
  },
  {
    wordId: 'no',
    translations: {
      en: 'No',
      hi: 'नहीं',
      ta: 'இல்லை',
      te: 'లేదు',
      ml: 'ഇല്ല',
      kn: 'ಇಲ್ಲ',
    },
  },
  {
    wordId: 'water',
    translations: {
      en: 'Water',
      hi: 'पानी',
      ta: 'தண்ணீர்',
      te: 'నీళ్ళు',
      ml: 'വെള്ളം',
      kn: 'ನೀರು',
    },
  },
]

export function translateMeaning(meaning, preferredLang) {
  if (!meaning || preferredLang === 'en') return meaning
  const cleanMeaning = meaning.split('/')[0].trim().toLowerCase()
  const entry = dictionary.find((d) => {
    const enVal = d.translations['en']?.toLowerCase()
    return enVal === cleanMeaning || enVal?.includes(cleanMeaning) || cleanMeaning.includes(enVal)
  })
  if (entry && entry.translations[preferredLang]) {
    return entry.translations[preferredLang]
  }
  return meaning
}

export const targetNameMap = {
  hi: { en: 'Hindi', hi: 'हिन्दी', ta: 'இந்தி', te: 'హిందీ', ml: 'ഹിന്ദി', kn: 'ಹಿಂದಿ' },
  ta: { en: 'Tamil', hi: 'तमिल', ta: 'தமிழ்', te: 'తమిళం', ml: 'തമിഴ്', kn: 'ತಮಿಳು' },
  te: { en: 'Telugu', hi: 'तेलुगु', ta: 'தெலுங்கு', te: 'తెలుగు', ml: 'തെലുങ്ക്', kn: 'ತೆಲುಗು' },
  ml: { en: 'Malayalam', hi: 'मलयालम', ta: 'மலையாளம்', te: 'మలయాళం', ml: 'മലയാളം', kn: 'ಮಲೆಯಾಳಂ' },
  kn: { en: 'Kannada', hi: 'कन्नड़', ta: 'கன்னடம்', te: 'కన్నడ', ml: 'കന്നഡ', kn: 'ಕನ್ನಡ' },
  en: { en: 'English', hi: 'अंग्रेज़ी', ta: 'ஆங்கிலம்', te: 'ఆంగ్లం', ml: 'ഇംഗ്ലീഷ്', kn: 'ಇಂಗ್ಲಿಷ್' },
}
