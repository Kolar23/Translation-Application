import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('detect');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchHistory = async () => {
    if (token) {
      try {
        const response = await axios.get('http://localhost:8080/history', {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`
          }
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    }
  };

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
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // Add this line
      setTranslation(response.data);
      fetchHistory();
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/authenticate', {
        username: username,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
  
      if (response.status === 200) {
        setToken(response.data.jwt);
        setIsLoggedIn(true);
      } 
    } catch (error) {
      alert('Invalid username or password');
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <div className="input-group">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Translation App</h1>
        <div className="language-selection">
        <select className="language-dropdown" value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)}>
        <option value="detect">Detect Language</option>
          {Object.entries(languageMap).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
        </select>
          <button className="swap-button" onClick={swapLanguages}>Swap</button>
          <select className="language-dropdown" value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)}>
            {Object.entries(languageMap).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>
        <textarea className="input-text" value={text} onChange={e => setText(e.target.value)} />
        <button className="translate-button" onClick={handleTranslate}>Translate</button>
        <textarea className="output-text" value={translation} readOnly />
      </header>
      <h2>Translation History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Original</th>
            <th>Translated To</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.originalText} ({item.sourceLanguage})</td>
              <td>{item.translatedText} ({item.targetLanguage})</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      );
}

export default App;