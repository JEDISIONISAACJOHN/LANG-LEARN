import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

// UI Translations for Common Site Labels across 9 Languages
export const uiTranslations = {
  learn: {
    en: 'Learn',
    hi: 'सीखें',
    ta: 'கற்க',
    te: 'నేర్చుకోండి',
    ml: 'പഠിക്കുക',
    kn: 'ಕಲಿಯಿರಿ',
  },
  stories: {
    en: 'Stories',
    hi: 'कहानियाँ',
    ta: 'கதைகள்',
    te: 'కథలు',
    ml: 'കഥകൾ',
    kn: 'ಕಥೆಗಳು',
  },
  tutor: {
    en: 'AI Tutor',
    hi: 'एआई शिक्षक',
    ta: 'AI ஆசிரியர்',
    te: 'AI ట్యూటర్',
    ml: 'AI അദ്ധ്യാപകൻ',
    kn: 'AI ಶಿಕ್ಷಕ',
  },
  dashboard: {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    ta: 'முகப்பு',
    te: 'డ్యాష్‌బోర్డ్',
    ml: 'ഡാഷ്ബോർഡ്',
    kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  letters: {
    en: 'Letters / Script',
    hi: 'वर्णमाला / अक्षर',
    ta: 'எழுத்துக்கள்',
    te: 'అక్షరమాల',
    ml: 'അക്ഷരമാല',
    kn: 'ವರ್ಣಮಾಲೆ',
  },
  practice: {
    en: 'Practice',
    hi: 'अभ्यास',
    ta: 'பயிற்சி',
    te: 'సాధన',
    ml: 'പരിശീലിക്കുക',
    kn: 'ಅಭ್ಯಾಸ',
  },
  leaderboard: {
    en: 'Leaderboard',
    hi: 'लीडरबोर्ड',
    ta: 'முன்னிலை பலகை',
    te: 'లీడర్‌బోర్డ్',
    ml: 'ലീഡർബോർഡ്',
    kn: 'ಲೀಡರ್‌ಬೋರ್ಡ್',
  },
  curriculum: {
    en: 'Curriculum CMS',
    hi: 'पाठ्यक्रम',
    ta: 'பாடத்திட்டம்',
    te: 'పాఠ్య ప్రణాళిక',
    ml: 'പാഠ്യപദ്ധതി',
    kn: 'ಪಠ್ಯಕ್ರಮ',
  },
  profile: {
    en: 'Profile',
    hi: 'प्रोफ़ाइल',
    ta: 'சுயவிவரம்',
    te: 'ప్రొఫైల్',
    ml: 'പ്രൊഫൈൽ',
    kn: 'ಪ್ರೊಫೈಲ್',
  },
  settings: {
    en: 'Settings',
    hi: 'सेटिंग्स',
    ta: 'அமைப்புகள்',
    te: 'సెట్టింగ్‌లు',
    ml: 'ക്രമീകരണങ്ങൾ',
    kn: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  },
  streak: {
    en: 'Streak',
    hi: 'लगातार दिन',
    ta: 'தொடர் நாட்கள்',
    te: 'వరుస రోజులు',
    ml: 'തുടർച്ചയായ ദിവസങ്ങൾ',
    kn: 'ಸತತ ದಿನಗಳು',
  },
  hearts: {
    en: 'Hearts',
    hi: 'ऊर्जा',
    ta: 'ஆற்றல்',
    te: 'శక్తి',
    ml: 'ഊർജ്ജം',
    kn: 'ಶಕ್ತಿ',
  },
  gems: {
    en: 'Gems',
    hi: 'रत्न / सिक्के',
    ta: 'மணிகள்',
    te: 'మణులు',
    ml: 'രത്നങ്ങൾ',
    kn: 'ರತ್ನಗಳು',
  },
  daily_goal: {
    en: 'Daily Goal',
    hi: 'दैनिक लक्ष्य',
    ta: 'தினசரி இலக்கு',
    te: 'రోజువారీ లక్ష్యం',
    ml: 'പ്രതിദിന ലക്ഷ്യം',
    kn: 'ದೈನಂದಿನ ಗುರಿ',
  },
  quests: {
    en: 'Daily Quests',
    hi: 'दैनिक लक्ष्य',
    ta: 'தினசரி பணிகள்',
    te: 'రోజువారీ టాస్క్‌లు',
    ml: 'പ്രതിദിന ദൗത്യങ്ങൾ',
    kn: 'ದೈನಂದಿನ ಕಾರ್ಯಗಳು',
  },
  theme: {
    en: 'Theme',
    hi: 'थीम',
    ta: 'தீம்',
    te: 'థీమ్',
    ml: 'തീം',
    kn: 'ಥೀಮ್',
  },
  site_language: {
    en: 'Site Language',
    hi: 'वेबसाइट भाषा',
    ta: 'தள மொழி',
    te: 'సైట్ భాష',
    ml: 'സൈറ്റ് ഭാഷ',
    kn: 'ಸೈಟ್ ಭಾಷೆ',
  },
  continue: {
    en: 'Continue',
    hi: 'आगे बढ़ें',
    ta: 'தொடரவும்',
    te: 'కొనసాగించు',
    ml: 'തുടരുക',
    kn: 'ಮುಂದುವರಿಯಿರಿ',
  },
  check_answer: {
    en: 'Check Answer',
    hi: 'उत्तर जांचें',
    ta: 'பதிலைச் சரிபார்க்கவும்',
    te: 'సమాధానం సరిచూడండి',
    ml: 'ഉത്തരം പരിശോധിക്കുക',
    kn: 'ಉತ್ತರವನ್ನು ಪರಿಶೀಲಿಸಿ',
  },
  excellent: {
    en: '✓ Excellent!',
    hi: '✓ बहुत बढ़िया!',
    ta: '✓ அற்புதம்!',
    te: '✓ అద్భుతం!',
    ml: '✓ മികച്ചത്!',
    kn: '✓ ಅದ್ಭುತ!',
  },
  not_quite: {
    en: '✗ Not quite right',
    hi: '✗ सही नहीं है',
    ta: '✗ தவறு',
    te: '✗ సరికాదు',
    ml: '✗ ശരിയല്ല',
    kn: '✗ ಸರಿಯಲ್ಲ',
  },
  welcome_back: {
    en: 'Welcome back',
    hi: 'वापसी पर स्वागत है',
    ta: 'மீண்டும் நல்வரவு',
    te: 'తిరిగి స్వాగతం',
    ml: 'സ്വാഗതം',
    kn: 'ಮತ್ತೆ ಸ್ವಾಗತ',
  },
  ready_to_master: {
    en: 'Ready to master',
    hi: 'सीखने के लिए तैयार हैं',
    ta: 'கற்க தயாரா',
    te: 'నేర్చుకోవడానికి సిద్ధంగా ఉన్నారా',
    ml: 'പഠിക്കാൻ തയ്യാറാണോ',
    kn: 'ಕಲಿಯಲು ಸಿದ್ಧರಿದ್ದೀರಾ',
  },
  today: {
    en: 'today?',
    hi: 'आज?',
    ta: 'இன்று?',
    te: 'ఈ రోజు?',
    ml: 'ഇന്ന്?',
    kn: 'ಇಂದು?',
  },
  next_up: {
    en: 'Next Up',
    hi: 'आगे',
    ta: 'அடுத்து',
    te: 'తర్వాత',
    ml: 'അടുത്തത്',
    kn: 'ಮುಂದೆ',
  },
  daily_practice: {
    en: 'Daily Practice',
    hi: 'दैनिक अभ्यास',
    ta: 'தினசரி பயிற்சி',
    te: 'రోజువారీ సాధన',
    ml: 'പ്രതിദിന പരിശീലനം',
    kn: 'ದೈನಂದಿನ ಅಭ್ಯಾಸ',
  },
  continue_learning: {
    en: 'Continue your learning journey.',
    hi: 'अपनी सीखने की यात्रा जारी रखें।',
    ta: 'உங்கள் கற்றல் பயணத்தைத் தொடரவும்.',
    te: 'మీ అభ్యాస ప్రయాణాన్ని కొనసాగించండి.',
    ml: 'നിങ്ങളുടെ പഠന യാത്ര തുടരുക.',
    kn: 'ನಿಮ್ಮ ಕಲಿಕೆಯ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಿ.',
  },
  start: {
    en: 'START',
    hi: 'शुरू करें',
    ta: 'தொடங்கு',
    te: 'ప్రారంభించండి',
    ml: 'തുടങ്ങുക',
    kn: 'ಪ್ರಾರಂಭಿಸಿ',
  },
  course_progress: {
    en: 'Course Progress',
    hi: 'कोर्स की प्रगति',
    ta: 'பாடநெறி முன்னேற்றம்',
    te: 'కోర్సు పురోగతి',
    ml: 'കോഴ്സ് പുരോഗതി',
    kn: 'ಕೋರ್ಸ್ ಪ್ರಗತಿ',
  },
  of: {
    en: 'of',
    hi: 'में से',
    ta: 'இல்',
    te: 'లో',
    ml: 'ൽ',
    kn: 'ರಲ್ಲಿ',
  },
  lessons_completed: {
    en: 'lessons completed',
    hi: 'पाठ पूरे हुए',
    ta: 'பாடங்கள் முடிந்துவிட்டன',
    te: 'పాఠాలు పూర్తయ్యాయి',
    ml: 'പാഠങ്ങൾ പൂർത്തിയായി',
    kn: 'ಪಾಠಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ',
  },
  read_listen: {
    en: 'Read and listen to tales',
    hi: 'कहानियां पढ़ें और सुनें',
    ta: 'கதைகளை படித்து கேட்கவும்',
    te: 'కథలను చదవండి, వినండి',
    ml: 'കഥകൾ വായിക്കുകയും കേൾക്കുകയും ചെയ്യുക',
    kn: 'ಕಥೆಗಳನ್ನು ಓದಿ ಮತ್ತು ಆಲಿಸಿ',
  },
  practice_conv: {
    en: 'Practice conversations',
    hi: 'बातचीत का अभ्यास करें',
    ta: 'உரையாடல்களைப் பயிற்சி செய்யவும்',
    te: 'సంభాషణలను సాధన చేయండి',
    ml: 'സംഭാഷണങ്ങൾ പരിശീലിക്കുക',
    kn: 'ಸಂಭಾಷಣೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ',
  },
  learn_script: {
    en: 'Learn the script',
    hi: 'लिपि सीखें',
    ta: 'எழுத்துமுறையை கற்கவும்',
    te: 'స్క్రిప్ట్ నేర్చుకోండి',
    ml: 'ലിപി പഠിക്കുക',
    kn: 'ಲಿಪಿಯನ್ನು ಕಲಿಯಿರಿ',
  },
  syllabus: {
    en: 'Syllabus',
    hi: 'पाठ्यक्रम',
    ta: 'பாடத்திட்டம்',
    te: 'సిలబస్',
    ml: 'സിലബസ്',
    kn: 'ಪಠ್ಯಕ್ರಮ',
  },
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem('bharatlingo_theme') || 'light'
    } catch (e) {
      return 'light'
    }
  })

  const [siteLanguage, setSiteLanguageState] = useState(() => {
    try {
      return localStorage.getItem('bharatlingo_site_lang') || 'en'
    } catch (e) {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bharatlingo_theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch (e) {
      console.error(e)
    }
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem('bharatlingo_site_lang', siteLanguage)
    } catch (e) {
      console.error(e)
    }
  }, [siteLanguage])

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme)
    }
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const setSiteLanguage = (langId) => {
    if (langId) {
      setSiteLanguageState(langId)
    }
  }

  // Translation helper for UI labels
  const t = (key) => {
    if (!key) return ''
    const entry = uiTranslations[key]
    if (!entry) return key
    return entry[siteLanguage] || entry['en'] || key
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        siteLanguage,
        setSiteLanguage,
        t,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
