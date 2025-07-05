import LanguageTranslator from './components/LanguageTranslator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="translator-container">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌐 Indian Language Translator
          </h1>
          <p className="text-lg text-gray-600">
            Translate between major Indian languages with ease
          </p>
        </header>
        
        <LanguageTranslator />
        
        <footer className="text-center mt-12 text-gray-500">
          <p>Built for students and researchers • Supporting 13+ Indian languages</p>
        </footer>
      </div>
    </div>
  )
}

export default App 