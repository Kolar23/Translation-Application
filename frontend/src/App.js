import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');

  const languageMap = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic', 
    'hy': 'Armenian', 'az': 'Azerbaijani', 'eu': 'Basque', 'be': 'Belarusian', 
    'bn': 'Bengali', 'bs': 'Bosnian', 'bg': 'Bulgarian', 'ca': 'Catalan', 
    'ceb': 'Cebuano', 'ny': 'Chichewa', 'zh-cn': 'Chinese Simplified', 
    'zh-tw': 'Chinese Traditional', 'co': 'Corsican', 'hr': 'Croatian', 
    'cs': 'Czech', 'da': 'Danish', 'nl': 'Dutch', 'en': 'English', 
    'eo': 'Esperanto', 'et': 'Estonian', 'tl': 'Filipino', 'fi': 'Finnish', 
    'fr': 'French', 'fy': 'Frisian', 'gl': 'Galician', 'ka': 'Georgian', 
    'de': 'German', 'el': 'Greek', 'gu': 'Gujarati', 'ht': 'Haitian Creole', 
    'ha': 'Hausa', 'haw': 'Hawaiian', 'iw': 'Hebrew', 'hi': 'Hindi', 
    'hmn': 'Hmong', 'hu': 'Hungarian', 'is': 'Icelandic', 'ig': 'Igbo', 
    'id': 'Indonesian', 'ga': 'Irish', 'it': 'Italian', 'ja': 'Japanese', 
    'jw': 'Javanese', 'kn': 'Kannada', 'kk': 'Kazakh', 'km': 'Khmer', 
    'ko': 'Korean', 'ku': 'Kurdish (Kurmanji)', 'ky': 'Kyrgyz', 
    'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'lt': 'Lithuanian', 
    'lb': 'Luxembourgish', 'mk': 'Macedonian', 'mg': 'Malagasy', 
    'ms': 'Malay', 'ml': 'Malayalam', 'mt': 'Maltese', 'mi': 'Maori', 
    'mr': 'Marathi', 'mn': 'Mongolian', 'my': 'Burmese', 'ne': 'Nepali', 
    'no': 'Norwegian', 'or': 'Odia', 'ps': 'Pashto', 'fa': 'Persian', 
    'pl': 'Polish', 'pt': 'Portuguese', 'pa': 'Punjabi', 'ro': 'Romanian', 
    'ru': 'Russian', 'sm': 'Samoan', 'gd': 'Scots Gaelic', 'sr': 'Serbian', 
    'st': 'Sesotho', 'sn': 'Shona', 'sd': 'Sindhi', 'si': 'Sinhala', 
    'sk': 'Slovak', 'sl': 'Slovenian', 'so': 'Somali', 'es': 'Spanish', 
    'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish', 'tg': 'Tajik', 
    'ta': 'Tamil', 'te': 'Telugu', 'th': 'Thai', 'tr': 'Turkish', 
    'uk': 'Ukrainian', 'ur': 'Urdu', 'ug': 'Uyghur', 'uz': 'Uzbek', 
    'vi': 'Vietnamese', 'cy': 'Welsh', 'xh': 'Xhosa', 'yi': 'Yiddish', 'zu': 'Zulu'
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:8080/translate', {
        text: text,
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage
      });
      setTranslation(response.data);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <header className="App-header" style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', color: '#4285F4' }}>Translation App</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center', width: '100%' }}>
          <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)} style={{ width: '45%', height: '40px', fontSize: '16px', borderRadius: '5px' }}>
            {Object.entries(languageMap).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
          <button onClick={swapLanguages} style={{ width: '10%', height: '40px', backgroundColor: '#4285F4', color: 'white', fontSize: '16px', border: 'none', borderRadius: '5px' }}>Swap</button>
          <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)} style={{ width: '45%', height: '40px', fontSize: '16px', borderRadius: '5px' }}>
            {Object.entries(languageMap).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>
        <textarea value={text} onChange={e => setText(e.target.value)} style={{ width: '96%', height: '40px', marginBottom: '20px', fontSize: '16px', padding: '10px', borderRadius: '5px' }} />
        <button onClick={handleTranslate} style={{ width: '100%', height: '40px', marginBottom: '20px', backgroundColor: '#4285F4', color: 'white', fontSize: '16px', border: 'none', borderRadius: '5px' }}>Translate</button>
        <textarea value={translation} readOnly style={{ width: '96%', height: '40px', backgroundColor: '#e0e0e0', fontSize: '16px', padding: '10px', borderRadius: '5px' }} />
      </header>
    </div>
  );
}

export default App;