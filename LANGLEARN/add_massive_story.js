const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'stories.js');
let content = fs.readFileSync(filePath, 'utf8');

const massiveStory = `
  {
    id: 'hi-story-massive-1',
    languageId: 'hi',
    title: 'एक लंबी यात्रा',
    titleEn: 'A Long Journey',
    level: 'Advanced',
    rewardXP: 500,
    rewardGems: 150,
    coverEmoji: '🚂',
    description: 'An epic 25-part conversation on a train journey across India, covering many topics.',
    segments: [
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'माफ़ कीजिए, क्या यह सीट खाली है?', translation: 'Excuse me, is this seat empty?', pronunciation: 'Maaf kijiye, kya yeh seat khaali hai?', audioText: 'माफ़ कीजिए, क्या यह सीट खाली है?' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'जी हाँ, आप यहाँ बैठ सकते हैं।', translation: 'Yes, you can sit here.', pronunciation: 'Jee haan, aap yahan baith sakte hain.', audioText: 'जी हाँ, आप यहाँ बैठ सकते हैं।' },
      { isCheckpoint: true, question: 'What did Rohan ask?', options: ['Is this seat empty?', 'What time is it?', 'Where is the train going?', 'Are you Amit?'], correctAnswer: 'Is this seat empty?' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'धन्यवाद! मेरा नाम रोहन है।', translation: 'Thank you! My name is Rohan.', pronunciation: 'Dhanyavad! Mera naam Rohan hai.', audioText: 'धन्यवाद! मेरा नाम रोहन है।' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'मेरा नाम अमित है। आप कहाँ जा रहे हैं?', translation: 'My name is Amit. Where are you going?', pronunciation: 'Mera naam Amit hai. Aap kahan ja rahe hain?', audioText: 'मेरा नाम अमित है। आप कहाँ जा रहे हैं?' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'मैं दिल्ली जा रहा हूँ। और आप?', translation: 'I am going to Delhi. And you?', pronunciation: 'Main Delhi ja raha hoon. Aur aap?', audioText: 'मैं दिल्ली जा रहा हूँ। और आप?' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'मैं भी दिल्ली ही जा रहा हूँ।', translation: 'I am also going to Delhi.', pronunciation: 'Main bhi Delhi hi ja raha hoon.', audioText: 'मैं भी दिल्ली ही जा रहा हूँ।' },
      { isCheckpoint: true, question: 'Where are both of them going?', options: ['Delhi', 'Mumbai', 'Chennai', 'Kolkata'], correctAnswer: 'Delhi' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'क्या आप अक्सर ट्रेन से सफर करते हैं?', translation: 'Do you often travel by train?', pronunciation: 'Kya aap aksar train se safar karte hain?', audioText: 'क्या आप अक्सर ट्रेन से सफर करते हैं?' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'हाँ, मेरे काम के लिए मुझे बहुत यात्रा करनी पड़ती है।', translation: 'Yes, I have to travel a lot for my work.', pronunciation: 'Haan, mere kaam ke liye mujhe bahut yatra karni padti hai.', audioText: 'हाँ, मेरे काम के लिए मुझे बहुत यात्रा करनी पड़ती है।' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'आप क्या काम करते हैं?', translation: 'What work do you do?', pronunciation: 'Aap kya kaam karte hain?', audioText: 'आप क्या काम करते हैं?' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'मैं एक सॉफ्टवेयर इंजीनियर हूँ। और आप?', translation: 'I am a software engineer. And you?', pronunciation: 'Main ek software engineer hoon. Aur aap?', audioText: 'मैं एक सॉफ्टवेयर इंजीनियर हूँ। और आप?' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'मैं एक शिक्षक हूँ। मैं इतिहास पढ़ाता हूँ।', translation: 'I am a teacher. I teach history.', pronunciation: 'Main ek shikshak hoon. Main itihas padhata hoon.', audioText: 'मैं एक शिक्षक हूँ। मैं इतिहास पढ़ाता हूँ।' },
      { isCheckpoint: true, question: 'What does Rohan do?', options: ['Teacher', 'Engineer', 'Doctor', 'Businessman'], correctAnswer: 'Teacher' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'यह बहुत दिलचस्प है! मुझे इतिहास पढ़ना पसंद है।', translation: 'That is very interesting! I like reading history.', pronunciation: 'Yeh bahut dilchasp hai! Mujhe itihas padhna pasand hai.', audioText: 'यह बहुत दिलचस्प है! मुझे इतिहास पढ़ना पसंद है।' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'क्या आपने कभी ताजमहल देखा है?', translation: 'Have you ever seen the Taj Mahal?', pronunciation: 'Kya aapne kabhi Taj Mahal dekha hai?', audioText: 'क्या आपने कभी ताजमहल देखा है?' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'हाँ, मैं पिछले साल आगरा गया था।', translation: 'Yes, I went to Agra last year.', pronunciation: 'Haan, main pichle saal Agra gaya tha.', audioText: 'हाँ, मैं पिछले साल आगरा गया था।' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'वह बहुत सुंदर इमारत है, है ना?', translation: 'It is a very beautiful building, isnt it?', pronunciation: 'Vah bahut sundar imarat hai, hai na?', audioText: 'वह बहुत सुंदर इमारत है, है ना?' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'बिल्कुल। मुझे उसकी वास्तुकला बहुत पसंद आई।', translation: 'Absolutely. I really liked its architecture.', pronunciation: 'Bilkul. Mujhe uski vastukala bahut pasand aayi.', audioText: 'बिल्कुल। मुझे उसकी वास्तुकला बहुत पसंद आई।' },
      { isCheckpoint: true, question: 'Where did Amit go last year?', options: ['Agra', 'Delhi', 'Jaipur', 'Mumbai'], correctAnswer: 'Agra' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'लगता है कि चाय वाला आ रहा है।', translation: 'Looks like the tea vendor is coming.', pronunciation: 'Lagta hai ki chai wala aa raha hai.', audioText: 'लगता है कि चाय वाला आ रहा है।' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'हाँ, मुझे एक कप चाय चाहिए।', translation: 'Yes, I want a cup of tea.', pronunciation: 'Haan, mujhe ek cup chai chahiye.', audioText: 'हाँ, मुझे एक कप चाय चाहिए।' },
      { speaker: 'चायवाला (Chai Vendor)', avatar: '🧔', text: 'गरमा-गरम चाय! चाय लीजिए!', translation: 'Piping hot tea! Take tea!', pronunciation: 'Garma-garam chai! Chai lijiye!', audioText: 'गरमा-गरम चाय! चाय लीजिए!' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'भैया, दो कप चाय देना।', translation: 'Brother, give two cups of tea.', pronunciation: 'Bhaiya, do cup chai dena.', audioText: 'भैया, दो कप चाय देना।' },
      { speaker: 'अमित (Amit)', avatar: '👨‍🦱', text: 'पैसे मैं दे देता हूँ।', translation: 'I will give the money.', pronunciation: 'Paise main de deta hoon.', audioText: 'पैसे मैं दे देता हूँ।' },
      { speaker: 'रोहन (Rohan)', avatar: '👨', text: 'अरे नहीं, पहली बार मैं पिलाता हूँ।', translation: 'Oh no, I will treat the first time.', pronunciation: 'Are nahi, pehli baar main pilata hoon.', audioText: 'अरे नहीं, पहली बार मैं पिलाता हूँ।' },
      { isCheckpoint: true, question: 'Who paid for the tea?', options: ['Rohan', 'Amit', 'The Chai Vendor', 'No one'], correctAnswer: 'Rohan' }
    ],
    endQuiz: [
      { question: 'What is the name of the software engineer?', options: ['Amit', 'Rohan', 'Rahul', 'Raj'], correctAnswer: 'Amit' },
      { question: 'What subject does Rohan teach?', options: ['History (इतिहास)', 'Maths (गणित)', 'Science (विज्ञान)', 'English (अंग्रेज़ी)'], correctAnswer: 'History (इतिहास)' },
      { question: 'Where was the train going?', options: ['Delhi', 'Agra', 'Mumbai', 'Chennai'], correctAnswer: 'Delhi' },
      { question: 'What did they order to drink?', options: ['Tea (चाय)', 'Coffee (कॉफी)', 'Water (पानी)', 'Juice (जूस)'], correctAnswer: 'Tea (चाय)' },
      { question: 'When did Amit visit Agra?', options: ['Last year (पिछले साल)', 'Last month (पिछले महीने)', 'Yesterday (कल)', 'Never (कभी नहीं)'], correctAnswer: 'Last year (पिछले साल)' },
      { question: 'What does "खाली" (Khaali) mean?', options: ['Empty', 'Full', 'Heavy', 'Light'], correctAnswer: 'Empty' },
      { question: 'What does "इमारत" (Imarat) mean?', options: ['Building', 'Tree', 'River', 'Mountain'], correctAnswer: 'Building' },
      { question: 'How do you say "Thank you" in Hindi?', options: ['धन्यवाद (Dhanyavad)', 'नमस्ते (Namaste)', 'माफ़ कीजिए (Maaf kijiye)', 'हाँ (Haan)'], correctAnswer: 'धन्यवाद (Dhanyavad)' },
      { question: 'What does "अक्सर" (Aksar) mean?', options: ['Often', 'Never', 'Always', 'Sometimes'], correctAnswer: 'Often' },
      { question: 'What does "दिलचस्प" (Dilchasp) mean?', options: ['Interesting', 'Boring', 'Beautiful', 'Ugly'], correctAnswer: 'Interesting' },
      { question: 'Who offered to pay for the tea first?', options: ['Amit', 'Rohan', 'Both', 'Neither'], correctAnswer: 'Amit' },
      { question: 'Who ended up paying for the tea?', options: ['Rohan', 'Amit', 'The Vendor', 'No one'], correctAnswer: 'Rohan' }
    ]
  },
`;

// Insert the new massive story into the array
const targetString = 'export const culturalStories = [';
const newContent = content.replace(targetString, targetString + massiveStory);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Massive story added successfully.');
