import { useLanguage } from '../contexts/LanguageContext'
import { Globe } from 'lucide-react'

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Globe className="h-5 w-5 text-green-600" />
      <div className="flex bg-white border-2 border-green-200 rounded-lg overflow-hidden">
        <button
          onClick={() => switchLanguage('en')}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-green-600 text-white'
              : 'text-green-600 hover:bg-green-50'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLanguage('ar')}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === 'ar'
              ? 'bg-green-600 text-white'
              : 'text-green-600 hover:bg-green-50'
          }`}
        >
          عربي
        </button>
      </div>
    </div>
  )
}

export default LanguageSwitcher