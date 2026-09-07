/**
 * AI Conversation Tutor Scenarios for LangLearn
 *
 * Rich, culturally authentic Indian situational roleplays across all supported languages (hi, ta, te, ml, kn, en).
 */

export const CONVERSATION_SCENARIOS = [
  {
    id: 'ordering_chai',
    title: 'Ordering Chai & Breakfast',
    icon: '☕',
    difficulty: 'Beginner',
    description: 'Order tea and snacks at a local street stall or cafe.',
    category: 'Food & Dining',
    turns: {
      hi: [
        {
          id: 1,
          tutorMessage: 'नमस्ते! आप क्या लेना पसंद करेंगे?',
          pronunciation: 'Namaste! Aap kya lena pasand karenge?',
          englishMeaning: 'Hello! What would you like to have?',
          expectedKeywords: ['चाय', 'चाहिए', 'देना', 'एक', 'समोसा', 'दो'],
          suggestedReplies: [
            'मुझे एक कप मसाला चाय चाहिए।',
            'एक चाय और दो समोसे दीजिए।',
            'कृपया एक गर्म चाय बना दीजिए।',
          ],
          culturalTip: 'Using "दीजिए" (deejie) or "चाहिए" (chahiye) makes your request polite and respectful.',
          grammarNote: '"चाय" is feminine in Hindi, so we say "गर्म चाय" or "मीठी चाय".',
        },
        {
          id: 2,
          tutorMessage: 'ज़रूर! चाय में चीनी कितनी डालूँ?',
          pronunciation: 'Zaroor! Chai mein cheeni kitni daalun?',
          englishMeaning: 'Sure! How much sugar should I add in the tea?',
          expectedKeywords: ['कम', 'ज्यादा', 'चम्मच', 'बिना', 'मध्यम', 'एक'],
          suggestedReplies: [
            'कम चीनी डालिए।',
            'एक चम्मच चीनी काफी है।',
            'बिना चीनी के दीजिए।',
          ],
          culturalTip: 'Street chaiwalas often default to very sweet tea unless you specify "कम चीनी" (less sugar).',
          grammarNote: '"चीनी" (sugar) is an uncountable feminine noun.',
        },
        {
          id: 3,
          tutorMessage: 'यह लीजिए आपकी गरमा-गरम चाय! कुल बीस रुपये हुए।',
          pronunciation: 'Yeh lijiye aapki garma-garam chai! Kul bees rupaye hue.',
          englishMeaning: 'Here is your piping hot tea! Total is 20 rupees.',
          expectedKeywords: ['धन्यवाद', 'पैसे', 'रुपये', 'लीजिए', 'यूपीआई', 'पे'],
          suggestedReplies: [
            'धन्यवाद! यह लीजिए बीस रुपये।',
            'क्या मैं UPI / ऑनलाइन पे कर सकता हूँ?',
            'बहुत-बहुत धन्यवाद!',
          ],
          culturalTip: 'Digital payments (UPI / QR codes) are universally accepted even at small tea stalls in India.',
          grammarNote: '"सकता हूँ" is used for masculine speaker, "सकती हूँ" for feminine.',
        },
      ],
      ta: [
        {
          id: 1,
          tutorMessage: 'வணக்கம்! உங்களுக்கு என்ன வேண்டும்?',
          pronunciation: 'Vanakkam! Ungalukku enna vendum?',
          englishMeaning: 'Hello! What would you like?',
          expectedKeywords: ['டீ', 'தேநீர்', 'வேண்டும்', 'வடை', 'இட்லி'],
          suggestedReplies: [
            'எனக்கு ஒரு டீ வேண்டும்.',
            'ஒரு தேநீர் மற்றும் வடை தாருங்கள்.',
          ],
          culturalTip: 'Filter Coffee and Tea served in brass cups are iconic in Tamil Nadu.',
          grammarNote: '"வேண்டும்" (vendum) means "want/need".',
        },
        {
          id: 2,
          tutorMessage: 'நிச்சயமாக! சர்க்கரை எவ்வளவு போட வேண்டும்?',
          pronunciation: 'Nichayamaga! Sarkkarai evvalavu poda vendum?',
          englishMeaning: 'Certainly! How much sugar?',
          expectedKeywords: ['கொஞ்சம்', 'சர்க்கரை', 'ஸ்பூன்', 'வேண்டாம்'],
          suggestedReplies: [
            'கொஞ்சம் சர்க்கரை போடுங்கள்.',
            'சர்க்கரை வேண்டாம்.',
          ],
          culturalTip: 'Mention "கம்மி சர்க்கரை" for less sugar.',
          grammarNote: '"போடுங்கள்" is the polite imperative "please put/add".',
        },
        {
          id: 3,
          tutorMessage: 'இந்தாருங்கள் உங்கள் டீ! மொத்தம் இருபது ரூபாய்.',
          pronunciation: 'Indhaarungal ungal tea! Moththam irubadhu roobai.',
          englishMeaning: 'Here is your tea! Total is 20 rupees.',
          expectedKeywords: ['நன்றி', 'ரூபாய்', 'UPI'],
          suggestedReplies: [
            'நன்றி! இந்தாருங்கள் ரூபாய்.',
            'நான் GPay / UPI மூலம் பணம் செலுத்தலாமா?',
          ],
          culturalTip: 'GPay is widely used across Tamil Nadu.',
          grammarNote: '"செலுத்தலாமா?" means "Can I pay?".',
        },
      ],
      te: [
        {
          id: 1,
          tutorMessage: 'నమస్కారం! మీకు ఏమి కావాలి?',
          pronunciation: 'Namaskaram! Meeku emi kaavali?',
          englishMeaning: 'Hello! What do you want?',
          expectedKeywords: ['టీ', 'కావాలి', 'ఒక', 'ఇవ్వండి', 'దోశ'],
          suggestedReplies: [
            'నాకు ఒక కప్పు టీ కావాలి.',
            'ఒక టీ మరియు దోశ ఇవ్వండి.',
          ],
          culturalTip: 'Hot Irani chai and samosas/dosa are daily Hyderabad staples.',
          grammarNote: '"కావాలి" (kaavali) means "want/need".',
        },
        {
          id: 2,
          tutorMessage: 'తప్పకుండా! చక్కెర ఎంత వేయాలి?',
          pronunciation: 'Tappakunda! Chakkera entha veyaali?',
          englishMeaning: 'Sure! How much sugar to add?',
          expectedKeywords: ['తక్కువ', 'చక్కెర', 'వద్దు', 'ఒక'],
          suggestedReplies: [
            'తక్కువ చక్కెర వేయండి.',
            'చక్కెర వద్దు.',
          ],
          culturalTip: 'Ask for "తక్కువ తియ్యగా" (less sweet) if preferred.',
          grammarNote: '"వేయండి" is the respectful command verb.',
        },
        {
          id: 3,
          tutorMessage: 'ఇదిగోండి మీ టీ! మొత్తం ఇరవై రూపాయలు.',
          pronunciation: 'Idigondi mee tea! Mottham iravai roopaayalu.',
          englishMeaning: 'Here is your tea! Total is 20 rupees.',
          expectedKeywords: ['ధన్యవాదాలు', 'రూపాయలు', 'UPI'],
          suggestedReplies: [
            'ధన్యవాదాలు! ఇదిగోండి రూపాయలు.',
            'నేను UPI ద్వారా చెల్లించవచ్చా?',
          ],
          culturalTip: 'UPI code scanning is available at every counter.',
          grammarNote: '"చెల్లించవచ్చా?" means "May I pay?".',
        },
      ],
      ml: [
        {
          id: 1,
          tutorMessage: 'നമസ്കാരം! എന്താണ് വേണ്ടത്?',
          pronunciation: 'Namaskaram! Enthana vendathu?',
          englishMeaning: 'Hello! What would you like?',
          expectedKeywords: ['ചായ', 'വേണം', 'ഒരു', 'കടി', 'കടല'],
          suggestedReplies: [
            'എനിക്ക് ഒരു ചായ വേണം.',
            'ഒരു ചായയും പഴംപൊരിയും തരൂ.',
          ],
          culturalTip: 'Chaya & Pazham pori (banana fritters) is the quintessential Kerala afternoon snack.',
          grammarNote: '"വേണം" (vendathu) expresses desiring or wanting something.',
        },
        {
          id: 2,
          tutorMessage: 'തീർച്ചയായും! പഞ്ചസാര കുറച്ച് മതിയോ?',
          pronunciation: 'Theerchayayum! Panchasara kurachu mathiyo?',
          englishMeaning: 'Certainly! Is less sugar enough?',
          expectedKeywords: ['പഞ്ചസാര', 'കുറച്ച്', 'വേണ്ട', 'മതി'],
          suggestedReplies: [
            'അതെ, കുറച്ചു പഞ്ചസാര മതി.',
            'പഞ്ചസാര ഇടേണ്ടതില്ല.',
          ],
          culturalTip: 'Katta chaya (black tea) or Meter chaya are very popular in Kerala tea shops.',
          grammarNote: '"മതി" (mathi) means "enough".',
        },
        {
          id: 3,
          tutorMessage: 'ഇതാ നിങ്ങളുടെ ചൂടുചായ! ആകെ ഇരുപത് രൂപ.',
          pronunciation: 'Itha ningalude chuduchaya! Aake irupathu roopa.',
          englishMeaning: 'Here is your hot tea! Total 20 rupees.',
          expectedKeywords: ['നന്ദി', 'രൂപ', 'UPI'],
          suggestedReplies: [
            'നന്ദി! ഇതാ ഇരുപത് രൂപ.',
            'ഞാൻ UPI വഴി അടയ്ക്കട്ടേ?',
          ],
          culturalTip: 'Digital payments are used Everywhere in Kerala.',
          grammarNote: '"അടയ്ക്കട്ടേ" means "May I pay/settle?".',
        },
      ],
      kn: [
        {
          id: 1,
          tutorMessage: 'ನಮಸ್ಕಾರ! ತಮಗೆ ಏನು ಬೇಕು?',
          pronunciation: 'Namaskara! Tamage enu beku?',
          englishMeaning: 'Hello! What do you require?',
          expectedKeywords: ['ಟೀ', 'ಚಹಾ', 'ಬೇಕು', 'ಒಂದು', 'ದೋಸೆ', 'ಉಪ್ಪಿಟ್ಟು'],
          suggestedReplies: [
            'ನನಗೆ ಒಂದು ಕಪ್ ಚಹಾ ಬೇಕು.',
            'ಒಂದು ಟೀ ಮತ್ತು ದೋಸೆ ಕೊಡಿ.',
          ],
          culturalTip: 'Karnataka kaapi and masala chai at local Darshinis are famous daily rituals.',
          grammarNote: '"ಬೇಕು" (beku) means "need/want".',
        },
        {
          id: 2,
          tutorMessage: 'ಖಂಡಿತ! ಸಕ್ಕರೆ ಎಷ್ಟು ಹಾಕಲಿ?',
          pronunciation: 'Khanditha! Sakkare eshtu haakali?',
          englishMeaning: 'Certainly! How much sugar to add?',
          expectedKeywords: ['ಕಡಿಮೆ', 'ಸಕ್ಕರೆ', 'ಬೇಡ', 'ಒಂದು'],
          suggestedReplies: [
            'ಕಡಿಮೆ ಸಕ್ಕರೆ ಹಾಕಿ.',
            'ಸಕ್ಕರೆ ಬೇಡ.',
          ],
          culturalTip: '"ಕಡಿಮೆ ಸಿಹಿ" (less sweet) works well in Karnataka cafes.',
          grammarNote: '"ಹಾಕಿ" is the respectful request "please put".',
        },
        {
          id: 3,
          tutorMessage: 'ಇಗೋ ನಿಮ್ಮ ಬಿಸಿ ಚಹಾ! ಒಟ್ಟು ಇಪ್ಪತ್ತು ರೂಪಾಯಿ.',
          pronunciation: 'Igo nimma bisi chaha! Ottu ippattu roopaayi.',
          englishMeaning: 'Here is your hot tea! Total is 20 rupees.',
          expectedKeywords: ['ಧನ್ಯವಾದ', 'ರೂಪಾಯಿ', 'UPI'],
          suggestedReplies: [
            'ಧನ್ಯವಾದ! ಇಗೋ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ.',
            'ನಾನು UPI ಮೂಲಕ ಪಾವತಿಸಬಹುದೇ?',
          ],
          culturalTip: 'QR code stickers are placed on every glass counter.',
          grammarNote: '"ಪಾವತಿಸಬಹುದೇ?" means "May I pay?".',
        },
      ],
      en: [
        {
          id: 1,
          tutorMessage: 'Hello! Welcome. What can I get for you today?',
          pronunciation: 'Hello! Welcome. What can I get for you today?',
          englishMeaning: 'Hello! Welcome. What can I get for you today?',
          expectedKeywords: ['tea', 'chai', 'coffee', 'one', 'please'],
          suggestedReplies: [
            'I would like a cup of masala chai, please.',
            'One tea and some snacks, please.',
          ],
          culturalTip: 'Saying "please" and "thank you" is polite in English.',
          grammarNote: '"Would like" is a polite form of "want".',
        },
        {
          id: 2,
          tutorMessage: 'Great! How much sugar would you like in your tea?',
          pronunciation: 'Great! How much sugar would you like in your tea?',
          englishMeaning: 'Great! How much sugar would you like in your tea?',
          expectedKeywords: ['spoon', 'less', 'sugar', 'no'],
          suggestedReplies: [
            'Just one spoon of sugar, please.',
            'No sugar for me, thank you.',
          ],
          culturalTip: 'You can specify sugar levels as low, medium, or no sugar.',
          grammarNote: '"Sugar" is an uncountable noun.',
        },
        {
          id: 3,
          tutorMessage: 'Here is your hot tea! The total comes to 20 rupees.',
          pronunciation: 'Here is your hot tea! The total comes to 20 rupees.',
          englishMeaning: 'Here is your hot tea! The total comes to 20 rupees.',
          expectedKeywords: ['thank', 'you', 'here', 'pay', 'card', 'upi'],
          suggestedReplies: [
            'Thank you! Here is the cash.',
            'Can I pay via UPI or card?',
          ],
          culturalTip: 'Electronic payments are accepted almost everywhere.',
          grammarNote: '"Can I pay" is used to ask permission or possibility.',
        },
      ],
    },
  },
]

export const getScenariosForLanguage = (languageId) => {
  return CONVERSATION_SCENARIOS.map(scenario => {
    if (scenario.turns && scenario.turns[languageId]) {
      return {
        ...scenario,
        turns: scenario.turns[languageId]
      }
    }
    return null
  }).filter(Boolean)
}
