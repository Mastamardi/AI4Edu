# 🌐 Indian Language Translator

A fully functional real-time language translator component built with React, TypeScript, and Tailwind CSS. This translator supports all major Indian languages and provides a modern, responsive interface for students and researchers.

## ✨ Features

### 🌍 Language Support
- **13+ Major Indian Languages**: Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Malayalam, Gujarati, Punjabi, Urdu, Assamese, Odia, Sanskrit
- **English Support**: Full bidirectional translation with English
- **Native Language Names**: Each language displays in its native script

### 🚀 Core Functionality
- **Real-time Translation**: Auto-translate with 1-second debounce
- **Instant Response**: Simulated API delays for realistic experience
- **Smart Input Handling**: Supports conversational, technical, and academic text
- **Code Snippet Protection**: Prevents translation of code blocks
- **Language Detection**: Automatic language detection based on character sets

### 🎨 User Interface
- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Mobile-Friendly**: Optimized for both desktop and mobile devices
- **Loading States**: Visual feedback during translation
- **Error Handling**: Graceful error messages and validation
- **Character/Word Count**: Real-time input/output statistics

### 🔧 Interactive Features
- **Language Swapping**: One-click language direction swap
- **Copy Functionality**: Easy copy of translated text
- **Clear All**: Reset all fields with one click
- **Auto-translate**: Translates as you type (with debounce)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React for modern iconography
- **Build Tool**: Vite for fast development and building
- **Language Support**: Comprehensive Indian language coverage

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd text-translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The translator will be ready to use!

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
text-translator/
├── src/
│   ├── components/
│   │   └── LanguageTranslator.tsx    # Main translator component
│   ├── data/
│   │   └── languages.ts              # Language definitions
│   ├── services/
│   │   └── translationService.ts     # Translation API service
│   ├── types/
│   │   └── translator.ts             # TypeScript type definitions
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Global styles
├── package.json                      # Dependencies and scripts
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS configuration
└── README.md                         # This file
```

## 🔌 API Integration

The translator currently uses a mock API service that simulates real translation behavior. To integrate with actual translation APIs:

### Google Translate API
```typescript
// Replace TranslationService.translate() with Google Translate API calls
const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    q: text,
    source: sourceLanguage,
    target: targetLanguage,
  }),
});
```

### AI4Bharat API
```typescript
// Replace with AI4Bharat's translation API
const response = await fetch('https://api.ai4bharat.org/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: text,
    source_language: sourceLanguage,
    target_language: targetLanguage,
  }),
});
```

## 🎯 Usage Examples

### Basic Translation
1. Select source language (e.g., English)
2. Select target language (e.g., Hindi)
3. Type or paste text in the input area
4. Translation appears automatically after 1 second

### Language Swapping
- Click the swap button (↻) to quickly reverse translation direction
- Input and output text are automatically swapped

### Copy Translation
- Click the "Copy" button next to the translated text
- Text is copied to clipboard for easy use

## 🔮 Future Enhancements

The translator is designed to be easily extensible. Potential future features:

- **Speech-to-Text**: Voice input for hands-free translation
- **Text-to-Speech**: Audio output of translations
- **File Upload**: Translate documents and files
- **Transliteration**: Convert between scripts (e.g., Hindi to Latin)
- **History**: Save and manage translation history
- **Offline Mode**: Local translation capabilities
- **Batch Translation**: Translate multiple texts at once

## 🐛 Troubleshooting

### Common Issues

**Translation not working:**
- Check if input text is not empty
- Ensure source and target languages are different
- Verify no code snippets in input text

**Styling issues:**
- Ensure Tailwind CSS is properly installed
- Check if all dependencies are installed correctly

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript configuration in `tsconfig.json`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ for students and researchers working with Indian languages** 